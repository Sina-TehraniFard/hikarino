"use client";

import React from "react";
import Image from "next/image";
import { useCoinAnimation } from "@/hooks/useCoinAnimation";
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
    const displayCoins = useCoinAnimation(coins, userId);


    return (
        <>
            <header className="w-full border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Image
                        src="/hikarino-logo.png"
                        alt="Hikarino"
                        width={80}
                        height={80}
                        className="h-20 w-auto object-contain"
                        priority
                    />
                </div>
                <div className="flex items-center gap-4 ml-4">
                    <HamburgerMenu 
                        user={user} 
                        onLogout={onLogout} 
                        onRequireLogin={onRequireLogin} 
                    />
                </div>
            </header>
            <UserInfo user={user} displayCoins={displayCoins} />
        </>
    );
};

export default Header; 