# [1.11.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.10.0...v1.11.0) (2025-11-02)

### Bug Fixes

- add loading screen during auth check to prevent UI flickering ([c46dd5d](https://github.com/Sina-TehraniFard/hikarino/commit/c46dd5d6ff28414b86c8168ff30c674c68b0fa6a))
- move modals outside backdrop-blur container for correct viewport centering ([9ff7019](https://github.com/Sina-TehraniFard/hikarino/commit/9ff7019e3a0a59d50da2b1c4c38a19aa44eaea88))
- PR [#95](https://github.com/Sina-TehraniFard/hikarino/issues/95)レビュー対応 - Firestoreバッチ制限とMarkdown lint修正 ([4dc2a5d](https://github.com/Sina-TehraniFard/hikarino/commit/4dc2a5d7530a62603176f6f2ded067e28a8376a7))
- prevent sidebar flickering on page reload with auth loading state ([c9b2fe1](https://github.com/Sina-TehraniFard/hikarino/commit/c9b2fe120330dead6782617cdb19efbd0ceb7469))
- remove redundant no history message from title ([a188735](https://github.com/Sina-TehraniFard/hikarino/commit/a188735734376dd636a0de9da19dd6591e3f8fa6))
- unify delete and expand button styles for consistent UX ([1782b68](https://github.com/Sina-TehraniFard/hikarino/commit/1782b68adf2df0f32c9230da42e87ba5dc38a880))
- use getFirebaseAuth for proper Firebase initialization ([8e22aab](https://github.com/Sina-TehraniFard/hikarino/commit/8e22aab30e679e8381b0007ee26a2bd9c1be03bd))

### Features

- add ConfirmDeleteModal component for deletion confirmation ([9291414](https://github.com/Sina-TehraniFard/hikarino/commit/929141418487686f688ded1c922bffab398836fb))
- add delete button to collapsed card for direct access ([483f58b](https://github.com/Sina-TehraniFard/hikarino/commit/483f58b6147d7e9adb75d38f7e3f53861a32f21b))
- add delete permission for fortunes in Firestore rules ([d992867](https://github.com/Sina-TehraniFard/hikarino/commit/d99286712aa351738920a1930ef43e5bf5bdbc6e))
- add deleteFortune and deleteAllFortunes functions ([bf5fa15](https://github.com/Sina-TehraniFard/hikarino/commit/bf5fa157a7597b047d85b72a1aeb18ffe7aab6f9))
- add useFortuneDelete hook for deletion state management ([c071ce4](https://github.com/Sina-TehraniFard/hikarino/commit/c071ce4219f2b0b9a5d2517998a635f9f92977f0))
- extend MessageDialog to support confirmation mode with two buttons ([bc3891a](https://github.com/Sina-TehraniFard/hikarino/commit/bc3891a7bd0d1fe9f9a5dd9e10e1060bbd6a98b2))
- integrate delete buttons into history page UI ([acdf35f](https://github.com/Sina-TehraniFard/hikarino/commit/acdf35f9bf765953ca6aae52ef30e0d3cbb9d988))

### Reverts

- restore original Firestore rules (write includes delete permission) ([e7b7926](https://github.com/Sina-TehraniFard/hikarino/commit/e7b792632a6272a84dc78372164946c468cb53cb))

# [1.10.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.9.0...v1.10.0) (2025-11-02)

### Features

- セマンティックリリース調査 ([4af01c3](https://github.com/Sina-TehraniFard/hikarino/commit/4af01c3df643fa603ffa6e4abf0241d67c5110cb))

# [1.9.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.8.0...v1.9.0) (2025-11-02)

### Features

- GCPのVMにSSHで接続できなくなったことに対する初手 ([a39d409](https://github.com/Sina-TehraniFard/hikarino/commit/a39d4096c943467b2862d04573668811e812fe43))

# [1.8.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.7.0...v1.8.0) (2025-11-02)

### Features

- gitignoreの更新 ([fed8720](https://github.com/Sina-TehraniFard/hikarino/commit/fed872088fdc774f50779d14ef73fdbc65b709c2))
- READMEの更新 ([675e194](https://github.com/Sina-TehraniFard/hikarino/commit/675e1947958b19a3c05fdc5ebf5430c908599522))

# [1.7.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.6.2...v1.7.0) (2025-11-01)

### Bug Fixes

- Next.js workspace root警告を完全に解決 ([0ca6972](https://github.com/Sina-TehraniFard/hikarino/commit/0ca69729bfe3ea3fe97e587d7bcd3ebcce71f859))
- Next.js設定警告を解決しワークスペース構成を最適化 ([4ac463d](https://github.com/Sina-TehraniFard/hikarino/commit/4ac463df08b958548f078105088323d75720443c))
- package-lock.jsonをGit管理に追加してCI/CD対応 ([f79cf7d](https://github.com/Sina-TehraniFard/hikarino/commit/f79cf7d9ef97808cc87c44105a848e1fef45096f))
- READMEの更新 ([57cd37e](https://github.com/Sina-TehraniFard/hikarino/commit/57cd37e4f5779aea11f4c84e8c2dfad4e1f8d211))

### Features

- フロントエンドをfrontend/ディレクトリに完全移行 ([554c07b](https://github.com/Sina-TehraniFard/hikarino/commit/554c07bc275bc8f34bea40251fddb00152c4f745))

## [1.6.2](https://github.com/Sina-TehraniFard/hikarino/compare/v1.6.1...v1.6.2) (2025-10-27)

### Bug Fixes

- GCPのVMにSSHで接続できなくなったことに対する初手 ([ba499d2](https://github.com/Sina-TehraniFard/hikarino/commit/ba499d2c8ff7654e64fbbfad105d696e7d433db2))

## [1.6.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.6.0...v1.6.1) (2025-10-25)

### Bug Fixes

- デプロイワークフローでファイル上書きを許可 ([d17916e](https://github.com/Sina-TehraniFard/hikarino/commit/d17916e3415320c341ff9cc1006ab04aff95edae))

# [1.6.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.5.0...v1.6.0) (2025-10-25)

### Bug Fixes

- GPT-5 API仕様に対応して占いエンドポイントを修正 ([f9ecaed](https://github.com/Sina-TehraniFard/hikarino/commit/f9ecaedcf323f3224ef059e43726b6bdc480fa13)), closes [#86](https://github.com/Sina-TehraniFard/hikarino/issues/86)
- GPT-5用にmax_tokensをmax_completion_tokensに修正 ([d162c62](https://github.com/Sina-TehraniFard/hikarino/commit/d162c623eae0903111e143b57ef7ba45120e6eb0))

### Features

- OpenAI APIモデルをGPT-4からGPT-5に更新 ([6a301fc](https://github.com/Sina-TehraniFard/hikarino/commit/6a301fc620e7a919c276fc2da0e9d1a32e5699c3)), closes [#86](https://github.com/Sina-TehraniFard/hikarino/issues/86)

# [1.5.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.4.1...v1.5.0) (2025-10-18)

### Bug Fixes

- フッターの年を動的取得に変更し、利用規約リンクを追加 ([2507688](https://github.com/Sina-TehraniFard/hikarino/commit/25076881f4646cf3028d2dd7e258a113034d2b29))
- ページレイアウトを修正してフッターが常に表示されるように改善 ([5b47a54](https://github.com/Sina-TehraniFard/hikarino/commit/5b47a54ad6a50239b70e5fe207fd702d7b345c43))
- メニューヘッダーの削除 ([d61b130](https://github.com/Sina-TehraniFard/hikarino/commit/d61b13055baf11cdc7237405a2524c469451a73f))

### Features

- ページ背景をグラデーションから画像に変更 ([9c56874](https://github.com/Sina-TehraniFard/hikarino/commit/9c568746e138cc296788d4a2c7068060a5159df6))

## [1.4.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.4.0...v1.4.1) (2025-10-18)

### Bug Fixes

- CIのバグを解消 ([e25c597](https://github.com/Sina-TehraniFard/hikarino/commit/e25c597e1a1971b84196ac1d1e79659158e64616))

# [1.4.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.3.0...v1.4.0) (2025-10-18)

### Features

- 利用規約の追加 ([bedc9e8](https://github.com/Sina-TehraniFard/hikarino/commit/bedc9e829dd1ed4d34c1c854756afbde07a4a3f6))

# [1.3.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.2.0...v1.3.0) (2025-10-13)

### Bug Fixes

- remove unused onAnimationComplete and backgroundResult to resolve ESLint errors ([86cc298](https://github.com/Sina-TehraniFard/hikarino/commit/86cc2989a99d7964ae25d94f54db89426d450659))
- resolve ESLint unused variable error in WaitingAnimation ([8bcafa8](https://github.com/Sina-TehraniFard/hikarino/commit/8bcafa877d3250b94307443540a96ba8295deed6))

### Features

- add streaming progress percentage and smooth result reveal animation ([749f2d9](https://github.com/Sina-TehraniFard/hikarino/commit/749f2d9f4241544f3065121d79e198beb3d96e16))

# [1.3.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.2.0...v1.3.0) (2025-10-13)

### Bug Fixes

- remove unused onAnimationComplete and backgroundResult to resolve ESLint errors ([86cc298](https://github.com/Sina-TehraniFard/hikarino/commit/86cc2989a99d7964ae25d94f54db89426d450659))
- resolve ESLint unused variable error in WaitingAnimation ([8bcafa8](https://github.com/Sina-TehraniFard/hikarino/commit/8bcafa877d3250b94307443540a96ba8295deed6))

### Features

- add streaming progress percentage and smooth result reveal animation ([749f2d9](https://github.com/Sina-TehraniFard/hikarino/commit/749f2d9f4241544f3065121d79e198beb3d96e16))

# [1.3.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.2.0...v1.3.0) (2025-10-13)

### Bug Fixes

- resolve ESLint unused variable error in WaitingAnimation ([8bcafa8](https://github.com/Sina-TehraniFard/hikarino/commit/8bcafa877d3250b94307443540a96ba8295deed6))

### Features

- add streaming progress percentage and smooth result reveal animation ([749f2d9](https://github.com/Sina-TehraniFard/hikarino/commit/749f2d9f4241544f3065121d79e198beb3d96e16))

# [1.3.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.2.0...v1.3.0) (2025-10-13)

### Features

- add streaming progress percentage and smooth result reveal animation ([749f2d9](https://github.com/Sina-TehraniFard/hikarino/commit/749f2d9f4241544f3065121d79e198beb3d96e16))

# [1.2.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.1.1...v1.2.0) (2025-10-12)

### Bug Fixes

- add tokusho page with legal disclosure information ([918705e](https://github.com/Sina-TehraniFard/hikarino/commit/918705ed13072bcbfe1f00d49c90eb9218468ab2))

### Features

- add tokusho page with legal disclosure information ([fd9115d](https://github.com/Sina-TehraniFard/hikarino/commit/fd9115de88d60c796e5e88ca86d1d483fcc962ce))

## [1.1.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.1.0...v1.1.1) (2025-10-08)

### Bug Fixes

- disable TypeScript build errors to workaround Next.js 15.5.4 typ… ([59f4dfb](https://github.com/Sina-TehraniFard/hikarino/commit/59f4dfb53e5ee28bb147635bebc4377eca5e2de2))
- disable TypeScript build errors to workaround Next.js 15.5.4 type generation bug ([94b91bd](https://github.com/Sina-TehraniFard/hikarino/commit/94b91bd0bfd966b89b10e58964ea0a327bc479a0))

# [1.1.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.3...v1.1.0) (2025-10-08)

### Bug Fixes

- restore semantic-release configuration ([476a5e2](https://github.com/Sina-TehraniFard/hikarino/commit/476a5e24ba56d8fe36ea0b4f4cfe0f82b6899cfb))

### Features

- optimize background rendering and remove excessive CSS animations ([5727714](https://github.com/Sina-TehraniFard/hikarino/commit/572771430f45591a5d007cc4dbec69ebad018f86))
- remove dark mode support to reduce CPU overhead ([44794d2](https://github.com/Sina-TehraniFard/hikarino/commit/44794d2cd2bf5522baae0ee3330736b22d7c46e3))
- モバイルで表示する際に携帯がオーバヒートする問題を解決 ([668dc29](https://github.com/Sina-TehraniFard/hikarino/commit/668dc29a88c34f362ea9d46d56e9ac7309ef053e))

# [1.1.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.3...v1.1.0) (2025-10-08)

### Features

- optimize background rendering and remove excessive CSS animations ([5727714](https://github.com/Sina-TehraniFard/hikarino/commit/572771430f45591a5d007cc4dbec69ebad018f86))
- remove dark mode support to reduce CPU overhead ([44794d2](https://github.com/Sina-TehraniFard/hikarino/commit/44794d2cd2bf5522baae0ee3330736b22d7c46e3))
- モバイルで表示する際に携帯がオーバヒートする問題を解決 ([668dc29](https://github.com/Sina-TehraniFard/hikarino/commit/668dc29a88c34f362ea9d46d56e9ac7309ef053e))

## [1.0.3](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.2...v1.0.3) (2025-09-26)

### Bug Fixes

- Add missing environment variables for OpenAI and Stripe integration ([2016c0e](https://github.com/Sina-TehraniFard/hikarino/commit/2016c0e9dc0102a66be3feb4a55a96bdc7cdb00e))

## [1.0.2](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.1...v1.0.2) (2025-09-20)

### Bug Fixes

- add build context to docker-compose.yml to enable proper rebuilding ([03093fd](https://github.com/Sina-TehraniFard/hikarino/commit/03093fd1917a17aa20e3b179a94de15052bcd801))

## [1.0.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.0...v1.0.1) (2025-09-20)

### Bug Fixes

- force Docker rebuild with --no-cache to include latest code changes ([c0e0ff4](https://github.com/Sina-TehraniFard/hikarino/commit/c0e0ff44a6e5363a018330b8b7c5b8ea201d1a9c))

# 1.0.0 (2025-09-20)

### Bug Fixes

- add bottom padding to content containers for better footer separation ([1ba43ac](https://github.com/Sina-TehraniFard/hikarino/commit/1ba43ac41f66cad5629bb124930f830270296e1d))
- add home navigation link to privacy policy page ([407622f](https://github.com/Sina-TehraniFard/hikarino/commit/407622f6acde516026ab0327c4ecbd7df3a459bb))
- add privacy policy link to sidebar footer ([c724852](https://github.com/Sina-TehraniFard/hikarino/commit/c72485204ca6a8055ffab8783e5789b8a64e7acb))
- add privacy policy page for legal compliance ([212cf78](https://github.com/Sina-TehraniFard/hikarino/commit/212cf78a7f2661e244f781e0e7b47857e8300022))
- Cloud Functions依存関係を本番環境用に最適化 ([07355ff](https://github.com/Sina-TehraniFard/hikarino/commit/07355ff86f60e0a8edc38232123719eb5421ec3a))
- CoinPurchaseModalのReact警告とHTML仕様違反を修正 ([4c5ea47](https://github.com/Sina-TehraniFard/hikarino/commit/4c5ea47110369854e029992e52e7970fd90051d0))
- **docker:** update docker-compose for production deploy ([549b970](https://github.com/Sina-TehraniFard/hikarino/commit/549b970a7adc4c47de06dc135dbf68e45377078c))
- Firebase関数呼び出しを遅延ロード対応に修正 ([82d7efe](https://github.com/Sina-TehraniFard/hikarino/commit/82d7efe67c01d8d2a07ba968719fcf60b2d975d2))
- OpenAI初期化とgitignore改善 ([1751a75](https://github.com/Sina-TehraniFard/hikarino/commit/1751a75f842e085e0adb5fc00667845d39c95e4d))
- reset to version 0.9.7 for proper semantic versioning ([23b4bc3](https://github.com/Sina-TehraniFard/hikarino/commit/23b4bc38e9c8cbbe3e0f781cc07f37ad209ea265))
- Stripe webhook初期化をリクエスト時に移動 ([72cb07a](https://github.com/Sina-TehraniFard/hikarino/commit/72cb07ad818f65e0404a29279dfc477140d5a1eb))
- Stripe初期化をリクエスト時に移動 ([9c8bf20](https://github.com/Sina-TehraniFard/hikarino/commit/9c8bf20b11a77f57e607ba8ae2c7491f7d13efa2))
- update fortune API endpoint ([319a9c3](https://github.com/Sina-TehraniFard/hikarino/commit/319a9c32da61343429abfa42634890621f4e95ff))
- UX問題修正とナビゲーション要素の整理 ([7e4a787](https://github.com/Sina-TehraniFard/hikarino/commit/7e4a787d699354e06eb6235782afad75cdf3c78b))
- コンポーネントでのFirebase Auth呼び出しを修正 ([5c2782b](https://github.com/Sina-TehraniFard/hikarino/commit/5c2782b7e5e438d8e23a4bf12bda14418890ee21))
- ダークモードでの文字視認性を大幅改善 ([736cb5c](https://github.com/Sina-TehraniFard/hikarino/commit/736cb5cb8fbe41f5a346e65d03bf8515634e8e51))
- ログインUI/UX修正とFirebase統合の改善 ([c74ea42](https://github.com/Sina-TehraniFard/hikarino/commit/c74ea4293c1c3c94b51a13205e06fec011257396))
- 占い履歴画面でのコイン購入モーダル表示位置修正 ([192989e](https://github.com/Sina-TehraniFard/hikarino/commit/192989ee91f7cf73d1f23406928de02161ac4f6a))
- 占い履歴画面の文言改善と型エラー修正 ([e1048db](https://github.com/Sina-TehraniFard/hikarino/commit/e1048dbfc1b12737e5902c12e1a1cac60816c87f))

### Code Refactoring

- UI情報階層の根本的改善 ([e286714](https://github.com/Sina-TehraniFard/hikarino/commit/e286714bcccc71737f47ea62b10ba65abfe04db0))

### Features

- add health check endpoint ([32f81dd](https://github.com/Sina-TehraniFard/hikarino/commit/32f81dd4637639c2a3de874470f70bc40a71012d))
- Docker環境構築設定を追加 ([ddeaed5](https://github.com/Sina-TehraniFard/hikarino/commit/ddeaed5de1ff790c94a3d992bdad483ecf17fbee))
- Docker設定ファイルを本番環境用に最適化 ([b6c1d21](https://github.com/Sina-TehraniFard/hikarino/commit/b6c1d2154f2ab3911956a1c2878efc12e4a197fa))
- GlassBoxコンポーネントとガラス質感UIスタイルの実装 ([8402a5e](https://github.com/Sina-TehraniFard/hikarino/commit/8402a5efe05f230d1588a3a1921a2970b8ce09bf))
- PC版サイドバーとレスポンシブナビゲーションの実装 ([cf1787e](https://github.com/Sina-TehraniFard/hikarino/commit/cf1787e5daa7f8a8e4c840a32554e3fde04043a5))
- PC版レイアウト改善とコンポーネント機能強化 ([acaf2d9](https://github.com/Sina-TehraniFard/hikarino/commit/acaf2d9ba4bcbbeb22bd48597e5c818bbcfda02a))
- semantic-release設定でpackage.json自動更新を追加 ([a534349](https://github.com/Sina-TehraniFard/hikarino/commit/a534349b5440a05678acbd5f7fe697ecdd665729))
- UIエクスペリエンスの統合実装 ([38b28bd](https://github.com/Sina-TehraniFard/hikarino/commit/38b28bd07807f0cef94f1f6ff75c3c2010434a93))
- UIの改善とコインアニメーション問題の修正 ([3dc127d](https://github.com/Sina-TehraniFard/hikarino/commit/3dc127d597bfecdee87bf1a7fccd1696243d61ad))
- スタイリングガイドライン追加とUIデザインシステム強化 ([abdaf9d](https://github.com/Sina-TehraniFard/hikarino/commit/abdaf9dabc6a823e7479932d1878d4638ff326bc))
- ステップガイドUIの統合とドロップダウン機能実装 ([313b15c](https://github.com/Sina-TehraniFard/hikarino/commit/313b15c9939e430b617b4cb32085c326d43e5eb2))
- タロットカードフリップアニメーション機能の実装 ([91d6584](https://github.com/Sina-TehraniFard/hikarino/commit/91d6584aab388f5a50b3f11f23c82ad44d3a2d15))
- ヒカリノのメッセージをユーザーフレンドリーに改善 ([2404bb8](https://github.com/Sina-TehraniFard/hikarino/commit/2404bb84c836544a778c525c0a9b410094ff59f1))
- プロンプトの大幅改善とリピート誘導の強化 ([3984437](https://github.com/Sina-TehraniFard/hikarino/commit/3984437d1a9afd8d2f4ac21bc2652e7823289154))
- ページネーション時のスクロール先を検索ボックスに改善 ([b8788bf](https://github.com/Sina-TehraniFard/hikarino/commit/b8788bf7408ea919b197211ec86721cb1e356985))
- モバイルファーストUIの実装とUX改善 ([3830f77](https://github.com/Sina-TehraniFard/hikarino/commit/3830f77e9c6f514bc95b6e2d2a39f1c9fbfe72cf))
- 世界最高峰タロットカードUIの実装 ([92ae1eb](https://github.com/Sina-TehraniFard/hikarino/commit/92ae1eb28cab3262fecf41ca0788653baf530b08))
- 共通ModalHeaderコンポーネントとUI統合の実装 ([50aefc8](https://github.com/Sina-TehraniFard/hikarino/commit/50aefc880557aa69e7c28478594352bde9ef6c18))
- 共通メッセージダイアログコンポーネントの実装 ([f7b028c](https://github.com/Sina-TehraniFard/hikarino/commit/f7b028c4b796788dce1bcbb0c1b2f6f3112c93e6))
- 初のsemantic-releaseによるリリース確認 ([4e34ff9](https://github.com/Sina-TehraniFard/hikarino/commit/4e34ff9d9fbc43d88020601841cb83f23024695a))
- 利用規約同意モーダルの実装と型定義の改善 ([c08d780](https://github.com/Sina-TehraniFard/hikarino/commit/c08d780fd05f70083f9c155fed615e5df9a9a8b6))
- 占い履歴画面のUI実装 ([8f961c3](https://github.com/Sina-TehraniFard/hikarino/commit/8f961c3958e6a2f5ee7d62bda670bb8fbecb8957))
- 待機アニメーション機能追加とAPI Routes移行 ([b7a591d](https://github.com/Sina-TehraniFard/hikarino/commit/b7a591d43fea4e23781ad3ca543ff4c5a92ff00c))
- 温かいカラーパレットとUIコンポーネント基盤を追加 ([c8994d1](https://github.com/Sina-TehraniFard/hikarino/commit/c8994d11905236deffeabadfb310a83c3d3adca4))
- 統合UIエクスペリエンス機能実装 ([2ab5845](https://github.com/Sina-TehraniFard/hikarino/commit/2ab5845f1c2a8b66c658d3f047d64d1fdfa412dc))
- 課金モーダルの女性向け色彩最適化とUX改善 ([f000c3e](https://github.com/Sina-TehraniFard/hikarino/commit/f000c3e06e3d36db65961c0210cacc7e502069de))
- 魔法的UIデザインシステムの実装 ([0c94f51](https://github.com/Sina-TehraniFard/hikarino/commit/0c94f51dcab5b4fa98b0eea0872d23ef927c6279))

### BREAKING CHANGES

- HikarinoProfileの表示が大幅に変更

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

# 1.0.0 (2025-09-20)

### Bug Fixes

- add bottom padding to content containers for better footer separation ([1ba43ac](https://github.com/Sina-TehraniFard/hikarino/commit/1ba43ac41f66cad5629bb124930f830270296e1d))
- add home navigation link to privacy policy page ([407622f](https://github.com/Sina-TehraniFard/hikarino/commit/407622f6acde516026ab0327c4ecbd7df3a459bb))
- add privacy policy link to sidebar footer ([c724852](https://github.com/Sina-TehraniFard/hikarino/commit/c72485204ca6a8055ffab8783e5789b8a64e7acb))
- add privacy policy page for legal compliance ([212cf78](https://github.com/Sina-TehraniFard/hikarino/commit/212cf78a7f2661e244f781e0e7b47857e8300022))
- Cloud Functions依存関係を本番環境用に最適化 ([07355ff](https://github.com/Sina-TehraniFard/hikarino/commit/07355ff86f60e0a8edc38232123719eb5421ec3a))
- CoinPurchaseModalのReact警告とHTML仕様違反を修正 ([4c5ea47](https://github.com/Sina-TehraniFard/hikarino/commit/4c5ea47110369854e029992e52e7970fd90051d0))
- **docker:** update docker-compose for production deploy ([549b970](https://github.com/Sina-TehraniFard/hikarino/commit/549b970a7adc4c47de06dc135dbf68e45377078c))
- Firebase関数呼び出しを遅延ロード対応に修正 ([82d7efe](https://github.com/Sina-TehraniFard/hikarino/commit/82d7efe67c01d8d2a07ba968719fcf60b2d975d2))
- OpenAI初期化とgitignore改善 ([1751a75](https://github.com/Sina-TehraniFard/hikarino/commit/1751a75f842e085e0adb5fc00667845d39c95e4d))
- reset to version 0.9.7 for proper semantic versioning ([23b4bc3](https://github.com/Sina-TehraniFard/hikarino/commit/23b4bc38e9c8cbbe3e0f781cc07f37ad209ea265))
- Stripe webhook初期化をリクエスト時に移動 ([72cb07a](https://github.com/Sina-TehraniFard/hikarino/commit/72cb07ad818f65e0404a29279dfc477140d5a1eb))
- Stripe初期化をリクエスト時に移動 ([9c8bf20](https://github.com/Sina-TehraniFard/hikarino/commit/9c8bf20b11a77f57e607ba8ae2c7491f7d13efa2))
- update fortune API endpoint ([319a9c3](https://github.com/Sina-TehraniFard/hikarino/commit/319a9c32da61343429abfa42634890621f4e95ff))
- UX問題修正とナビゲーション要素の整理 ([7e4a787](https://github.com/Sina-TehraniFard/hikarino/commit/7e4a787d699354e06eb6235782afad75cdf3c78b))
- コンポーネントでのFirebase Auth呼び出しを修正 ([5c2782b](https://github.com/Sina-TehraniFard/hikarino/commit/5c2782b7e5e438d8e23a4bf12bda14418890ee21))
- ダークモードでの文字視認性を大幅改善 ([736cb5c](https://github.com/Sina-TehraniFard/hikarino/commit/736cb5cb8fbe41f5a346e65d03bf8515634e8e51))
- ログインUI/UX修正とFirebase統合の改善 ([c74ea42](https://github.com/Sina-TehraniFard/hikarino/commit/c74ea4293c1c3c94b51a13205e06fec011257396))
- 占い履歴画面でのコイン購入モーダル表示位置修正 ([192989e](https://github.com/Sina-TehraniFard/hikarino/commit/192989ee91f7cf73d1f23406928de02161ac4f6a))
- 占い履歴画面の文言改善と型エラー修正 ([e1048db](https://github.com/Sina-TehraniFard/hikarino/commit/e1048dbfc1b12737e5902c12e1a1cac60816c87f))

### Code Refactoring

- UI情報階層の根本的改善 ([e286714](https://github.com/Sina-TehraniFard/hikarino/commit/e286714bcccc71737f47ea62b10ba65abfe04db0))

### Features

- add health check endpoint ([32f81dd](https://github.com/Sina-TehraniFard/hikarino/commit/32f81dd4637639c2a3de874470f70bc40a71012d))
- Docker環境構築設定を追加 ([ddeaed5](https://github.com/Sina-TehraniFard/hikarino/commit/ddeaed5de1ff790c94a3d992bdad483ecf17fbee))
- Docker設定ファイルを本番環境用に最適化 ([b6c1d21](https://github.com/Sina-TehraniFard/hikarino/commit/b6c1d2154f2ab3911956a1c2878efc12e4a197fa))
- GlassBoxコンポーネントとガラス質感UIスタイルの実装 ([8402a5e](https://github.com/Sina-TehraniFard/hikarino/commit/8402a5efe05f230d1588a3a1921a2970b8ce09bf))
- PC版サイドバーとレスポンシブナビゲーションの実装 ([cf1787e](https://github.com/Sina-TehraniFard/hikarino/commit/cf1787e5daa7f8a8e4c840a32554e3fde04043a5))
- PC版レイアウト改善とコンポーネント機能強化 ([acaf2d9](https://github.com/Sina-TehraniFard/hikarino/commit/acaf2d9ba4bcbbeb22bd48597e5c818bbcfda02a))
- semantic-release設定でpackage.json自動更新を追加 ([a534349](https://github.com/Sina-TehraniFard/hikarino/commit/a534349b5440a05678acbd5f7fe697ecdd665729))
- UIエクスペリエンスの統合実装 ([38b28bd](https://github.com/Sina-TehraniFard/hikarino/commit/38b28bd07807f0cef94f1f6ff75c3c2010434a93))
- UIの改善とコインアニメーション問題の修正 ([3dc127d](https://github.com/Sina-TehraniFard/hikarino/commit/3dc127d597bfecdee87bf1a7fccd1696243d61ad))
- スタイリングガイドライン追加とUIデザインシステム強化 ([abdaf9d](https://github.com/Sina-TehraniFard/hikarino/commit/abdaf9dabc6a823e7479932d1878d4638ff326bc))
- ステップガイドUIの統合とドロップダウン機能実装 ([313b15c](https://github.com/Sina-TehraniFard/hikarino/commit/313b15c9939e430b617b4cb32085c326d43e5eb2))
- タロットカードフリップアニメーション機能の実装 ([91d6584](https://github.com/Sina-TehraniFard/hikarino/commit/91d6584aab388f5a50b3f11f23c82ad44d3a2d15))
- ヒカリノのメッセージをユーザーフレンドリーに改善 ([2404bb8](https://github.com/Sina-TehraniFard/hikarino/commit/2404bb84c836544a778c525c0a9b410094ff59f1))
- プロンプトの大幅改善とリピート誘導の強化 ([3984437](https://github.com/Sina-TehraniFard/hikarino/commit/3984437d1a9afd8d2f4ac21bc2652e7823289154))
- ページネーション時のスクロール先を検索ボックスに改善 ([b8788bf](https://github.com/Sina-TehraniFard/hikarino/commit/b8788bf7408ea919b197211ec86721cb1e356985))
- モバイルファーストUIの実装とUX改善 ([3830f77](https://github.com/Sina-TehraniFard/hikarino/commit/3830f77e9c6f514bc95b6e2d2a39f1c9fbfe72cf))
- 世界最高峰タロットカードUIの実装 ([92ae1eb](https://github.com/Sina-TehraniFard/hikarino/commit/92ae1eb28cab3262fecf41ca0788653baf530b08))
- 共通ModalHeaderコンポーネントとUI統合の実装 ([50aefc8](https://github.com/Sina-TehraniFard/hikarino/commit/50aefc880557aa69e7c28478594352bde9ef6c18))
- 共通メッセージダイアログコンポーネントの実装 ([f7b028c](https://github.com/Sina-TehraniFard/hikarino/commit/f7b028c4b796788dce1bcbb0c1b2f6f3112c93e6))
- 初のsemantic-releaseによるリリース確認 ([4e34ff9](https://github.com/Sina-TehraniFard/hikarino/commit/4e34ff9d9fbc43d88020601841cb83f23024695a))
- 利用規約同意モーダルの実装と型定義の改善 ([c08d780](https://github.com/Sina-TehraniFard/hikarino/commit/c08d780fd05f70083f9c155fed615e5df9a9a8b6))
- 占い履歴画面のUI実装 ([8f961c3](https://github.com/Sina-TehraniFard/hikarino/commit/8f961c3958e6a2f5ee7d62bda670bb8fbecb8957))
- 待機アニメーション機能追加とAPI Routes移行 ([b7a591d](https://github.com/Sina-TehraniFard/hikarino/commit/b7a591d43fea4e23781ad3ca543ff4c5a92ff00c))
- 温かいカラーパレットとUIコンポーネント基盤を追加 ([c8994d1](https://github.com/Sina-TehraniFard/hikarino/commit/c8994d11905236deffeabadfb310a83c3d3adca4))
- 統合UIエクスペリエンス機能実装 ([2ab5845](https://github.com/Sina-TehraniFard/hikarino/commit/2ab5845f1c2a8b66c658d3f047d64d1fdfa412dc))
- 課金モーダルの女性向け色彩最適化とUX改善 ([f000c3e](https://github.com/Sina-TehraniFard/hikarino/commit/f000c3e06e3d36db65961c0210cacc7e502069de))
- 魔法的UIデザインシステムの実装 ([0c94f51](https://github.com/Sina-TehraniFard/hikarino/commit/0c94f51dcab5b4fa98b0eea0872d23ef927c6279))

### BREAKING CHANGES

- HikarinoProfileの表示が大幅に変更

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>

## [1.9.3](https://github.com/Sina-TehraniFard/hikarino/compare/v1.9.2...v1.9.3) (2025-09-20)

### Bug Fixes

- add privacy policy link to sidebar footer ([c724852](https://github.com/Sina-TehraniFard/hikarino/commit/c72485204ca6a8055ffab8783e5789b8a64e7acb))

## [1.9.2](https://github.com/Sina-TehraniFard/hikarino/compare/v1.9.1...v1.9.2) (2025-09-20)

### Bug Fixes

- add privacy policy page for legal compliance ([212cf78](https://github.com/Sina-TehraniFard/hikarino/commit/212cf78a7f2661e244f781e0e7b47857e8300022))

## [1.9.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.9.0...v1.9.1) (2025-09-20)

### Bug Fixes

- reset to version 0.9.7 for proper semantic versioning ([23b4bc3](https://github.com/Sina-TehraniFard/hikarino/commit/23b4bc38e9c8cbbe3e0f781cc07f37ad209ea265))

# [1.9.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.8.1...v1.9.0) (2025-09-20)

### Features

- add health check endpoint ([32f81dd](https://github.com/Sina-TehraniFard/hikarino/commit/32f81dd4637639c2a3de874470f70bc40a71012d))

## [1.8.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.8.0...v1.8.1) (2025-09-20)

### Bug Fixes

- **docker:** update docker-compose for production deploy ([549b970](https://github.com/Sina-TehraniFard/hikarino/commit/549b970a7adc4c47de06dc135dbf68e45377078c))

# [1.8.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.7.0...v1.8.0) (2025-09-19)

### Bug Fixes

- Cloud Functions依存関係を本番環境用に最適化 ([07355ff](https://github.com/Sina-TehraniFard/hikarino/commit/07355ff86f60e0a8edc38232123719eb5421ec3a))

### Features

- Docker設定ファイルを本番環境用に最適化 ([b6c1d21](https://github.com/Sina-TehraniFard/hikarino/commit/b6c1d2154f2ab3911956a1c2878efc12e4a197fa))

# [1.7.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.6.0...v1.7.0) (2025-09-17)

### Bug Fixes

- Firebase関数呼び出しを遅延ロード対応に修正 ([82d7efe](https://github.com/Sina-TehraniFard/hikarino/commit/82d7efe67c01d8d2a07ba968719fcf60b2d975d2))
- OpenAI初期化とgitignore改善 ([1751a75](https://github.com/Sina-TehraniFard/hikarino/commit/1751a75f842e085e0adb5fc00667845d39c95e4d))
- Stripe webhook初期化をリクエスト時に移動 ([72cb07a](https://github.com/Sina-TehraniFard/hikarino/commit/72cb07ad818f65e0404a29279dfc477140d5a1eb))
- Stripe初期化をリクエスト時に移動 ([9c8bf20](https://github.com/Sina-TehraniFard/hikarino/commit/9c8bf20b11a77f57e607ba8ae2c7491f7d13efa2))
- コンポーネントでのFirebase Auth呼び出しを修正 ([5c2782b](https://github.com/Sina-TehraniFard/hikarino/commit/5c2782b7e5e438d8e23a4bf12bda14418890ee21))

### Features

- Docker環境構築設定を追加 ([ddeaed5](https://github.com/Sina-TehraniFard/hikarino/commit/ddeaed5de1ff790c94a3d992bdad483ecf17fbee))

# [1.6.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.5.0...v1.6.0) (2025-07-28)

### Features

- 利用規約同意モーダルの実装と型定義の改善 ([c08d780](https://github.com/Sina-TehraniFard/hikarino/commit/c08d780fd05f70083f9c155fed615e5df9a9a8b6))

# [1.5.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.4.0...v1.5.0) (2025-07-27)

### Features

- プロンプトの大幅改善とリピート誘導の強化 ([3984437](https://github.com/Sina-TehraniFard/hikarino/commit/3984437d1a9afd8d2f4ac21bc2652e7823289154))

# [1.4.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.3.1...v1.4.0) (2025-07-25)

### Bug Fixes

- UX問題修正とナビゲーション要素の整理 ([7e4a787](https://github.com/Sina-TehraniFard/hikarino/commit/7e4a787d699354e06eb6235782afad75cdf3c78b))

### Features

- 温かいカラーパレットとUIコンポーネント基盤を追加 ([c8994d1](https://github.com/Sina-TehraniFard/hikarino/commit/c8994d11905236deffeabadfb310a83c3d3adca4))
- 課金モーダルの女性向け色彩最適化とUX改善 ([f000c3e](https://github.com/Sina-TehraniFard/hikarino/commit/f000c3e06e3d36db65961c0210cacc7e502069de))

## [1.3.1](https://github.com/Sina-TehraniFard/hikarino/compare/v1.3.0...v1.3.1) (2025-07-20)

### Bug Fixes

- ログインUI/UX修正とFirebase統合の改善 ([c74ea42](https://github.com/Sina-TehraniFard/hikarino/commit/c74ea4293c1c3c94b51a13205e06fec011257396))

# [1.3.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.2.0...v1.3.0) (2025-07-20)

### Bug Fixes

- CoinPurchaseModalのReact警告とHTML仕様違反を修正 ([4c5ea47](https://github.com/Sina-TehraniFard/hikarino/commit/4c5ea47110369854e029992e52e7970fd90051d0))

### Features

- PC版レイアウト改善とコンポーネント機能強化 ([acaf2d9](https://github.com/Sina-TehraniFard/hikarino/commit/acaf2d9ba4bcbbeb22bd48597e5c818bbcfda02a))
- 共通ModalHeaderコンポーネントとUI統合の実装 ([50aefc8](https://github.com/Sina-TehraniFard/hikarino/commit/50aefc880557aa69e7c28478594352bde9ef6c18))

# [1.2.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.1.0...v1.2.0) (2025-07-17)

### Features

- GlassBoxコンポーネントとガラス質感UIスタイルの実装 ([8402a5e](https://github.com/Sina-TehraniFard/hikarino/commit/8402a5efe05f230d1588a3a1921a2970b8ce09bf))

# [1.1.0](https://github.com/Sina-TehraniFard/hikarino/compare/v1.0.0...v1.1.0) (2025-06-29)

### Features

- semantic-release設定でpackage.json自動更新を追加 ([a534349](https://github.com/Sina-TehraniFard/hikarino/commit/a534349b5440a05678acbd5f7fe697ecdd665729))

# 1.0.0 (2025-06-29)

### Bug Fixes

- add bottom padding to content containers for better footer separation ([1ba43ac](https://github.com/Sina-TehraniFard/hikarino/commit/1ba43ac41f66cad5629bb124930f830270296e1d))
- update fortune API endpoint ([319a9c3](https://github.com/Sina-TehraniFard/hikarino/commit/319a9c32da61343429abfa42634890621f4e95ff))
- ダークモードでの文字視認性を大幅改善 ([736cb5c](https://github.com/Sina-TehraniFard/hikarino/commit/736cb5cb8fbe41f5a346e65d03bf8515634e8e51))
- 占い履歴画面でのコイン購入モーダル表示位置修正 ([192989e](https://github.com/Sina-TehraniFard/hikarino/commit/192989ee91f7cf73d1f23406928de02161ac4f6a))
- 占い履歴画面の文言改善と型エラー修正 ([e1048db](https://github.com/Sina-TehraniFard/hikarino/commit/e1048dbfc1b12737e5902c12e1a1cac60816c87f))

### Code Refactoring

- UI情報階層の根本的改善 ([e286714](https://github.com/Sina-TehraniFard/hikarino/commit/e286714bcccc71737f47ea62b10ba65abfe04db0))

### Features

- PC版サイドバーとレスポンシブナビゲーションの実装 ([cf1787e](https://github.com/Sina-TehraniFard/hikarino/commit/cf1787e5daa7f8a8e4c840a32554e3fde04043a5))
- UIエクスペリエンスの統合実装 ([38b28bd](https://github.com/Sina-TehraniFard/hikarino/commit/38b28bd07807f0cef94f1f6ff75c3c2010434a93))
- UIの改善とコインアニメーション問題の修正 ([3dc127d](https://github.com/Sina-TehraniFard/hikarino/commit/3dc127d597bfecdee87bf1a7fccd1696243d61ad))
- スタイリングガイドライン追加とUIデザインシステム強化 ([abdaf9d](https://github.com/Sina-TehraniFard/hikarino/commit/abdaf9dabc6a823e7479932d1878d4638ff326bc))
- ステップガイドUIの統合とドロップダウン機能実装 ([313b15c](https://github.com/Sina-TehraniFard/hikarino/commit/313b15c9939e430b617b4cb32085c326d43e5eb2))
- タロットカードフリップアニメーション機能の実装 ([91d6584](https://github.com/Sina-TehraniFard/hikarino/commit/91d6584aab388f5a50b3f11f23c82ad44d3a2d15))
- ヒカリノのメッセージをユーザーフレンドリーに改善 ([2404bb8](https://github.com/Sina-TehraniFard/hikarino/commit/2404bb84c836544a778c525c0a9b410094ff59f1))
- ページネーション時のスクロール先を検索ボックスに改善 ([b8788bf](https://github.com/Sina-TehraniFard/hikarino/commit/b8788bf7408ea919b197211ec86721cb1e356985))
- モバイルファーストUIの実装とUX改善 ([3830f77](https://github.com/Sina-TehraniFard/hikarino/commit/3830f77e9c6f514bc95b6e2d2a39f1c9fbfe72cf))
- 世界最高峰タロットカードUIの実装 ([92ae1eb](https://github.com/Sina-TehraniFard/hikarino/commit/92ae1eb28cab3262fecf41ca0788653baf530b08))
- 共通メッセージダイアログコンポーネントの実装 ([f7b028c](https://github.com/Sina-TehraniFard/hikarino/commit/f7b028c4b796788dce1bcbb0c1b2f6f3112c93e6))
- 初のsemantic-releaseによるリリース確認 ([4e34ff9](https://github.com/Sina-TehraniFard/hikarino/commit/4e34ff9d9fbc43d88020601841cb83f23024695a))
- 占い履歴画面のUI実装 ([8f961c3](https://github.com/Sina-TehraniFard/hikarino/commit/8f961c3958e6a2f5ee7d62bda670bb8fbecb8957))
- 待機アニメーション機能追加とAPI Routes移行 ([b7a591d](https://github.com/Sina-TehraniFard/hikarino/commit/b7a591d43fea4e23781ad3ca543ff4c5a92ff00c))
- 統合UIエクスペリエンス機能実装 ([2ab5845](https://github.com/Sina-TehraniFard/hikarino/commit/2ab5845f1c2a8b66c658d3f047d64d1fdfa412dc))
- 魔法的UIデザインシステムの実装 ([0c94f51](https://github.com/Sina-TehraniFard/hikarino/commit/0c94f51dcab5b4fa98b0eea0872d23ef927c6279))

### BREAKING CHANGES

- HikarinoProfileの表示が大幅に変更

🤖 Generated with [Claude Code](https://claude.ai/code)

Co-Authored-By: Claude <noreply@anthropic.com>
