import React, { useEffect, useRef, useState } from "react";

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
        priceStr: "1800円",
        perFortune: "90円",
        discount: "約40%OFF",
        originalPrice: 4500,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm", // TODO: update to actual Stripe Price ID for 3000 coins
    },
    {
        coins: 1120,
        price: 800,
        priceStr: "800円",
        perFortune: "約107円",
        discount: "約29%OFF",
        originalPrice: 1680,
        priceId: "price_1RTEv1RmjFj4VlHm2Vuq5Rtm", // TODO: update to actual Stripe Price ID for 1120 coins
    },
    {
        coins: 380,
        price: 300,
        priceStr: "300円",
        perFortune: "118円",
        discount: "約21%OFF",
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

    // モーダルのマウント/アンマウント制御
    useEffect(() => {
        if (isOpen) {
            setVisible(true);
            setTimeout(() => setAnimate(true), 10); // マウント直後にスライドアップ
        } else if (visible) {
            setAnimate(false);
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

    useEffect(() => {
        if (!visible) return;
        const handleClick = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [onClose, visible]);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 z-50 flex items-end justify-center ${animate ? "bg-black/50 backdrop-blur-sm" : "bg-black/0"} transition-all duration-300`}>
            <div
                ref={modalRef}
                className={`w-full max-w-md mx-auto rounded-t-3xl bg-white dark:bg-gray-800 shadow-2xl p-8 pb-10 flex flex-col items-center transform ${animate ? "translate-y-0" : "translate-y-full"} transition-transform duration-300 ease-out min-h-[320px]`}
            >
                <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mb-4" />
                <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-purple-600 dark:text-purple-400">コインを購入</h2>
                <p className="mb-6 text-gray-600 dark:text-gray-400 text-center leading-relaxed">コインが足りません。コインを購入して続けましょう。</p>
                <div className="w-full flex flex-col gap-4 mb-2">
                    {purchaseOptions.map(opt => (
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
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-xl border-2 transition-all duration-200 font-medium shadow-md hover:shadow-lg relative active:scale-95
                                ${opt.coins === 3000 ? "border-purple-600 bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/20 dark:hover:bg-purple-950/30 dark:border-purple-500" : 
                                  opt.coins === 100 ? "border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border-gray-600" :
                                  "border-purple-400 bg-purple-50/50 hover:bg-purple-100/50 dark:bg-purple-950/10 dark:hover:bg-purple-950/20 dark:border-purple-500"}
                            `}
                        >
                            {opt.coins === 3000 && (
                                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    おすすめ
                                </div>
                            )}
                            <div className="flex flex-col items-start">
                                <span className={`text-lg font-bold ${
                                    opt.coins === 3000 ? "text-purple-700 dark:text-purple-300" :
                                    opt.coins === 100 ? "text-gray-700 dark:text-gray-300" :
                                    "text-purple-600 dark:text-purple-400"
                                }`}>{opt.coins}コイン</span>
                                <span className="text-xs text-gray-600 dark:text-gray-400">1占い相当額: {opt.perFortune}</span>
                                {opt.discount && (
                                    <span className={`text-base font-bold ${
                                        opt.coins === 3000 ? "text-purple-600 dark:text-purple-400" : "text-purple-500 dark:text-purple-400"
                                    } mt-1`}>{opt.discount}</span>
                                )}
                            </div>
                            <div className="flex flex-col items-end">
                                {opt.discount && opt.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">{opt.originalPrice}円</span>
                                )}
                                <span className={`text-xl font-bold ${
                                    opt.coins === 3000 ? "text-purple-700 dark:text-purple-300" :
                                    opt.coins === 100 ? "text-gray-700 dark:text-gray-300" :
                                    "text-purple-600 dark:text-purple-400"
                                }`}>{opt.priceStr}</span>
                                <span className={`text-sm mt-1 flex items-center gap-1 ${
                                    opt.coins === 3000 ? "text-purple-600 dark:text-purple-400" :
                                    opt.coins === 100 ? "text-gray-600 dark:text-gray-400" :
                                    "text-purple-500 dark:text-purple-400"
                                }`}>
                                    購入する
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </span>
                            </div>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="w-full text-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-950/20 font-medium px-6 py-3 rounded-lg transition-all duration-200 mt-2">
                    閉じる
                </button>
            </div>
        </div>
    );
};

export default CoinPurchaseModal; 