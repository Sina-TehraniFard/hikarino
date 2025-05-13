"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import HomeIcon from "./icons/HomeIcon";
import { useRouter } from "next/navigation";

interface HeaderProps {
    user: { uid?: string; displayName?: string | null; email?: string | null };
    onLogout: () => void;
    coins: number;
    onRequireLogin?: () => void;
    userId?: string | undefined;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, coins, onRequireLogin, userId }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    // useCoinContextのcoinsは使わず、props.coinsを使う
    const [displayCoins, setDisplayCoins] = useState(coins);
    const animatingRef = useRef<NodeJS.Timeout | null>(null);
    const router = useRouter();
    const prevUserId = useRef<string | undefined>(userId);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    useEffect(() => {
        // コイン残高のアニメーションについて
        // - 普段はコインが減るとき（例：占いで消費したとき）だけ、数字がアニメーションで減ります。
        // - でも、ログアウトやユーザー切り替えのときはアニメーションを使わず、すぐに「0コイン」や新しい値に切り替わります。
        //   → ログアウトは「ユーザーが切り替わる」特別なタイミングなので、前の人のコイン残高を見せる必要がないためです。
        // - 新しくログインした人のコイン残高は、その人の値がすぐに表示されます。
        if (prevUserId.current !== userId) {
            setDisplayCoins(coins);
            prevUserId.current = userId;
            return;
        }
        if (displayCoins > coins) {
            if (animatingRef.current) clearInterval(animatingRef.current);
            const diff = displayCoins - coins;
            const interval = 3000 / diff; // 3秒で完了するよう間隔を計算
            animatingRef.current = setInterval(() => {
                setDisplayCoins((prev) => {
                    if (prev <= coins + 1) {
                        clearInterval(animatingRef.current!);
                        return coins;
                    }
                    return prev - 1;
                });
            }, interval);
        } else {
            setDisplayCoins(coins);
        }
        return () => {
            if (animatingRef.current) clearInterval(animatingRef.current);
        };
    }, [coins, userId]);

    return (
        <>
            <header className="w-full border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <img
                        src="/hikarino-logo.png"
                        alt="Hikarino"
                        className="h-20 w-auto object-contain"
                    />
                </div>
                <div className="flex items-center gap-4 ml-4 relative">
                    {/* Hamburger menu button */}
                    <button
                        className="flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-gray-100 transition relative z-20"
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="メニューを開く"
                    >
                        <span className="block w-6 h-0.5 bg-gray-700 mb-1 rounded transition-all" />
                        <span className="block w-6 h-0.5 bg-gray-700 mb-1 rounded transition-all" />
                        <span className="block w-6 h-0.5 bg-gray-700 rounded transition-all" />
                    </button>
                    {/* Dropdown menu */}
                    {menuOpen && (
                        <div
                            ref={menuRef}
                            className="absolute right-0 top-12 bg-white border border-gray-200 rounded-xl shadow-lg py-2 w-40 z-30 animate-fade-in"
                        >
                            <Link
                                href="/"
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition flex items-center gap-2"
                            >
                                <HomeIcon />
                                ホーム
                            </Link>
                            <button
                                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                                onClick={() => {
                                    if (!user?.uid && onRequireLogin) {
                                        onRequireLogin();
                                    } else {
                                        router.push("/history");
                                    }
                                    setMenuOpen(false);
                                }}
                            >
                                あなたの記録
                            </button>
                            {user?.uid ? (
                                <button
                                    onClick={onLogout}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                                >
                                    ログアウト
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        if (onRequireLogin) onRequireLogin();
                                        setMenuOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                                >
                                    ログイン
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </header>
            <div className="w-full flex justify-end items-center text-gray-700 font-medium text-base p-2 gap-4">
                <span>{(user.displayName || user.email) + ' さん'}</span>
                {/*
                  【重要】コイン残高はサービス全体でAI解釈ごとに100コイン消費など、今後も多用途で利用される予定です。
                  coinsがnullの場合は0として常に表示し、ユーザーに一貫した体験を提供します。
                  今後コインの取得・消費ロジックを拡張する際も、この表示仕様を守ってください。
                  コイン残高はCoinContextでグローバル管理されています。
                */}
                <span>🪙 {typeof displayCoins === 'number' ? displayCoins : 0} コイン</span>
            </div>
        </>
    );
};

export default Header; 