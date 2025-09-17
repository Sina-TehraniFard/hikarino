// src/lib/firebase.ts
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
    if (_app) return _app;

    if (typeof window === 'undefined') {
        throw new Error('Firebase should only be initialized in the browser');
    }

    // 環境変数の存在チェック
    const requiredEnvVars = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    };

    const missingVars = Object.entries(requiredEnvVars)
        .filter(([, value]) => !value)
        .map(([key]) => key);

    if (missingVars.length > 0) {
        throw new Error(`Missing Firebase environment variables: ${missingVars.join(', ')}`);
    }

    const firebaseConfig = requiredEnvVars as Required<typeof requiredEnvVars>;

    _app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    return _app;
}

export function getFirebaseAuth(): Auth {
    if (_auth) return _auth;
    _auth = getAuth(getFirebaseApp());
    return _auth;
}

export function getFirebaseDb(): Firestore {
    if (_db) return _db;
    _db = getFirestore(getFirebaseApp());
    return _db;
}

// Export functions for lazy initialization
export { getFirebaseAuth as auth, getFirebaseDb as db };