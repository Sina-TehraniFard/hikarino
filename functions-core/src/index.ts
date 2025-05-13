import { onCall, HttpsError, CallableRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";

admin.initializeApp();

/**
 * spendCoin（コインを使う関数）
 *
 * この関数は、ユーザーがコインを「まとめて」使いたいときに呼び出します。
 * たとえば100枚使いたい場合は、amount: 100 を渡します。
 * サーバー側でコインの数を確認し、まとめて減らします。
 *
 * もしログインしていない場合や、コインが足りない場合はエラーになります。
 *
 * 使い方（フロントエンド例）:
 * const spendCoin = httpsCallable(functions, 'spendCoin');
 * const result = await spendCoin({ amount: 100 });
 * console.log(result.data.newCoins); // 新しいコインの数
 *
 * セキュリティ:
 * - 必ずログインしている必要があります
 * - コインの数はサーバー側で管理されるので、不正な操作はできません
 */
export const spendCoin = onCall(async (request: CallableRequest<any>) => {
    const uid = request.auth?.uid;
    if (!uid) {
        throw new HttpsError("unauthenticated", "ログインが必要です");
    }

    // 使いたいコインの枚数（デフォルト1）
    const amount = typeof request.data?.amount === "number" && request.data.amount > 0 ? request.data.amount : 1;

    const userRef = admin.firestore().collection("users").doc(uid);
    const userDoc = await userRef.get();
    const currentCoins = userDoc.data()?.coins || 0;

    if (currentCoins < amount) {
        throw new HttpsError("failed-precondition", "コインが足りません");
    }

    await userRef.update({ coins: currentCoins - amount });
    return { newCoins: currentCoins - amount };
});