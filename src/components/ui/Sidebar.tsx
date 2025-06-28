// PC版左サイドバーコンポーネント
// モバイルのHamburgerMenuと完全一致した機能を提供

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeIcon from "../icons/HomeIcon";
import { User } from "@/types";

interface SidebarProps {
  user: User;
  onLogout: () => void;
  onRequireLogin?: () => void;
  displayCoins: number;
  onCoinClick?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  user, 
  onLogout, 
  onRequireLogin,
  displayCoins,
  onCoinClick
}) => {
  const router = useRouter();

  const handleHistoryClick = () => {
    if (!user?.uid && onRequireLogin) {
      onRequireLogin();
    } else {
      router.push("/history");
    }
  };

  const handleLoginClick = () => {
    if (onRequireLogin) onRequireLogin();
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 z-30">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-semibold text-purple-600 dark:text-purple-400 mb-4">メニュー</h3>
        
        {/* User Info */}
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{user?.displayName || "ゲスト"}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || "ログインしていません"}</p>
            </div>
          </div>
          {/* コイン表示 */}
          <button 
            onClick={onCoinClick}
            className="flex items-center gap-2 bg-white dark:bg-gray-700 px-3 py-2 rounded-lg shadow-sm border border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow duration-200 cursor-pointer w-full"
          >
            <div className="w-5 h-5 relative">
              <svg className="w-full h-full text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <text x="12" y="16" textAnchor="middle" className="text-xs font-bold fill-yellow-800">¥</text>
              </svg>
            </div>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-sm">
              {typeof displayCoins === 'number' ? displayCoins.toLocaleString() : 0}
            </span>
          </button>
        </div>
      </div>
      
      {/* Menu Items */}
      <nav className="p-6 space-y-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/20 rounded-lg transition-all duration-200 group"
        >
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-950/40 transition-colors duration-200">
            <HomeIcon />
          </div>
          <div>
            <p className="font-medium">ホーム</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">占いを始める</p>
          </div>
        </Link>
        
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-purple-950/20 rounded-lg transition-all duration-200 group"
          onClick={handleHistoryClick}
        >
          <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-950/30 flex items-center justify-center group-hover:bg-purple-200 dark:group-hover:bg-purple-950/40 transition-colors duration-200">
            <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="text-left">
            <p className="font-medium">占い履歴</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">過去の占い結果</p>
          </div>
        </button>
        
        <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
          {user?.uid ? (
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-all duration-200 group"
            >
              <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-950/30 transition-colors duration-200">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-rose-600 dark:group-hover:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">ログアウト</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">アカウントから離れる</p>
              </div>
            </button>
          ) : (
            <button
              onClick={handleLoginClick}
              className="w-full flex items-center gap-3 px-4 py-3 text-white bg-purple-600 hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-700 rounded-lg transition-all duration-200 group hover:shadow-lg active:scale-95"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-700/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </div>
              <div className="text-left">
                <p className="font-medium">ログイン</p>
                <p className="text-xs text-purple-200">アカウントを作成</p>
              </div>
            </button>
          )}
        </div>
      </nav>
      
      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          ヒカリノ タロット占い
        </p>
      </div>
    </div>
  );
};

export default Sidebar;