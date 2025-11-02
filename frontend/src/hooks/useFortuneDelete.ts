import { useState } from "react";
import { deleteFortune, deleteAllFortunes } from "@/lib/firestore/fortune";

export function useFortuneDelete() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeleteFortune = async (
    uid: string,
    fortuneId: string
  ): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteFortune(uid, fortuneId);
      return true;
    } catch (err) {
      console.error("占い履歴削除エラー:", err);
      setError("削除に失敗しました。もう一度お試しください。");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteAllFortunes = async (uid: string): Promise<boolean> => {
    setIsDeleting(true);
    setError(null);
    try {
      await deleteAllFortunes(uid);
      return true;
    } catch (err) {
      console.error("全履歴削除エラー:", err);
      setError("削除に失敗しました。もう一度お試しください。");
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isDeleting,
    error,
    handleDeleteFortune,
    handleDeleteAllFortunes,
  };
}
