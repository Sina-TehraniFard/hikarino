"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import {useFortune} from "@/hooks/useFortune";
import {signOut} from "firebase/auth";
import {auth} from "@/lib/firebase";
import Header from "@/components/Header";
import {useCoinContext} from "@/contexts/CoinContext";
import LoginModal from "@/components/LoginModal";
import CoinPurchaseModal from "@/components/CoinPurchaseModal";
import Button from "@/components/ui/Button";
import TarotCards from "@/components/ui/TarotCards";
import QuestionForm from "@/components/ui/QuestionForm";
import FortuneResult from "@/components/ui/FortuneResult";
import ErrorMessage from "@/components/ui/ErrorMessage";
import HikarinoProfile from "@/components/ui/HikarinoProfile";
import AppIntro from "@/components/ui/AppIntro";
import {useState} from "react";

export default function Home() {
    const {user, loading} = useAuth();
    const router = useRouter();
    const {coins, refreshCoins} = useCoinContext();
    const [showLogin, setShowLogin] = useState(false);
    const [showCoinModal, setShowCoinModal] = useState(false);

    const {
        question,
        cards,
        result,
        isLoading,
        hasFortuned,
        error,
        setQuestion,
        handleDrawCards,
        handleFortune,
        restoreGuestData,
    } = useFortune();

    useEffect(() => {
        restoreGuestData(user);
        refreshCoins(true);
    }, [user, refreshCoins, restoreGuestData]);

    if (loading) return null;

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    const handleFortuneClick = () => {
        handleFortune(
            user,
            () => setShowLogin(true),
            () => setShowCoinModal(true)
        );
    };

    const handleCoinModalClose = async () => {
        await refreshCoins(true); // アニメーションありでリフレッシュ
        setShowCoinModal(false);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between relative overflow-hidden">
            {/* 幻想的な背景 */}
            <div className="fixed inset-0 -z-20">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 dark:from-purple-950 dark:via-gray-900 dark:to-pink-950" />
                <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" />
            </div>
            
            <div className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-purple-200/30 dark:border-purple-700/30 shadow-2xl min-h-screen relative">
                <div className="px-6 space-y-6">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}

            <Header
                user={user || {displayName: "ゲスト", email: "", uid: undefined}}
                coins={user ? coins : 0}
                onLogout={handleLogout}
                onRequireLogin={() => setShowLogin(true)}
                userId={user?.uid}
            />

            <HikarinoProfile/>

            <QuestionForm
                question={question}
                onChange={setQuestion}
                disabled={cards.length > 0}
            />

            <AppIntro/>

            {cards.length === 0 && (
                <Button onClick={handleDrawCards} fullWidth>
                    占いを開始
                </Button>
            )}

            <TarotCards cards={cards}/>

            {cards.length > 0 && !hasFortuned && !isLoading && (
                <>
                    <Button
                        onClick={handleFortuneClick}
                        disabled={isLoading}
                        fullWidth
                    >
                        占い結果を見る
                    </Button>
                    <ErrorMessage error={error}/>
                </>
            )}

            <div className="mt-10 w-full max-w-md">
                {hasFortuned && (
                    <div className="mb-6 text-center transition-all duration-300 ease-in-out">
                        <Button onClick={() => window.location.reload()} fullWidth>
                            もう一度占う
                        </Button>
                    </div>
                )}

                <FortuneResult result={result}/>

                {hasFortuned && (
                    <div className="mt-6 text-center transition-all duration-300 ease-in-out">
                        <Button onClick={() => window.location.reload()} fullWidth>
                            もう一度占う
                        </Button>
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
        </main>
    );
}