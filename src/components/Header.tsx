import React, { useState, useRef, useEffect } from "react";

interface HeaderProps {
    user: { displayName?: string | null; email?: string | null };
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

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

    return (
        <header className="w-full py-3 border-b border-gray-200 mb-3 flex items-center justify-between">
            <h1 className="text-center text-3xl sm:text-4xl font-bold text-gray-800 tracking-wide flex-1">ヒカリノ タロット</h1>
            <div className="flex items-center gap-4 ml-4 relative">
                <span className="text-gray-700 font-medium text-base">
                    {(user.displayName || user.email) + ' さん'}
                </span>
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
                        <button
                            onClick={onLogout}
                            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-xl transition"
                        >
                            ログアウト
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header; 