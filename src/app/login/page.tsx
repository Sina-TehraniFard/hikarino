'use client';

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { registerUserIfNew } from '@/lib/firestore/user';

export default function LoginPage() {
    const router = useRouter();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const currentPath = window.location.pathname;
                if (currentPath !== '/' && currentPath !== '/login') {
                    router.push('/');
                }
            }
        });
        return () => unsubscribe();
    }, []);
    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await registerUserIfNew(user);
            console.log('ログイン成功:', user);
            router.push('/');
            // 必要ならここで Firestore にユーザデータ登録も可
        } catch (error) {
            console.error('ログイン失敗:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-white to-yellow-100">
            <div className="bg-white/90 rounded-3xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center border border-purple-100">
                <img
                    src="/hikarino-normal.png"
                    alt="ヒカリノ"
                    className="w-20 h-20 rounded-full shadow-lg mb-4 object-cover object-top border-4 border-purple-200"
                    style={{ objectPosition: 'center 10%' }}
                />
                <h1 className="text-3xl font-extrabold text-purple-600 mb-2 tracking-wide drop-shadow">ヒカリノへようこそ</h1>
                <p className="text-gray-600 mb-6 text-center text-base">Googleアカウントでログインして、あなたの心にそっと寄り添うタロット占いを体験しましょう。</p>
                <button
                    onClick={handleLogin}
                    className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-purple-400 hover:from-yellow-300 hover:to-purple-500 text-white font-bold px-8 py-3 rounded-full shadow-lg transition-all duration-200 text-lg focus:outline-none focus:ring-2 focus:ring-purple-300"
                >
                    <svg className="w-6 h-6" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 30.1 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/><path fill="#34A853" d="M6.3 14.7l7 5.1C15.1 17.1 19.2 14 24 14c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 15.1 3 7.6 8.7 6.3 14.7z"/><path fill="#FBBC05" d="M24 44c6.1 0 10.7-2 14-5.4l-6.5-5.3C29.7 35.1 27 36 24 36c-6.1 0-11.3-4.1-13.2-9.6l-7 5.4C7.6 39.3 15.1 44 24 44z"/><path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.7 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.6 0 5 .8 7 2.3l6.4-6.4C33.5 5.1 28.9 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z"/></g></svg>
                    Googleでログイン
                </button>
            </div>
        </div>
    );
}