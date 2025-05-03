import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { User } from 'firebase/auth';

export async function registerUserIfNew(user: User) {
    const ref = doc(db, 'users', user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
        await setDoc(ref, {
            name: user.displayName ?? '',
            email: user.email ?? '',
            createdAt: new Date().toISOString(),
        });
    }
}