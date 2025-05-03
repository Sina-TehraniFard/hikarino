"use client";

import { useState, useEffect } from "react";
import { drawThreeCards, DrawnCard } from "@/lib/tarot";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { saveFortune } from "@/lib/firestore/fortune";
import Header from "@/components/Header";

export default function Home() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [question, setQuestion] = useState("");
    const [cards, setCards] = useState<DrawnCard[]>([]);
    const [result, setResult] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [hasFortuned, setHasFortuned] = useState(false);

    useEffect(() => {
        if (!loading && user === null) {
            router.push('/login');
        }
    }, [user, loading, router]);
    if (loading) return null;
    if (!user) return null;

    const handleDraw = () => {
        setResult("");
        setCards(drawThreeCards());
    };

    const handleFortune = async () => {
        if (isLoading) return;
        setIsLoading(true);
        setResult("");

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
        router.push('/login');
    };

    return (
        <main className="flex flex-col items-center justify-start p-6 ">
            <Header user={user} onLogout={handleLogout} />
            <div className="flex items-center bg-purple-100 rounded-xl overflow-hidden max-w-md w-full h-24 mb-8">
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
                    className="w-full max-w-md border-2 border-purple-100 focus:border-purple-300 rounded-xl bg-gray-50 text-base text-gray-700 placeholder-gray-400 p-4 transition"
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
                                className="bg-gray-50 rounded-xl shadow-md p-2 flex flex-col items-center w-28 border border-purple-100"
                            >
                                <img
                                    src={item.card.imagePath}
                                    alt={item.card.name}
                                    className={`w-24 aspect-[3/4] object-contain mb-2 ${item.isReversed ? "rotate-180" : ""}`}
                                />
                                <span className="w-full text-center text-xs text-gray-500 mt-1">{item.card.name}<br />{item.isReversed ? "逆位置" : "正位置"}</span>
                            </div>
                        ))}
                    </div>

                    {!hasFortuned && !isLoading && (
                        <button
                            onClick={handleFortune}
                            className="w-full max-w-md bg-purple-400 hover:bg-purple-500 text-white font-semibold rounded-full px-8 py-3 shadow transition disabled:opacity-50"
                        >
                            ヒカリノに解釈してもらう
                        </button>
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
                <div className="rounded-2xl shadow-lg bg-white min-h-[200px] flex items-center justify-center border border-purple-100 p-8 transition-all duration-300 ease-in-out">
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
        </main>
    );
}