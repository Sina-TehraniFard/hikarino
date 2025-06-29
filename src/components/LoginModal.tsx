'use client';
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import { registerUserIfNew } from '@/lib/firestore/user';
import Image from "next/image";

interface LoginModalProps {
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                registerUserIfNew(user);
                onClose();
            }
        });
        return () => unsubscribe();
    }, [onClose]);
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await registerUserIfNew(user);
            onClose();
        } catch (error) {
            console.error('ログイン失敗:', error);
        }
    };
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center transform transition-all duration-300 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 text-2xl transition-colors duration-200">×</button>
                <Image
                    src="/hikarino-logo.png"
                    alt="ヒカリノ"
                    width={80}
                    height={80}
                    className="h-20 mb-4 object-cover object-top"
                    style={{ objectPosition: 'center 10%' }}
                    priority
                />
                <h1 className="text-3xl md:text-4xl font-semibold text-purple-600 dark:text-purple-400 mb-2">ようこそ</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-6 text-center text-base md:text-lg leading-relaxed">Googleアカウントでログインして、あなたの心にそっと寄り添うタロット占いを体験しましょう。</p>
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-md active:scale-95"
                >
                    <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.1 3 7.6 8.7 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c6.1 0 10.7-2 14-5.4l-6.5-5.3C29.7 35.1 27 36 24 36c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C7.6 39.3 15.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/></g></svg>
                    Googleでログイン
                </button>
            </div>
        </div>
    );
};

export default LoginModal; 