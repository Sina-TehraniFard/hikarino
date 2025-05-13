import React, { useEffect, useRef, useState } from "react";

interface CoinPurchaseModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ANIMATION_DURATION = 350; // ms

const purchaseOptions = [
    {
        coins: 100,
        price: 150,
        priceStr: "150円",
        perFortune: "150円",
        discount: null,
        originalPrice: null,
        url: "#buy-100",
    },
    {
        coins: 380,
        price: 300,
        priceStr: "300円",
        perFortune: "118円",
        discount: "約21%OFF",
        originalPrice: 570, // 100コイン×3.8
        url: "#buy-380",
    },
    {
        coins: 1120,
        price: 800,
        priceStr: "800円",
        perFortune: "約107円",
        discount: "約29%OFF",
        originalPrice: 1680, // 100コイン×11.2
        url: "#buy-1120",
    },
    {
        coins: 3000,
        price: 1800,
        priceStr: "1800円",
        perFortune: "90円",
        discount: "約40%OFF",
        originalPrice: 4500, // 100コイン×30
        url: "#buy-3000",
    },
];

const CoinPurchaseModal: React.FC<CoinPurchaseModalProps> = ({ isOpen, onClose }) => {
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
        <div className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-350 ${animate ? "bg-black/40 overlay-fadein" : "bg-black/0 overlay-fadeout"}`}>
            <div
                ref={modalRef}
                className={`w-full max-w-md mx-auto rounded-t-3xl bg-white shadow-2xl p-8 pb-10 flex flex-col items-center ${animate ? "animate-slideup" : "animate-slidedown"}`}
                style={{
                    minHeight: 320,
                    boxShadow: "0 8px 32px 0 rgba(80, 0, 80, 0.18)",
                    borderTopLeftRadius: 32,
                    borderTopRightRadius: 32,
                    marginBottom: 0,
                }}
            >
                <div className="w-12 h-1.5 bg-gray-300 rounded-full mb-4" />
                <h2 className="text-2xl font-bold mb-2 text-purple-700">コインを購入</h2>
                <p className="mb-6 text-gray-600 text-center">コインが足りません。コインを購入して続けましょう。</p>
                <div className="w-full flex flex-col gap-4 mb-2">
                    {purchaseOptions.map(opt => (
                        <button
                            key={opt.coins}
                            onClick={() => window.open(opt.url, '_blank')}
                            className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition font-semibold shadow-sm
                                ${opt.discount ? "border-yellow-400 bg-yellow-50 hover:bg-yellow-100 active:scale-[0.97]" : "border-purple-200 bg-purple-50 hover:bg-purple-100 active:scale-[0.97]"}
                            `}
                        >
                            <div className="flex flex-col items-start">
                                <span className="text-lg font-bold text-purple-700">{opt.coins}コイン</span>
                                <span className="text-xs text-gray-500">1占い相当額: {opt.perFortune}</span>
                                {opt.discount && (
                                    <span className="text-xs text-yellow-600 font-bold mt-1">{opt.discount}</span>
                                )}
                            </div>
                            <div className="flex flex-col items-end">
                                {opt.discount && opt.originalPrice && (
                                    <span className="text-sm text-gray-400 line-through">{opt.originalPrice}円</span>
                                )}
                                <span className={`text-xl font-extrabold ${opt.discount ? "text-yellow-600" : "text-purple-700"}`}>{opt.priceStr}</span>
                            </div>
                        </button>
                    ))}
                </div>
                <button onClick={onClose} className="w-full text-gray-400 hover:text-gray-600 text-base mt-2">
                    閉じる
                </button>
            </div>
            <style jsx global>{`
                @keyframes slideup {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }

                @keyframes slidedown {
                    from {
                        transform: translateY(0);
                    }
                    to {
                        transform: translateY(100%);
                    }
                }
                .animate-slideup {
                    animation: slideup 0.35s cubic-bezier(0.4,0,0.2,1);
                }
                .animate-slidedown {
                    animation: slidedown 0.35s cubic-bezier(0.4,0,0.2,1);
                }
                .overlay-fadein {
                    transition: background 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s cubic-bezier(0.4,0,0.2,1);
                    background: rgba(0,0,0,0.4) !important;
                }
                .overlay-fadeout {
                    transition: background 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.35s cubic-bezier(0.4,0,0.2,1);
                    background: rgba(0,0,0,0) !important;
                }
            `}</style>
        </div>
    );
};

export default CoinPurchaseModal; 