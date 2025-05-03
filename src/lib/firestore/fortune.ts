import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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