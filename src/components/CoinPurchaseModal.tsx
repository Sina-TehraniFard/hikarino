import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import dynamic from "next/dynamic";
import GlassBox from "@/components/ui/GlassBox";
import ModalHeader from "@/components/ui/ModalHeader";

const LottieAnimation = dynamic(() => import('lottie-react'), { ssr: false });

declare global {
    interface Window {
        user?: {
            uid: string;
        };
    }
}

interface CoinPurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    uid?: string;
}

const ANIMATION_DURATION = 350; // ms

const purchaseOptions = [
    {
        coins: 3000,
        price: 1800,
        priceStr: "1,800円",
        perFortune: "90円",
        discount: "40%OFF",
        originalPrice: 4500,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm", // TODO: update to actual Stripe Price ID for 3000 coins
        badge: "人気No.1",
        recommended: true
    },
    {
        coins: 1120,
        price: 800,
        priceStr: "800円",
        perFortune: "約107円",
        discount: "29%OFF",
        originalPrice: 1680,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm", // TODO: update to actual Stripe Price ID for 1120 coins
    },
    {
        coins: 380,
        price: 300,
        priceStr: "300円",
        perFortune: "118円",
        discount: "21%OFF",
        originalPrice: 570,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm", // TODO: update to actual Stripe Price ID for 380 coins
    },
    {
        coins: 100,
        price: 150,
        priceStr: "150円",
        perFortune: "150円",
        discount: null,
        originalPrice: null,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm"
    },
];

const CoinPurchaseModal: React.FC<CoinPurchaseModalProps> = ({ isOpen, onClose, uid }) => {
    const modalRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(isOpen);
    const [animate, setAnimate] = useState(false);
    const [isSecurityExpanded, setIsSecurityExpanded] = useState(false);

    // モーダルのマウント/アンマウント制御
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            // モバイルでの背景スクロール防止
            document.body.style.overflow = 'hidden';
            // requestAnimationFrameで確実に次のフレームでアニメーション開始
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    setAnimate(true);
                });
            });
        } else if (visible) {
            setAnimate(false);
            // 背景スクロールを元に戻す
            document.body.style.overflow = 'unset';
            const timer = setTimeout(() => setVisible(false), ANIMATION_DURATION);
            return () => clearTimeout(timer);
        }
    }, [isOpen, visible]);

    // ESCキーや外側クリックで閉じる
    useEffect(() => {
        if (!visible) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose, visible]);

    // クリーンアップ時にスクロールを元に戻す
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    if (!visible) return null;

    const modalContent = (
        <div 
            className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 ${animate ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"} transition-all duration-200`}
            onClick={(e) => {
                // オーバーレイクリックでモーダルを閉じる
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <div
                ref={modalRef}
                className={`w-full max-w-md max-h-[90vh] overflow-y-auto scrollbar-hide transform ${animate ? "scale-100 opacity-100" : "scale-90 opacity-0"} transition-all duration-200 ease-out`}
            >
                <GlassBox className="flex flex-col overflow-hidden">
                    <ModalHeader 
                        title="コインを購入"
                        animationPath="/animation/shopping-cart.json"
                        showCloseButton={false}
                    />
                    
                    <div className="px-6 md:px-8 pb-8 md:pb-10">
                
                {/* Stripeセキュリティ情報 */}
                <div className="w-full mb-6 mt-4">
                    <div className={`bg-gradient-to-b from-blue-50 to-blue-50/60 dark:from-blue-950/20 dark:to-blue-950/10 border border-blue-200 dark:border-blue-800 rounded-lg transition-all duration-500 ease-in-out ${isSecurityExpanded ? 'pb-4' : ''}`}>
                        <button
                            onClick={() => setIsSecurityExpanded(!isSecurityExpanded)}
                            className="w-full flex items-center justify-between gap-2 px-4 py-3 hover:bg-blue-100/50 dark:hover:bg-blue-950/30 rounded-t-lg transition-colors duration-200"
                        >
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">安心・安全なお支払い</span>
                            </div>
                            <svg 
                                className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isSecurityExpanded ? 'rotate-180' : ''}`} 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        
                        {/* 展開時の詳細情報 */}
                        <div className={`transition-all duration-500 ease-in-out ${isSecurityExpanded ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`} style={{ overflow: 'hidden' }}>
                            <div className="px-4 pb-2">
                                <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed space-y-3">
                                    <p className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">●</span>
                                        <span>安心してご購入いただけるように、世界中で利用されている決済サービス「<span className="font-semibold">Stripe</span>」を導入しています。</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">●</span>
                                        <span>ご入力いただくカード情報は暗号化され、Stripeのセキュアな環境下でのみ安全に処理されます。</span>
                                    </p>
                                    <p className="flex items-start gap-2">
                                        <span className="text-blue-500 mt-0.5">●</span>
                                        <span>ご自身の大切な情報が外部に漏れることはありません。</span>
                                    </p>
                                    <a href="https://stripe.com/jp/resources/more/secure-payment-systems-explained" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1 font-medium mt-2">
                                        ▶ Stripeのセキュリティについて詳しく見る
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="w-full flex flex-col gap-4 mb-8">
                    {purchaseOptions.map(opt => (
                        <div className={opt.recommended ? "relative" : ""}>
                            {/* 人気プランの上に社会的証明テキストを配置 */}
                            {opt.recommended && (
                                <div className="text-center mb-2">
                                    <p className="text-xs text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                                        <span>⭐</span>
                                        <span>8割以上のユーザーがこのプランを選択</span>
                                    </p>
                                </div>
                            )}
                        <button
                            key={opt.coins}
                            onClick={async () => {
                                if (!uid) {
                                    alert('ログインが必要です');
                                    return;
                                }
                                const res = await fetch('/api/create-checkout-session', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        priceId: opt.priceId,
                                        uid,
                                        coinAmount: opt.coins,
                                    }),
                                });
                                const data = await res.json();
                                if (data.url) {
                                    window.location.href = data.url;
                                } else {
                                    alert(data.error || '決済ページの生成に失敗しました');
                                }
                            }}
                            className={`w-full flex items-stretch h-[140px] px-6 rounded-2xl transition-all duration-300 relative group overflow-hidden
                                ${opt.recommended 
                                    ? "bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30 border-2 border-amber-400 dark:border-amber-600 shadow-xl hover:shadow-2xl transform hover:-translate-y-1" 
                                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl hover:border-gray-300 dark:hover:border-gray-600"
                                }
                            `}
                        >
                            {/* おすすめバッジ - カード内上部に配置 */}
                            {opt.recommended && (
                                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/10 to-yellow-400/10 dark:from-amber-600/10 dark:to-yellow-600/10"></div>
                            )}
                            
                            <div className="flex flex-col justify-between z-10 flex-1 py-4">
                                <div className="flex flex-col items-start">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-2xl font-bold ${
                                            opt.recommended ? "text-amber-700 dark:text-amber-300" : "text-gray-900 dark:text-gray-100"
                                        }`}>{opt.coins.toLocaleString()}</span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">コイン</span>
                                    </div>
                                    
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                                        1占い相当: <span className="font-semibold">{opt.perFortune}</span>
                                    </span>
                                    
                                    {opt.discount && (
                                        <div className="mt-2 inline-flex items-center gap-1.5 bg-rose-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            {opt.discount}
                                        </div>
                                    )}
                                    
                                </div>
                            </div>
                            
                            <div className="flex flex-col justify-between items-end z-10 py-4 min-w-[120px]">
                                <div className="flex flex-col items-end mb-4">
                                    {opt.discount && opt.originalPrice && (
                                        <span className="text-sm text-gray-400 line-through font-medium leading-5 h-5">
                                            {opt.originalPrice.toLocaleString()}円
                                        </span>
                                    )}
                                    {!opt.discount && (
                                        <div className="h-5"></div>
                                    )}
                                    
                                    <div className="text-right mt-1">
                                        <span className={`text-3xl font-bold leading-9 ${
                                            opt.recommended ? "text-amber-700 dark:text-amber-300" : "text-gray-900 dark:text-gray-100"
                                        }`}>
                                            {opt.priceStr}
                                        </span>
                                    </div>
                                </div>
                                
                                <button className={`w-full px-6 py-3 rounded-lg font-bold text-sm leading-4 transition-all duration-200 transform active:scale-95 ${
                                    opt.recommended 
                                        ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl" 
                                        : "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg"
                                }`}>
                                    今すぐ購入
                                </button>
                            </div>
                        </button>
                        </div>
                    ))}
                </div>
                
                        <button onClick={onClose} className="w-full text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 font-medium px-6 py-3 rounded-lg transition-all duration-200 mt-6">
                            後で購入する
                        </button>
                    </div>
                </GlassBox>
            </div>
        </div>
    );

    // React Portalを使用してbody直下にモーダルを配置
    return createPortal(modalContent, document.body);
};

export default CoinPurchaseModal; 