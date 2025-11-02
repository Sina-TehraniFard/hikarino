import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
  orderBy,
  doc,
  deleteDoc,
  writeBatch,
} from "firebase/firestore";
import { Fortune, FortuneHistory } from "@/types";

export async function saveFortune(fortune: Fortune) {
  const userFortuneRef = collection(db(), "users", fortune.uid, "fortunes");
  await addDoc(userFortuneRef, {
    question: fortune.question,
    cards: fortune.cards,
    result: fortune.result,
    timestamp: serverTimestamp(),
  });
}

export async function getUserFortunes(uid: string): Promise<FortuneHistory[]> {
  const userFortuneRef = collection(db(), "users", uid, "fortunes");
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
      uid,
      question: data.question,
      cards: data.cards,
      result: data.result,
      timestamp,
    } as FortuneHistory;
  });
}

export async function deleteFortune(uid: string, fortuneId: string) {
  const fortuneRef = doc(db(), "users", uid, "fortunes", fortuneId);
  await deleteDoc(fortuneRef);
}

export async function deleteAllFortunes(uid: string) {
  const userFortuneRef = collection(db(), "users", uid, "fortunes");
  const snapshot = await getDocs(userFortuneRef);

  const batch = writeBatch(db());
  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}
