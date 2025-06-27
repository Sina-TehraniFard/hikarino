"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/hooks/useAuth";
import {useFortune} from "@/hooks/useFortune";
import {useCoinAnimation} from "@/hooks/useCoinAnimation";
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
import AppIntro from "@/components/ui/AppIntro";
import HikarinoProfile from "@/components/ui/HikarinoProfile";
import Sidebar from "@/components/ui/Sidebar";
import PageBackground from "@/components/ui/PageBackground";
import MessageDialog from "@/components/ui/MessageDialog";
import {useState} from "react";

export default function Home() {
    const {user, loading} = useAuth();
    const router = useRouter();
    const {coins, refreshCoins} = useCoinContext();
    const {displayCoins} = useCoinAnimation(coins, user?.uid);
    const [showLogin, setShowLogin] = useState(false);
    const [showCoinModal, setShowCoinModal] = useState(false);
    const [showMessageDialog, setShowMessageDialog] = useState(false);

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

    if (loading) {
        return (
            <main className="flex min-h-screen relative overflow-hidden">
                <div className="flex-1 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
                </div>
            </main>
        );
    }

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

    const handleDrawCardsClick = () => {
        if (!question.trim()) {
            setShowMessageDialog(true);
            return;
        }
        handleDrawCards();
    };

    return (
        <main className="flex min-h-screen relative overflow-hidden">
            {/* PC版サイドバー（768px以上で表示） */}
            <div className="hidden md:block">
                <Sidebar
                    user={user || {displayName: "ゲスト", email: "", uid: undefined}}
                    onLogout={handleLogout}
                    onRequireLogin={() => setShowLogin(true)}
                    displayCoins={displayCoins}
                    onCoinClick={() => setShowCoinModal(true)}
                />
            </div>

            <PageBackground />
            
            <div className="flex-1 md:ml-64">
                <div className="w-full max-w-lg mx-auto bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-purple-200/30 dark:border-purple-700/30 shadow-2xl min-h-screen relative">
                    <div className="px-6 space-y-6">
            {showLogin && <LoginModal onClose={() => setShowLogin(false)}/>}

            <Header
                user={user || {displayName: "ゲスト", email: "", uid: undefined}}
                coins={user ? coins : 0}
                onLogout={handleLogout}
                onRequireLogin={() => setShowLogin(true)}
                userId={user?.uid}
                onCoinClick={() => setShowCoinModal(true)}
            />

            {/* 案内人紹介 - 信頼構築 */}
            <HikarinoProfile />
            {/* 簡単3ステップ - 不安解消 */}
            <AppIntro />


            {/* 質問入力 - 実際のアクション */}
            <QuestionForm
                question={question}
                onChange={setQuestion}
                disabled={cards.length > 0}
            />

            {cards.length === 0 && (
                <Button 
                    onClick={handleDrawCardsClick} 
                    fullWidth
                >
                    タロットを引く
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

            <MessageDialog
                isOpen={showMessageDialog}
                onClose={() => setShowMessageDialog(false)}
                type="warning"
                message="質問を入力してからタロットを引いてください。"
            />
                    </div>
                </div>
            </div>
        </main>
    );
}