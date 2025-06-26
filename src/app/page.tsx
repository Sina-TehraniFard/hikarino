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
        refreshCoins();
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
        <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24">
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
            />

            {cards.length === 0 && (
                <Button onClick={handleDrawCards} fullWidth>
                    カードを引く
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
                        ヒカリノに解釈してもらう
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
        </main>
    );
}