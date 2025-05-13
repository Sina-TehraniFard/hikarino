import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, orderBy } from "firebase/firestore";

export async function saveFortune({
                                      uid,
                                      question,
                                      cards,
                                      result,
                                  }: {
    uid: string;
    question: string;
    cards: { cardName: string; isReversed: boolean; position: string }[];
    result: string;
}) {
    const userFortuneRef = collection(db, "users", uid, "fortunes");
    await addDoc(userFortuneRef, {
        question,
        cards,
        result,
        timestamp: serverTimestamp(),
    });
}

export async function getUserFortunes(uid: string) {
    const userFortuneRef = collection(db, "users", uid, "fortunes");
    const q = query(userFortuneRef, orderBy("timestamp", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => {
        const data = doc.data();
        // Firestore Timestamp型を変換
        let timestamp = data.timestamp;
        if (timestamp && typeof timestamp.toDate === "function") {
            timestamp = {
                seconds: timestamp.seconds,
                nanoseconds: timestamp.nanoseconds,
            };
        }
        return {
            id: doc.id,
            question: data.question,
            cards: data.cards,
            result: data.result,
            timestamp,
        };
    });
}