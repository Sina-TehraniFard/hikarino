"use client";

import React, { useEffect } from "react";
import { useCoinAnimation } from "@/hooks/useCoinAnimation";
import { useCoinContext } from "@/contexts/CoinContext";
import HamburgerMenu from "@/components/ui/HamburgerMenu";
import UserInfo from "@/components/ui/UserInfo";
import { User } from "@/types";

interface HeaderProps {
    user: User;
    onLogout: () => void;
    coins: number;
    onRequireLogin?: () => void;
    userId?: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, coins, onRequireLogin, userId }) => {
    const { displayCoins, startAnimation } = useCoinAnimation(coins, userId);
    const { onCoinPurchase } = useCoinContext();
    
    useEffect(() => {
        onCoinPurchase(startAnimation);
    }, [onCoinPurchase, startAnimation]);


    return (
        <>
            <header className="w-full bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="max-w-lg mx-auto px-6">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">
                                ヒカリノ
                            </h1>
                        </div>
                        <div>
                            <HamburgerMenu 
                                user={user} 
                                onLogout={onLogout} 
                                onRequireLogin={onRequireLogin} 
                            />
                        </div>
                    </div>
                </div>
            <UserInfo user={user} displayCoins={displayCoins} />
            </header>
        </>
    );
};

export default Header; 