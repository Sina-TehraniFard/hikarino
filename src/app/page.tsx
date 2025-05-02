"use client";

import { useState } from "react";
import { drawThreeCards, DrawnCard } from "@/lib/tarot";

export default function Home() {
    const [question, setQuestion] = useState("");
    const [cards, setCards] = useState<DrawnCard[]>([]);
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDraw = () => {
        setResult("");
        setCards(drawThreeCards());
    };

    const handleFortune = async () => {
        setLoading(true);
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
        const data = await res.json();
        setResult(data.result);
        setLoading(false);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-8">
            <h1 className="text-3xl font-bold mb-6">ヒカリノ AIタロット</h1>

            <textarea
                className="border p-4 w-full max-w-md mb-4"
                placeholder="100文字以内で占いたいことを書いてください"
                maxLength={100}
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
            />

            <button
                onClick={handleDraw}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition"
            >
                カードを引く
            </button>

            {cards.length > 0 && (
                <>
                    <div className="mt-8 grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {cards.map((item, idx) => (
                            <div
                                key={idx}
                                className="border rounded p-0 shadow text-center"
                            >
                                <img
                                    src={item.card.imagePath}
                                    alt={item.card.name}
                                    className={`w-28 aspect-[3/4] mx-auto mt-1 object-contain ${item.isReversed ? "rotate-180" : ""}`}
                                />
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={handleFortune}
                        className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
                    >
                        {loading ? "占い中..." : "ヒカリノに解釈してもらう"}
                    </button>
                </>
            )}

            {result && (
                <div className="mt-8 max-w-2xl whitespace-pre-wrap p-6 bg-white text-black shadow rounded">
                    {result}
                </div>
            )}
        </main>
    );
}