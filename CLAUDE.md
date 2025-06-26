# CLAUDE.md

このファイルは、このリポジトリでコードを扱う際にClaude Code (claude.ai/code) に対するガイダンスを提供します。

# 追加指示
- gitワークフロー @docs/git-instructions.md
- スタイリングガイド @STYLING_GUIDE.md

## プロジェクト概要

ヒカリノは、Next.js 15で構築されたAI搭載の日本語タロット占いサービスです。コイン制の課金システムと、キャラクター主導のAI解釈が特徴です。バックエンドサービスにFirebase、決済にStripe、「ヒカリノ」キャラクターペルソナを通じたパーソナライズされたタロット読みの生成にOpenAI APIを使用しています。

## 開発コマンド

### 基本コマンド
- `npm run dev` - Turbopackを使用した開発サーバーの起動
- `npm run build` - 本番環境用ビルド
- `npm run lint` - ESLintバリデーションの実行
- `npm run start` - 本番サーバーの起動

### テスト
現在テストフレームワークは設定されていません。テストを追加する際は、ユーザーに希望するテストアプローチを確認してください。

## アーキテクチャと重要な概念

### 技術スタック
- **Next.js 15** (App Routerアーキテクチャ)
- **React 19** with TypeScript 5
- **Tailwind CSS 4** (新しいインラインテーマ構文を使用)
- **Firebase** (Auth, Firestore, Cloud Functions)
- **Stripe** (決済処理)
- **OpenAI API** (AI搭載の解釈生成)

### コアビジネスロジック
- **タロットシステム**: 大アルカナ22枚のカード（正位置・逆位置）
- **コインシステム**: 1回の占いに100コイン必要
- **キャラクター設計**: 「ヒカリノ」が温かい姉のような導きを提供
- **セキュリティ**: Cloud Functionsによるサーバーサイドのカード引きとコイン検証

### 主要ディレクトリ
- `src/app/` - Next.js App RouterのページとAPIルート
- `src/components/` - 再利用可能なUIコンポーネント
- `src/lib/firebase.ts` - Firebase設定と初期化
- `src/lib/firestore/` - データベース操作とスキーマ
- `src/lib/tarot.ts` - タロットカードの定義とロジック
- `src/prompts/` - AIキャラクタープロンプトテンプレート
- `src/contexts/` - React Contextプロバイダー（CoinContext）

### キャラクターガイドライン
AIプロンプトやキャラクターインタラクションを扱う際は、ヒカリノの人格を維持してください：
- 温かく、姉のような、サポート的な口調
- 困難について正直でありながら希望を提供
- ユーザーが聞いてもらえている感覚と優しい励ましを提供
- 指導に対する判断的でないアプローチ

### セキュリティパターン
- 機密のFirebaseやStripeキーをクライアントコードで公開しない
- コイン消費の検証はCloud Functionsを通じてサーバーサイドで行う
- カード引きのランダム化は操作を防ぐためサーバーで実行
- すべての決済処理はセキュリティのためStripe webhookを使用

### 状態管理
- コイン関連の状態管理には`CoinContext`を使用
- 認証状態には`useAuth`フックを使用
- すべてのコイン取引はサーバーサイド検証
- 占い履歴の永続化にはFirestoreを使用

### 設定メモ
- TypeScript strict modeが有効で、`@/*`パスマッピング設定済み
- ESLintはNext.jsコアウェブバイタル設定を使用
- Tailwind CSS 4はシステム設定に基づく自動ダークモード
- `main`ブランチでの自動バージョニング用semantic releaseが設定済み

### Firebase構造
Firestore操作を行う際は、`src/lib/firestore/`の既存パターンを使用してください：
- ユーザーのコイン残高は安全に保存
- カード詳細と解釈を含む占い履歴
- Cloud Functionsがサーバーサイドのコイン減算を処理

### 決済統合
Stripe統合には以下が必要：
- サーバーサイドのコイン購入処理
- 決済確認のためのWebbook検証
- Cloud Functionsを通じた安全なコイン残高更新