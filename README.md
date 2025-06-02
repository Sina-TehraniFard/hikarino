# Hikarino - AIタロット占いサービス

このプロジェクトは、Next.js をベースに開発された「AIタロット占いサービス」です。ユーザーが相談内容を入力し、大アルカナからランダムに3枚のカード（正逆含む）を引き、それに基づく占い結果（キャラクター語り）を表示するWebアプリケーションです。

## 🔧 技術スタック

- **Next.js**：フロントエンド（App Router構成）
- **Tailwind CSS**：スタイリング
- **Firebase（Cloud Functions + Firestore）**：バックエンド・データベース
- **Stripe**：決済処理（単発課金・将来的にサブスクリプション対応予定）
- **OpenAI API**：占い結果（キャラ語り）の生成

## 🚀 開発手順

### 開発サーバー起動

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開くとローカル環境で動作確認ができます。

### Firebase Functions のデプロイ

```bash
firebase deploy --only functions
```

### Stripe シークレットの設定（初回のみ）

```bash
firebase functions:config:set stripe.secret="sk_test_..." stripe.webhook_secret="whsec_..."
```

### Webhook テストイベントの送信（Stripe CLI）

```bash
stripe trigger checkout.session.completed
```

## 💡 機能概要

- ユーザー入力：100文字以内の相談内容
- カード抽選：大アルカナ22枚 × 正逆
- ポジション：あの時の選択 / その結果 / これから
- キャラ解釈：ヒカリノ（太陽・虹・日本神話がモチーフ）
- 課金：Stripe Checkoutで100円（成功時のみGPTを呼び出す）
- 将来機能：夢占い、サブスクリプション（月10回 or 無制限）

## 📝 メモ

- UIは Vercel にデプロイ予定（GitHub連携 CI/CD 済）
- GPTの応答は「ヒカリノ」としてキャラクター口調で詩的に話す
- 本番構成では Webhook → Function → Firestore → GPT呼び出しという構成により、再処理や二重課金を防止

## 📂 編集箇所メモ

- `app/page.tsx`: トップページUI
- `pages/api/createCheckoutSession.ts`: Stripe Checkout 作成API
- `functions/src/index.ts`: Webhookハンドラ（Cloud Functions）
- `firestore.rules`: Firestoreセキュリティルール（後日追加予定）

---

## 📅 補足（来年見ても思い出せるように）

このREADMEは、2025年に本プロジェクト「Hikarino」のPoCから本番リリースへ向けて書かれました。Next.jsのApp Router、Stripe、Cloud Functionsを統合した学習も兼ねています。

- 初期の課金導線（単発）に集中し、PoCを小さく早く形にする方針
- サーバ側でカード抽選処理を行い、チート耐性を確保
- 最も重要なのは「没入感」なので、AIとは明記せずキャラを立てる構成にしている
