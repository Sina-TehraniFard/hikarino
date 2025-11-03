/**
 * 占い機能の制御
 *
 * 質問管理、カード抽選、結果取得、エラー処理を統合したカスタムフック。
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

  // コイン機能
  const { consumeCoins, coins } = useCoinContext();

  /**
   * 進行アニメーションの開始
   *
   * 15〜25秒で0%から84〜88%まで可変速度で進行。
   * 最大値到達後は2秒ごとに1%ずつ99%まで増加。
   */
  const startProgressAnimation = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    // 目標時間と最大進行率をランダムに決定
    const minDuration = 15000;
    const maxDuration = 25000;
    const targetDuration =
      minDuration + Math.random() * (maxDuration - minDuration);
    targetDurationRef.current = targetDuration;

    const minMaxProgress = 84;
    const maxMaxProgress = 88;
    const targetMaxProgress =
      minMaxProgress + Math.random() * (maxMaxProgress - minMaxProgress);
    targetMaxProgressRef.current = targetMaxProgress;

    // 初期化
    startTimeRef.current = Date.now();
    aiCompletedRef.current = false;
    virtualElapsedRef.current = 0;
    currentSpeedRef.current = 1.0;
    targetSpeedRef.current = 1.0;
    lastSpeedChangeRef.current = Date.now();
    slowIncrementModeRef.current = false;
    lastIncrementTimeRef.current = 0;

    setStreamingProgress(0);

    progressIntervalRef.current = setInterval(() => {
      const now = Date.now();

      if (!slowIncrementModeRef.current) {
        // 通常進行: 2〜5秒ごとに速度を0.3〜1.2倍で変動
        if (now - lastSpeedChangeRef.current > 2000 + Math.random() * 3000) {
          targetSpeedRef.current = 0.3 + Math.random() * 0.9;
          lastSpeedChangeRef.current = now;
        }

        // 速度を滑らかに遷移
        currentSpeedRef.current +=
          (targetSpeedRef.current - currentSpeedRef.current) * 0.1;

        virtualElapsedRef.current += 100 * currentSpeedRef.current;

        const progress = Math.min(
          (virtualElapsedRef.current / targetDuration) * targetMaxProgress,
          targetMaxProgress
        );

        setStreamingProgress(progress);

        if (progress >= targetMaxProgress) {
          slowIncrementModeRef.current = true;
          lastIncrementTimeRef.current = now;
        }
      } else {
        // 緩速進行: 2秒ごとに1%増加
        setStreamingProgress((currentProgress) => {
          if (currentProgress >= 99) {
            if (aiCompletedRef.current) {
              if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
                progressIntervalRef.current = null;
              }
              setTimeout(() => {
                setStreamingProgress(100);
              }, 1000);
            }
            return currentProgress;
          }

          if (now - lastIncrementTimeRef.current >= 2000) {
            lastIncrementTimeRef.current = now;
            return Math.min(currentProgress + 1, 99);
          }

          return currentProgress;
        });
      }
    }, 100);
  }, []);

  /**
   * 処理完了時の最終遷移
   *
   * 99%到達済みなら1秒で100%へ、未到達なら即座に99%へ設定後100%へ遷移。
   */
  const completeProgress = useCallback(() => {
    aiCompletedRef.current = true;

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setStreamingProgress((currentProgress) => {
      if (currentProgress >= 99) {
        setTimeout(() => {
          setStreamingProgress(100);
        }, 1000);
        return currentProgress;
      } else {
        setTimeout(() => {
          setStreamingProgress(100);
        }, 1000);
        return 99;
      }
    });
  }, []);

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
        setIsLoading(false);
        setShowWaitingAnimation(false);
        return;
      }

      // コイン確認
      if (coins < 100) {
        onRequireCoins();
        setIsLoading(false);
        setShowWaitingAnimation(false);
        return;
      }

      try {
        await consumeCoins(100);

        const cardData: CardData[] = cards.map((c) => ({
          cardName: c.card.name,
          isReversed: c.isReversed,
          position: c.position,
        }));

        const response = await callFortuneAPI({ question, cards: cardData });

        if (!response.ok) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          const errorMessage = await handleAPIError(response);
          setError(errorMessage);
          setIsLoading(false);
          setShowWaitingAnimation(false);
          return;
        }

        const finalResult = await processStreamingResponse(response, () => {});

        await saveFortuneResult(user, question, cardData, finalResult);

        completeProgress();

        setTimeout(() => {
          setResult(finalResult);
          setShowWaitingAnimation(false);
          setIsLoading(false);
          setHasFortuned(true);
        }, 1500);
      } catch {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        setError(
          "決済処理中に問題が発生しました。コインが消費されていないか確認の上、もう一度お試しください。"
        );
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
      startProgressAnimation,
      completeProgress,
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
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    setQuestion("");
    setCards([]);
    setResult("");
    setError(null);
    setHasFortuned(false);
    setShowWaitingAnimation(false);
    setStreamingProgress(0);

    questionRef.current = "";
    cardsRef.current = [];
  }, []);

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
