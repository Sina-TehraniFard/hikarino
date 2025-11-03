/**
 * 占い機能の制御
 *
 * 質問管理、カード抽選、結果取得、エラー処理を統合したカスタムフック。
 *
 * @see 仕様書: docs/specs/hooks/useFortune.md
 */

import { useState, useCallback, useRef, useEffect } from "react";
import { DrawnCard, CardData, AuthUser } from "@/types";
import { drawThreeCards } from "@/lib/tarot";
import { useCoinContext } from "@/contexts/CoinContext";
import {
  callFortuneAPI,
  processStreamingResponse,
  saveFortuneResult,
  handleAPIError,
} from "@/lib/fortune";

// 進行アニメーション設定
const PROGRESS = {
  duration: {
    min: 15000, // 15秒
    max: 25000, // 25秒
  },
  percent: {
    initialTargetMin: 84,
    initialTargetMax: 88,
    finalWait: 99,
    complete: 100,
  },
  speed: {
    min: 0.3,
    max: 1.2,
    smoothing: 0.1,
    changeIntervalMin: 2000,
    changeIntervalMax: 5000,
  },
  timing: {
    intervalMs: 100,
    slowIncrementIntervalMs: 2000,
    completionDelayMs: 1000,
    resultDisplayDelayMs: 1500,
  },
} as const;

const COIN = {
  cost: 100,
} as const;

const ERROR_MESSAGES = {
  paymentFailed:
    "決済処理中に問題が発生しました。コインが消費されていないか確認の上、もう一度お試しください。",
} as const;

export const useFortune = () => {
  // 状態管理
  const [question, setQuestion] = useState("");
  const [cards, setCards] = useState<DrawnCard[]>([]);
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasFortuned, setHasFortuned] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showWaitingAnimation, setShowWaitingAnimation] = useState(false);
  const [streamingProgress, setStreamingProgress] = useState(0);

  // 進行アニメーション制御
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const targetDurationRef = useRef<number>(0); // 15〜25秒のランダム値
  const targetMaxProgressRef = useRef<number>(0); // 84〜88%のランダム値
  const slowIncrementModeRef = useRef<boolean>(false);
  const lastIncrementTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const aiCompletedRef = useRef<boolean>(false);

  // 進行速度の変動管理
  const virtualElapsedRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(1.0);
  const targetSpeedRef = useRef<number>(1.0);
  const lastSpeedChangeRef = useRef<number>(0);

  // ゲストユーザーのデータ一時保存
  const questionRef = useRef<string>("");
  const cardsRef = useRef<DrawnCard[]>([]);

  // タイマー管理
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  // コイン機能
  const { consumeCoins, coins } = useCoinContext();

  /**
   * タイマーを登録して実行
   *
   * アンマウント時にクリーンアップできるようタイマーを管理。
   */
  const scheduleTimeout = useCallback((fn: () => void, delay: number) => {
    const timer = setTimeout(fn, delay);
    timersRef.current.push(timer);
    return timer;
  }, []);

  /**
   * 進行アニメーションのクリーンアップ
   *
   * setIntervalと全てのタイマーをクリアし、参照をリセット。
   */
  const cleanupProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  /**
   * 進行アニメーション状態の初期化
   *
   * 全てのRef値を初期状態にリセット。
   */
  const initializeProgressState = useCallback(
    (targetDuration: number, targetMaxProgress: number) => {
      startTimeRef.current = Date.now();
      aiCompletedRef.current = false;
      virtualElapsedRef.current = 0;
      currentSpeedRef.current = 1.0;
      targetSpeedRef.current = 1.0;
      lastSpeedChangeRef.current = Date.now();
      slowIncrementModeRef.current = false;
      lastIncrementTimeRef.current = 0;
      targetDurationRef.current = targetDuration;
      targetMaxProgressRef.current = targetMaxProgress;
      setStreamingProgress(0);
    },
    []
  );

  /**
   * 進行速度の更新
   *
   * 2〜5秒ごとに目標速度をランダムに変更。
   */
  const updateProgressSpeed = useCallback((now: number) => {
    const changeInterval =
      PROGRESS.speed.changeIntervalMin +
      Math.random() *
        (PROGRESS.speed.changeIntervalMax - PROGRESS.speed.changeIntervalMin);

    if (now - lastSpeedChangeRef.current > changeInterval) {
      const speedRange = PROGRESS.speed.max - PROGRESS.speed.min;
      targetSpeedRef.current = PROGRESS.speed.min + Math.random() * speedRange;
      lastSpeedChangeRef.current = now;
    }

    currentSpeedRef.current +=
      (targetSpeedRef.current - currentSpeedRef.current) *
      PROGRESS.speed.smoothing;
  }, []);

  /**
   * 通常進行の進行率計算
   *
   * 仮想経過時間から進行率を算出。
   */
  const calculateNormalProgress = useCallback(
    (targetDuration: number, targetMaxProgress: number) => {
      virtualElapsedRef.current +=
        PROGRESS.timing.intervalMs * currentSpeedRef.current;

      return Math.min(
        (virtualElapsedRef.current / targetDuration) * targetMaxProgress,
        targetMaxProgress
      );
    },
    []
  );

  /**
   * 通常進行モードの更新処理
   *
   * 速度を更新し、進行率を計算・設定。最大値到達で緩速モードへ切り替え。
   */
  const handleNormalProgressUpdate = useCallback(
    (now: number, targetDuration: number, targetMaxProgress: number) => {
      updateProgressSpeed(now);
      const progress = calculateNormalProgress(
        targetDuration,
        targetMaxProgress
      );
      setStreamingProgress(progress);

      if (progress >= targetMaxProgress) {
        slowIncrementModeRef.current = true;
        lastIncrementTimeRef.current = now;
      }
    },
    [updateProgressSpeed, calculateNormalProgress]
  );

  /**
   * 緩速進行モードの更新処理
   *
   * 2秒ごとに1%増加。99%到達時、AI完了なら100%へ遷移。
   */
  const handleSlowProgressUpdate = useCallback(
    (now: number) => {
      setStreamingProgress((currentProgress) => {
        if (currentProgress >= PROGRESS.percent.finalWait) {
          if (aiCompletedRef.current) {
            cleanupProgressInterval();
            scheduleTimeout(() => {
              setStreamingProgress(PROGRESS.percent.complete);
            }, PROGRESS.timing.completionDelayMs);
          }
          return currentProgress;
        }

        if (
          now - lastIncrementTimeRef.current >=
          PROGRESS.timing.slowIncrementIntervalMs
        ) {
          lastIncrementTimeRef.current = now;
          return Math.min(currentProgress + 1, PROGRESS.percent.finalWait);
        }

        return currentProgress;
      });
    },
    [cleanupProgressInterval, scheduleTimeout]
  );

  /**
   * 進行アニメーションの開始
   *
   * 15〜25秒で0%から84〜88%まで可変速度で進行。
   * 最大値到達後は2秒ごとに1%ずつ99%まで増加。
   */
  const startProgressAnimation = useCallback(() => {
    cleanupProgressInterval();

    // 目標時間と最大進行率をランダムに決定
    const durationRange = PROGRESS.duration.max - PROGRESS.duration.min;
    const targetDuration =
      PROGRESS.duration.min + Math.random() * durationRange;

    const progressRange =
      PROGRESS.percent.initialTargetMax - PROGRESS.percent.initialTargetMin;
    const targetMaxProgress =
      PROGRESS.percent.initialTargetMin + Math.random() * progressRange;

    initializeProgressState(targetDuration, targetMaxProgress);

    progressIntervalRef.current = setInterval(() => {
      const now = Date.now();

      if (!slowIncrementModeRef.current) {
        handleNormalProgressUpdate(now, targetDuration, targetMaxProgress);
      } else {
        handleSlowProgressUpdate(now);
      }
    }, PROGRESS.timing.intervalMs);
  }, [
    cleanupProgressInterval,
    initializeProgressState,
    handleNormalProgressUpdate,
    handleSlowProgressUpdate,
  ]);

  /**
   * 処理完了時の最終遷移
   *
   * 99%到達済みなら1秒で100%へ、未到達なら即座に99%へ設定後100%へ遷移。
   */
  const completeProgress = useCallback(() => {
    aiCompletedRef.current = true;

    cleanupProgressInterval();

    setStreamingProgress((currentProgress) => {
      if (currentProgress >= PROGRESS.percent.finalWait) {
        scheduleTimeout(() => {
          setStreamingProgress(PROGRESS.percent.complete);
        }, PROGRESS.timing.completionDelayMs);
        return currentProgress;
      } else {
        scheduleTimeout(() => {
          setStreamingProgress(PROGRESS.percent.complete);
        }, PROGRESS.timing.completionDelayMs);
        return PROGRESS.percent.finalWait;
      }
    });
  }, [cleanupProgressInterval, scheduleTimeout]);

  /**
   * カード抽選
   *
   * 3枚のタロットカードをランダムに抽選し、正位置・逆位置を決定。
   */
  const handleDrawCards = useCallback(() => {
    setResult("");
    setCards(drawThreeCards());
  }, []);

  /**
   * 占い実行
   *
   * ログイン・コイン確認後、質問とカード情報をAPIに送信し、
   * ストリーミングで結果を受信・保存。
   */
  const handleFortune = useCallback(
    async (
      user: AuthUser | null,
      onRequireLogin: () => void,
      onRequireCoins: () => void
    ) => {
      if (isLoading) return;

      setIsLoading(true);
      setShowWaitingAnimation(true);
      setStreamingProgress(0);
      startProgressAnimation();
      setResult("");
      setError(null);

      // ログイン確認
      if (!user) {
        questionRef.current = question;
        cardsRef.current = cards;
        onRequireLogin();
        cleanupProgressInterval();
        setIsLoading(false);
        setShowWaitingAnimation(false);
        return;
      }

      // コイン確認
      if (coins < COIN.cost) {
        onRequireCoins();
        cleanupProgressInterval();
        setIsLoading(false);
        setShowWaitingAnimation(false);
        return;
      }

      try {
        await consumeCoins(COIN.cost);

        const cardData: CardData[] = cards.map((c) => ({
          cardName: c.card.name,
          isReversed: c.isReversed,
          position: c.position,
        }));

        const response = await callFortuneAPI({ question, cards: cardData });

        if (!response.ok) {
          cleanupProgressInterval();
          const errorMessage = await handleAPIError(response);
          setError(errorMessage);
          setIsLoading(false);
          setShowWaitingAnimation(false);
          return;
        }

        const finalResult = await processStreamingResponse(response, () => {});

        await saveFortuneResult(user, question, cardData, finalResult);

        completeProgress();

        scheduleTimeout(() => {
          setResult(finalResult);
          setShowWaitingAnimation(false);
          setIsLoading(false);
          setHasFortuned(true);
        }, PROGRESS.timing.resultDisplayDelayMs);
      } catch {
        cleanupProgressInterval();
        setError(ERROR_MESSAGES.paymentFailed);
        setIsLoading(false);
        setShowWaitingAnimation(false);
      }
    },
    [
      isLoading,
      question,
      cards,
      coins,
      consumeCoins,
      cleanupProgressInterval,
      startProgressAnimation,
      completeProgress,
      scheduleTimeout,
    ]
  );

  /**
   * ゲストデータの復元
   *
   * ログイン前に入力された質問とカード情報を復元。
   */
  const restoreGuestData = useCallback((user: AuthUser | null) => {
    if (user && questionRef.current) {
      setQuestion(questionRef.current);
    }
    if (user && cardsRef.current.length > 0) {
      setCards(cardsRef.current);
    }
  }, []);

  /**
   * 状態リセット
   *
   * 全ての占い状態を初期化し、新規占いを可能にする。
   */
  const resetFortune = useCallback(() => {
    cleanupProgressInterval();

    setQuestion("");
    setCards([]);
    setResult("");
    setError(null);
    setHasFortuned(false);
    setShowWaitingAnimation(false);
    setStreamingProgress(0);

    questionRef.current = "";
    cardsRef.current = [];
  }, [cleanupProgressInterval]);

  // アンマウント時のクリーンアップ
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  return {
    question,
    cards,
    result,
    isLoading,
    hasFortuned,
    error,
    showWaitingAnimation,
    streamingProgress,
    setQuestion,
    handleDrawCards,
    handleFortune,
    restoreGuestData,
    resetFortune,
    setShowWaitingAnimation,
  };
};
