/**
 * コインアニメーション用カスタムフック
 * 
 * 【何をするフック？】
 * コインの数が変わったときに、「パラパラ」と数字がアニメーションで変わる効果を作るフックです。
 * 
 * 【例え話】
 * ゲームでポイントが増減するとき、いきなり「100→200」と変わるより、
 * 「100→101→102→...→200」とカウントアップする方が気持ちいいですよね。
 * このフックは、そんな「数字が動く演出」を作ります。
 * 
 * 【具体的なシーン】
 * - 占いでコインを100消費したとき：500 → 499 → 498 → ... → 400
 * - コインを購入したとき：400 → 401 → 402 → ... → 500
 * 
 * 【技術的なポイント】
 * ただの数字表示だと味気ないので、「お金を使った感」「お金をもらった感」を
 * 演出で表現することで、ユーザー体験を向上させています。
 */

import { useState, useEffect, useRef } from "react";

export const useCoinAnimation = (coins: number, userId?: string) => {
  // ===== 状態管理 =====
  
  // 画面に表示するコイン数（アニメーション用）
  // 実際のコイン数とは違って、少しずつ変化していく
  const [displayCoins, setDisplayCoins] = useState(coins);
  
  // ===== アニメーション制御用の参照 =====
  
  // setInterval（一定間隔で処理を繰り返す仕組み）のIDを保存
  // アニメーションを途中で止めるときに使用
  const animatingRef = useRef<NodeJS.Timeout | null>(null);
  
  // 前回のユーザーIDを記憶（ユーザー切り替え検知用）
  const prevUserId = useRef<string | undefined>(userId);
  
  // 初回表示かどうかを判定するフラグ
  // 初回はアニメーションせず、即座に正しい値を表示
  const isInitialMount = useRef(true);

  // ===== メインのアニメーション処理 =====
  // coins, userId, displayCoinsのいずれかが変わったときに実行される
  useEffect(() => {
    
    // ===== 初回表示の処理 =====
    if (isInitialMount.current) {
      // 初回はアニメーションなしで即座に表示
      // （ページを開いたときにいきなりアニメーションが始まるのは不自然なため）
      setDisplayCoins(coins);
      isInitialMount.current = false;
      return;
    }

    // ===== ユーザー切り替えの処理 =====
    if (prevUserId.current !== userId) {
      // 別のユーザーに切り替わった場合もアニメーションなしで即座に表示
      // （ログイン/ログアウト時に前のユーザーのコインからアニメーションするのは変なため）
      setDisplayCoins(coins);
      prevUserId.current = userId;
      return;
    }

    // ===== コイン減少時のアニメーション =====
    if (displayCoins > coins) {
      // 現在進行中のアニメーションがあれば停止
      if (animatingRef.current) clearInterval(animatingRef.current);
      
      // 減る数を計算（例：500 → 400 なら diff = 100）
      const diff = displayCoins - coins;
      
      // アニメーション速度を計算
      // 100コイン減る場合：100 / 100 = 1ms間隔 = とても速い
      // 実際は最低限の間隔を確保して自然な速度にする
      const interval = Math.max(100 / diff, 10); // 最低10ms間隔
      
      // 一定間隔で1ずつ減らすアニメーションを開始
      animatingRef.current = setInterval(() => {
        setDisplayCoins((prev) => {
          // 目標値に近づいたらアニメーション終了
          if (prev <= coins + 1) {
            clearInterval(animatingRef.current!);
            return coins; // 正確な最終値に設定
          }
          return prev - 1; // 1ずつ減らす
        });
      }, interval);
      
    // ===== コイン増加時のアニメーション =====
    } else if (displayCoins < coins) {
      // 現在進行中のアニメーションがあれば停止
      if (animatingRef.current) clearInterval(animatingRef.current);
      
      // 増える数を計算（例：400 → 500 なら diff = 100）
      const diff = coins - displayCoins;
      
      // アニメーション速度を計算
      // 増加時は少しゆっくりめにして「もらった感」を演出
      const interval = Math.max(400 / diff, 15); // 最低15ms間隔
      
      // 一定間隔で1ずつ増やすアニメーションを開始
      animatingRef.current = setInterval(() => {
        setDisplayCoins((prev) => {
          // 目標値に近づいたらアニメーション終了
          if (prev >= coins - 1) {
            clearInterval(animatingRef.current!);
            return coins; // 正確な最終値に設定
          }
          return prev + 1; // 1ずつ増やす
        });
      }, interval);
      
    // ===== 変化なしの場合 =====
    } else {
      // displayCoinsとcoinsが同じ場合は何もしない
      setDisplayCoins(coins);
    }
    
    // ===== クリーンアップ処理 =====
    // コンポーネントが削除されるときやuseEffectが再実行されるときに
    // 進行中のアニメーションを停止して、メモリリークを防ぐ
    return () => {
      if (animatingRef.current) clearInterval(animatingRef.current);
    };
  }, [coins, userId, displayCoins]);
  // ↑ これらの値が変わったときにのみ、このeffectを再実行

  // ===== 外部への提供 =====
  // アニメーション中の表示用コイン数を返す
  // 使う側は「coins」ではなく「displayCoins」を画面に表示する
  return displayCoins;
};