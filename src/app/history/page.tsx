"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Sidebar from "@/components/ui/Sidebar";
import PageBackground from "@/components/ui/PageBackground";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { getUserFortunes } from "@/lib/firestore/fortune";
import { format } from "date-fns";
import { ja } from "date-fns/locale";
import { useCoinContext } from "@/contexts/CoinContext";
import { useCoinAnimation } from "@/hooks/useCoinAnimation";
import { User, FortuneHistory } from "@/types";
import LoginModal from "@/components/LoginModal";
import CoinPurchaseModal from "@/components/CoinPurchaseModal";
import MiniTarotCard from "@/components/ui/MiniTarotCard";
import { analyzeFortuneHistory } from "@/lib/fortuneAnalytics";


export default function HistoryPage() {
    const [user, setUser] = useState<User | null>(null);
    const [fortunes, setFortunes] = useState<FortuneHistory[]>([]);
    const [expandedId, setExpandedId] = useState<string | null>(null);
    const [showLogin, setShowLogin] = useState(false);
    const [showCoinModal, setShowCoinModal] = useState(false);
    const router = useRouter();
    const { coins, refreshCoins } = useCoinContext();
    const { displayCoins } = useCoinAnimation(coins, user?.uid);

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
                router.push("/");
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

    const formatDate = (timestamp?: { seconds: number; nanoseconds: number }) => {
        if (!timestamp) return '日時不明';
        return format(new Date(timestamp.seconds * 1000), 'yyyy年MM月dd日 HH:mm', { locale: ja });
    };

    const handleCoinModalClose = async () => {
        await refreshCoins(true);
        setShowCoinModal(false);
    };

    return (
        <main className="flex min-h-screen relative overflow-hidden">
            {/* PC版サイドバー（768px以上で表示） */}
            {user && (
                <div className="hidden md:block">
                    <Sidebar
                        user={user}
                        onLogout={handleLogout}
                        onRequireLogin={() => setShowLogin(true)}
                        displayCoins={displayCoins}
                        onCoinClick={() => setShowCoinModal(true)}
                    />
                </div>
            )}

            <PageBackground />
            
            <div className={`flex-1 ${user ? 'md:ml-64' : ''}`}>
                <div className="w-full max-w-4xl mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-purple-200/30 dark:border-purple-700/30 shadow-2xl min-h-screen relative">
                    <div className="px-6 space-y-6 pb-12">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}

            {user && (
                <Header
                    user={user}
                    coins={coins}
                    onLogout={handleLogout}
                    onRequireLogin={() => setShowLogin(true)}
                    userId={user.uid}
                    onCoinClick={() => setShowCoinModal(true)}
                />
            )}

                <div className="w-full max-w-3xl mx-auto">
                    {/* 統計情報セクション */}
                    {fortunes.length > 0 && (
                        <div className="mb-8 animate-fadeIn">
                            {(() => {
                                const stats = analyzeFortuneHistory(fortunes);
                                return (
                                    <>
                                        {/* メインビジュアル */}
                                        <div className="relative h-32 mb-6 rounded-2xl overflow-hidden">
                                            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 opacity-80" />
                                            <div className="absolute inset-0 bg-black/30" />
                                            <div className="relative z-10 h-full flex items-center justify-center">
                                                <div className="text-center text-white">
                                                    <div className="text-4xl mb-1">
                                                        ⭐
                                                    </div>
                                                    <p className="text-sm opacity-90">
                                                        {stats.specialInsight}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* 統計カード */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 dark:from-purple-500/20 dark:to-pink-500/20 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">総占い回数</p>
                                                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalReadings}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">回の導き</p>
                                            </div>
                                            
                                            {stats.mostFrequentCard && (
                                                <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 dark:from-blue-500/20 dark:to-cyan-500/20 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">守護カード</p>
                                                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">{stats.mostFrequentCard.name}</p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.mostFrequentCard.count}回出現</p>
                                                </div>
                                            )}
                                            
                                            <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/10 dark:from-amber-500/20 dark:to-orange-500/20 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">占い頻度</p>
                                                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">{stats.readingFrequency.average}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">のペース</p>
                                            </div>
                                            
                                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/20 dark:to-emerald-500/20 rounded-xl p-4 text-center transform hover:scale-105 transition-transform duration-200">
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">支配元素</p>
                                                <p className="text-lg font-bold text-green-600 dark:text-green-400">{stats.dominantElement.element}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stats.dominantElement.percentage}%</p>
                                            </div>
                                        </div>

                                        {/* 洞察メッセージ */}
                                        <div className="text-center mb-8">
                                            <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                                                {stats.dominantElement.meaning}
                                            </p>
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    )}

                    {/* タイムラインヘッダー */}
                    <div className="mb-6">
                        <h2 className="text-lg font-light text-gray-700 dark:text-gray-300 tracking-wider">
                            {fortunes.length === 0 ? "まだ物語は始まっていません..." : "あなたが紡いだ物語"}
                        </h2>
                    </div>

                    {/* タイムライン表示 */}
                    <div className="relative">
                        {/* 縦のタイムライン - PC版 */}
                        {fortunes.length > 0 && (
                            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-purple-200 to-transparent dark:from-purple-700 dark:via-purple-800 dark:to-transparent" />
                        )}
                        
                        {/* 縦のタイムライン - モバイル版（左端） */}
                        {fortunes.length > 0 && (
                            <div className="md:hidden absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 via-purple-200 to-transparent dark:from-purple-700 dark:via-purple-800 dark:to-transparent" />
                        )}
                        
                        <div className="space-y-8">
                        {fortunes.map((fortune, index) => (
                            <div
                                key={fortune.id}
                                className="relative animate-fadeIn"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* タイムラインノード - PC版 */}
                                <div className="hidden md:block absolute left-8 -translate-x-1/2">
                                    <div className="relative">
                                        <div className="w-4 h-4 bg-purple-500 dark:bg-purple-400 rounded-full shadow-lg" />
                                        <div className="absolute inset-0 bg-purple-500 dark:bg-purple-400 rounded-full animate-ping opacity-30" />
                                    </div>
                                </div>
                                
                                {/* タイムラインノード - モバイル版（左端、小さめ） */}
                                <div className="md:hidden absolute left-4 -translate-x-1/2 top-4">
                                    <div className="relative">
                                        <div className="w-3 h-3 bg-purple-500 dark:bg-purple-400 rounded-full shadow-md" />
                                        <div className="absolute inset-0 bg-purple-500 dark:bg-purple-400 rounded-full animate-ping opacity-30" />
                                    </div>
                                </div>
                                
                                {/* カード本体 - レスポンシブマージン */}
                                <div className="ml-8 md:ml-16 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200">
                                    <button
                                        className="w-full p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                                        onClick={() => setExpandedId(expandedId === fortune.id ? null : fortune.id)}
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatDate(fortune.timestamp)}
                                                    </span>
                                                </div>
                                                <blockquote className="text-lg font-medium text-gray-800 dark:text-gray-200 italic">
                                                    「{fortune.question}」
                                                </blockquote>
                                                
                                                {/* ミニカードプレビュー */}
                                                <div className="flex gap-2 mt-3 md:justify-center">
                                                    {fortune.cards.map((card, cardIndex) => (
                                                        <MiniTarotCard
                                                            key={cardIndex}
                                                            card={{ name: card.cardName, number: cardIndex + 1 }}
                                                            isReversed={card.isReversed}
                                                            delay={cardIndex * 50}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                            <svg
                                                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transform transition-transform duration-200 ${
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
                                        </div>
                                    </button>
                                    <div
                                        className={`grid transition-all duration-200 ease-in-out ${
                                            expandedId === fortune.id
                                                ? "grid-rows-[1fr] opacity-100"
                                                : "grid-rows-[0fr] opacity-0"
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
                                                {/* 占い結果 */}
                                                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-xl p-6">
                                                    <h3 className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-3 flex items-center gap-2">
                                                        <span>⭐</span>
                                                        ヒカリノからのメッセージ
                                                    </h3>
                                                    <div className="prose prose-sm dark:prose-invert max-w-none">
                                                        <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-200 leading-relaxed">
                                                            {fortune.result}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    
                    {/* 空状態 */}
                    {fortunes.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-6xl mb-4 opacity-20">⭐</div>
                            <p className="text-gray-500 dark:text-gray-400">
                                まだ占いの記録がありません
                            </p>
                            <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                最初の一歩を踏み出してみましょう
                            </p>
                        </div>
                    )}
                </div>

                <CoinPurchaseModal
                    isOpen={showCoinModal}
                    onClose={handleCoinModalClose}
                    uid={user?.uid}
                />
                    </div>
                </div>
            </div>
        </main>
    );
}