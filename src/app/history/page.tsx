"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserFortunes } from "@/lib/firestore/fortune";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useCoinContext } from "@/contexts/CoinContext";

interface Fortune {
    id: string;
    timestamp: {
        seconds: number;
        nanoseconds: number;
    };
    question: string;
    cards: {
        cardName: string;
        isReversed: boolean;
        position: string;
    }[];
    result: string;
}

export default function HistoryPage() {
    const [user, setUser] = useState<{ uid?: string; displayName: string | null; email: string | null }>({ uid: undefined, displayName: null, email: null });
    const [fortunes, setFortunes] = useState<Fortune[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const router = useRouter();
    const { coins } = useCoinContext();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email
                });
                getUserFortunes(user.uid).then(setFortunes);
            } else {
                router.push("/login");
            }
        });

        return () => unsubscribe();
    }, [router]);

    const handleLogout = async () => {
        try {
            const auth = getAuth();
            await signOut(auth);
            router.push("/");
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    };

    const formatDate = (timestamp: { seconds: number; nanoseconds: number }) => {
        return format(new Date(timestamp.seconds * 1000), 'yyyy年MM月dd日 HH:mm', { locale: ja });
    };

    return (
        <>
            <Header user={user} onLogout={handleLogout} coins={user?.uid ? coins : 0} userId={user?.uid} />
            <main className="flex flex-col items-center p-6">
                <div className="w-full max-w-2xl">
                    <h1 className="text-2xl font-bold text-gray-800 mb-6">占い履歴</h1>
                    <div className="space-y-4">
                        {fortunes.map((fortune) => (
                            <div
                                key={fortune.id}
                                className="border border-gray-200 rounded-xl overflow-hidden"
                            >
                                <button
                                    className="w-full p-4 text-left hover:bg-gray-50 transition flex justify-between items-center"
                                    onClick={() => setExpandedId(expandedId === fortune.id ? null : fortune.id)}
                                >
                                    <div className="flex-1">
                                        <div className="text-sm text-gray-500 mb-1">
                                            {formatDate(fortune.timestamp)}
                                        </div>
                                        <div className="font-medium text-gray-800">
                                            {fortune.question}
                                        </div>
                                    </div>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                                            expandedId === fortune.id ? "rotate-180" : ""
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>
                                <div
                                    className={`grid transition-all duration-300 ease-in-out ${
                                        expandedId === fortune.id
                                            ? "grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="p-4 border-t border-gray-200">
                                            <div className="mb-4">
                                                <h3 className="text-sm font-medium text-gray-700 mb-2">引いたカード</h3>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {fortune.cards.map((card, index) => (
                                                        <div
                                                            key={index}
                                                            className="p-2 rounded-lg border border-gray-200 text-center"
                                                        >
                                                            <div className="text-sm font-medium text-gray-800">
                                                                {card.cardName}
                                                            </div>
                                                            <div className="text-xs text-gray-500">
                                                                {card.isReversed ? "逆位置" : "正位置"}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-medium text-gray-700 mb-2">占い結果</h3>
                                                <div className="p-4 rounded-lg border border-gray-200 whitespace-pre-wrap text-gray-700">
                                                    {fortune.result}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}