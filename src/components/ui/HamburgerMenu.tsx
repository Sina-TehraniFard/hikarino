// ハンバーガーメニューコンポーネント

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import HomeIcon from "../icons/HomeIcon";
import { User } from "@/types";

interface HamburgerMenuProps {
  user: User;
  onLogout: () => void;
  onRequireLogin?: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ 
  user, 
  onLogout, 
  onRequireLogin 
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  const handleHistoryClick = () => {
    if (!user?.uid && onRequireLogin) {
      onRequireLogin();
    } else {
      router.push("/history");
    }
    setMenuOpen(false);
  };

  const handleLoginClick = () => {
    if (onRequireLogin) onRequireLogin();
    setMenuOpen(false);
  };

  return (
    <div className="relative">
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
            onClick={handleHistoryClick}
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
              onClick={handleLoginClick}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
            >
              ログイン
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;