"use client";

import { useState, useEffect, useRef } from "react";
import { drawThreeCards, DrawnCard } from "@/lib/tarot";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { saveFortune } from "@/lib/firestore/fortune";
import Header from "@/components/Header";
import { useCoinContext } from "@/contexts/CoinContext";
import LoginModal from "@/components/LoginModal";
import CoinPurchaseModal from "@/components/CoinPurchaseModal";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [cards, setCards] = useState<DrawnCard[]>([]);
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasFortuned, setHasFortuned] = useState(false);
    const { consumeCoins, coins } = useCoinContext();
    const [error, setError] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const questionRef = useRef<string>("");
    const cardsRef = useRef<DrawnCard[]>([]);
    const [showCoinModal, setShowCoinModal] = useState(false);

    useEffect(() => {
        if (user && questionRef.current) setQuestion(questionRef.current);
        if (user && cardsRef.current.length > 0) setCards(cardsRef.current);
    }, [user]);

    if (loading) return null;

    const handleDraw = () => {
        setResult("");
        setCards(drawThreeCards());
    };

    const handleFortune = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setResult("");
        setError(null);
        if (!user) {
            questionRef.current = question;
            cardsRef.current = cards;
            setShowLogin(true);
            setIsLoading(false);
            return;
        }
        if (coins < 100) {
            setShowCoinModal(true);
            setIsLoading(false);
            return;
        }
        try {
            await consumeCoins(100);
        } catch {
            setError("コイン消費時にエラーが発生しました。");
            setIsLoading(false);
            return;
        }
        const res = await fetch("/api/fortune", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                question,
                cards: cards.map((c) => ({
                    cardName: c.card.name,
                    isReversed: c.isReversed,
                    position: c.position,
                })),
            }),
        });
        if (!res.ok) {
            const data = await res.json().catch(() => ({}));
            setError(data.error || "AI出力時にエラーが発生しました。");
            setIsLoading(false);
            return;
        }
        const reader = res.body?.getReader();
        if (!reader) {
            setIsLoading(false);
            return;
        }
        const decoder = new TextDecoder();
        let accumulatedText = "";
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            const text = decoder.decode(value);
            accumulatedText += text;
            setResult(accumulatedText);
        }
        await saveFortune({
            uid: user.uid,
            question,
            cards: cards.map((c) => ({
                cardName: c.card.name,
                isReversed: c.isReversed,
                position: c.position,
            })),
            result: accumulatedText,
        });
        setIsLoading(false);
        setHasFortuned(true);
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
            <Header user={user || { displayName: "ゲスト", email: "", uid: undefined }} coins={user ? coins : 0} onLogout={handleLogout} onRequireLogin={() => setShowLogin(true)} userId={user?.uid} />
            <div className="flex items-center rounded-xl overflow-hidden max-w-md w-full h-24 mb-8">
                <div className="relative w-24 h-full flex-shrink-0 overflow-hidden rounded-l-xl">
                    <img
                        src="/hikarino-normal.png"
                        alt="ヒカリノ"
                        className="w-full h-full object-cover object-top"
                        style={{
                            objectPosition: "center 10%",
                        }}
                    />
                </div>
                <div className="px-4">
                    <p className="text-gray-800 font-semibold text-sm leading-tight">ヒカリノ</p>
                    <p className="text-gray-600 text-sm leading-tight">あなたの心にそっと寄り添います。</p>
                </div>
            </div>

            <div className="w-full max-w-md mb-4">
                <textarea
                    className="w-full max-w-md border-2 border-purple-100 focus:border-purple-300 rounded-xl text-base text-gray-700 placeholder-gray-400 p-4 transition"
                    placeholder="100文字以内で占いたいことを書いてください（例：仕事の今後が知りたいです）"
                    maxLength={100}
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    rows={3}
                />
            </div>

            {cards.length === 0 && (
                <button
                    onClick={handleDraw}
                    className="w-full max-w-md bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full px-8 py-3 shadow transition disabled:opacity-50"
                >
                    カードを引く
                </button>
            )}

            {cards.length > 0 && (
                <>
                    <div className="mt-4 mb-6 flex gap-6 justify-center">
                        {cards.map((item, idx) => (
                            <div
                                key={idx}
                                className="rounded-xl shadow-md p-2 flex flex-col items-center w-28 border border-purple-100"
                            >
                                <img
                                    src={item.card.imagePath}
                                    alt={item.card.name}
                                    className={`w-24 aspect-[3/4] object-contain mb-2 ${item.isReversed ? "rotate-180" : ""}`}
                                />
                                <span className="w-full text-center text-xs text-gray-500 mt-1">{item.card.name}</span>
                                <span className="w-full text-center text-xs text-gray-500 mt-1">{item.isReversed ? "逆位置" : "正位置"}</span>
                            </div>
                        ))}
                    </div>

                    {!hasFortuned && !isLoading && (
                        <>
                        <button
                            onClick={handleFortune}
                            disabled={isLoading}
                            className="w-full max-w-md bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full px-8 py-3 shadow transition disabled:opacity-50"
                        >
                            ヒカリノに解釈してもらう
                        </button>
                        {error && <div className="text-red-500 text-center mt-2">{error}</div>}
                        </>
                    )}
                </>
            )}

            <div className="mt-10 w-full max-w-md">
                {hasFortuned && (
                    <div className="mb-6 text-center transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full max-w-md bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full px-8 py-3 shadow transition disabled:opacity-50"
                        >
                            もう一度占う
                        </button>
                    </div>
                )}
                <div className="rounded-2xl shadow-lg min-h-[200px] flex items-center justify-center border border-purple-100 p-8 transition-all duration-300 ease-in-out">
                    {result ? (
                        <div className="whitespace-pre-wrap text-lg leading-relaxed text-gray-700 w-full">{result}</div>
                    ) : (
                        <div className="text-gray-300 text-center w-full">
                            カードを引いて、ヒカリノに解釈してもらいましょう。
                        </div>
                    )}
                </div>
                {hasFortuned && (
                    <div className="mt-6 text-center transition-all duration-300 ease-in-out">
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full max-w-md bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full px-8 py-3 shadow transition disabled:opacity-50"
                        >
                            もう一度占う
                        </button>
                    </div>
                )}
            </div>
            <CoinPurchaseModal isOpen={showCoinModal} onClose={() => setShowCoinModal(false)} />
        </main>
    );
}