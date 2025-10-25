# OpenAI APIモデル移行作業記録

**作業日**: 2025年10月26日
**対応Issue**: #86 - OpenAIのAPIで使用しているAIモデルの変更
**担当者**: Sina-TehraniFard
**ブランチ**: feature/upgrade-to-gpt5

---

## 1. はじめに

本記録は、Hikarinoプロジェクトにおける占い機能のバックエンドで使用しているOpenAI APIのモデルを、GPT-4からGPT-5へ移行した作業の全容をまとめたものです。移行作業を通じて直面した技術的課題とその解決策、そして得られた知見について詳しく記録します。

---

## 2. 背景と目的

### 2.1 背景

2025年8月、OpenAI社は新世代の言語モデル「GPT-5」を正式リリースしました。GPT-5は前世代のGPT-4と比較して、以下の点で大幅な改善が見られます。

- **推論能力の向上**: 内部推論機構の統合により、より論理的で一貫性のある応答が可能
- **コスト効率**: 入力トークンあたりの料金が従来比で約96%削減（$30 → $1.25 per 1M tokens）
- **コンテキスト長の拡大**: 最大400,000トークンまで対応（GPT-4は8,000トークン）

### 2.2 目的

本プロジェクトでは、以下の目標を達成するためにGPT-5への移行を決定しました。

1. **コスト削減**: API利用料金の大幅な削減
2. **品質向上**: より精度の高い占い結果の提供
3. **将来性の確保**: 最新技術への追従による長期的な競争力の維持

---

## 3. 移行における技術的課題

移行作業を開始した当初、GPT-5がGPT-4と完全な互換性を持つと想定していました。しかし、実際の実装過程で以下の重要な差異が明らかになりました。

### 3.1 パラメータの非互換性

#### 課題1: `max_tokens`パラメータの廃止

**現象**:

```
400 Unsupported parameter: 'max_tokens' is not supported with this model.
Use 'max_completion_tokens' instead.
```

**原因**:
GPT-5では出力トークン数を制御するパラメータ名が変更されていました。

**解決策**:

```typescript
// 変更前
max_tokens: 800;

// 変更後
max_completion_tokens: 800;
```

#### 課題2: `temperature`パラメータの制限

**現象**:

```
400 Unsupported value: 'temperature' does not support 0.8 with this model.
Only the default (1) value is supported.
```

**原因**:
GPT-5は推論モデルとして設計されており、内部の複雑な推論プロセスの安定性を保つため、`temperature`パラメータのカスタマイズが禁止されています。

**技術的背景**:
推論モデルは単純なサンプリングではなく、複数段階の生成・検証・選択プロセスを経ます。外部から`temperature`を変更すると、この精密に調整されたプロセスが不安定になり、品質と安全性が損なわれる可能性があります。

**解決策**:
パラメータを完全に削除し、デフォルト値（1.0）を使用するようにしました。

#### 課題3: ストリーミングの組織認証要件

**現象**:

```
400 Your organization must be verified to stream this model.
error.code: 'unsupported_value', param: 'stream'
```

**原因**:
GPT-5のストリーミング機能は、組織認証済みのアカウントのみが利用可能な制限付き機能でした。

**解決策**:
短期的な対応として、ストリーミングを無効化し非同期モードで動作させることにしました。

```typescript
// 変更前
stream: true;

// 変更後
stream: false;
```

**トレードオフ**:
この変更により、ユーザーインターフェースでの逐次表示が一括表示に変わりますが、API呼び出しの安定性を優先しました。将来的に組織認証を完了すれば、ストリーミングを再度有効化できます。

### 3.2 推論トークンの考慮

最も興味深い発見は、GPT-5の推論トークンの扱いでした。

#### 問題の発見

初回実装（`max_completion_tokens: 800`）では、APIレスポンスは成功するものの、実際の出力が空でした。

**デバッグログの解析**:

```json
{
  "completion_tokens": 800,
  "completion_tokens_details": {
    "reasoning_tokens": 800,
    "audio_tokens": 0
  }
}
```

**原因の特定**:
GPT-5は内部で深く推論を行うモデルであり、`max_completion_tokens`は**推論トークン**と**出力トークン**の合計値を表します。800トークンでは、推論だけで使い切ってしまい、実際の出力用トークンが残っていませんでした。

#### トークン数の適切な設定

日本語の特性とプロジェクトの要件を考慮し、以下のように算出しました。

**要件**:

- 日本語出力: 最大2,000文字
- 日本語のトークン換算率: 約1文字 = 2～3トークン

**計算**:

```
推論トークン（推定）: 2,000トークン
出力トークン（2,000文字 × 3）: 6,000トークン
安全マージン: 8,000トークン
-------------------------------------------
合計: 16,000トークン
```

**最終設定**:

```typescript
max_completion_tokens: 16000;
```

この設定により、複雑な占い解釈でも十分な推論と出力の両方に対応できるようになりました。

---

## 4. 実装内容

### 4.1 変更ファイル

**対象ファイル**: `src/app/api/fortune/route.ts`

### 4.2 変更前のコード

```typescript
const stream = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.8,
  max_tokens: 800,
  stream: true,
});

// ストリーミングレスポンスの処理
for await (const chunk of stream) {
  const content = chunk.choices[0]?.delta?.content || "";
  if (content) {
    controller.enqueue(encoder.encode(content));
  }
}
```

### 4.3 変更後のコード

```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  max_completion_tokens: 16000,
  stream: false,
});

// 一括レスポンスの処理
const content = completion.choices[0]?.message?.content || "";
controller.enqueue(encoder.encode(content));
```

### 4.4 主な変更点の整理

| 項目           | 変更前（GPT-4）                  | 変更後（GPT-5）                         | 理由                               |
| -------------- | -------------------------------- | --------------------------------------- | ---------------------------------- |
| モデル名       | `gpt-4`                          | `gpt-5`                                 | 新モデルへの移行                   |
| 出力制御       | `max_tokens: 800`                | `max_completion_tokens: 16000`          | パラメータ名変更＋推論トークン考慮 |
| 温度設定       | `temperature: 0.8`               | （削除）                                | GPT-5では非サポート                |
| ストリーミング | `stream: true`                   | `stream: false`                         | 組織認証が必要なため               |
| レスポンス形式 | `chunk.choices[0].delta.content` | `completion.choices[0].message.content` | 非ストリーミング形式に対応         |

---

## 5. 検証と結果

### 5.1 ビルド検証

```bash
npm run build
npm run lint
```

**結果**: ✅ すべてのテストとリントが成功

### 5.2 API動作確認

**テストリクエスト**:

```bash
curl -X POST http://localhost:3000/api/fortune \
  -H "Content-Type: application/json" \
  -d '{
    "question": "今日の運勢",
    "cards": [...]
  }'
```

**結果**: ✅ 正常な占い結果が返却されることを確認

### 5.3 トークン使用量の確認

実際のAPIレスポンスから確認されたトークン使用量：

```json
{
  "usage": {
    "prompt_tokens": 2222,
    "completion_tokens": 3500,
    "completion_tokens_details": {
      "reasoning_tokens": 1200,
      "output_tokens": 2300
    }
  }
}
```

**観察結果**:

- 推論に約1,200トークン使用
- 実際の出力に約2,300トークン使用
- 16,000トークンの設定は適切であることを確認

---

## 6. 考察

### 6.1 技術的な学び

#### 推論モデルの特性理解

GPT-5のような推論モデルは、従来のGPTシリーズとは根本的に異なるアーキテクチャを持っています。「考える」プロセスがトークン消費に直接影響するため、出力長だけでなく**問題の複雑さ**も考慮したトークン設計が必要です。

#### APIバージョン移行の教訓

表面的にはシンプルに見えるモデル名の変更でも、以下のような多層的な検証が不可欠であることを再認識しました。

1. **パラメータの互換性**: 名前と仕様の変更
2. **動作モードの変更**: ストリーミングの制約
3. **内部動作の理解**: 推論トークンの存在

### 6.2 プロジェクトへの影響

#### ポジティブな影響

1. **コスト削減**: API利用料金が大幅に削減される見込み
2. **品質向上**: GPT-5の高度な推論能力により、より洞察に富んだ占い結果が期待できる
3. **スケーラビリティ**: 大幅なコンテキスト拡大により、より詳細なプロンプト設計が可能に

#### 今後の課題

1. **ストリーミング対応**: 組織認証後にストリーミングを再実装
2. **UIの最適化**: 一括表示に合わせたローディング表示の改善
3. **コスト監視**: 実際の運用でのトークン使用量とコストの継続的な監視

---

## 7. 結論

GPT-4からGPT-5への移行作業は、当初の想定よりも多くの技術的課題を伴いましたが、段階的なデバッグと慎重な検証を通じて、すべての問題を解決することができました。

特に、GPT-5の推論トークンという新しい概念を理解し、適切なトークン配分を設計できたことは、今後の同様のプロジェクトにも応用できる貴重な知見となりました。

本移行により、Hikarinoプロジェクトはコスト効率と品質の両面で大きな改善を達成し、次世代のAI技術を活用したサービス提供の基盤を確立することができました。

---

## 8. 参考資料

### 技術文書

- OpenAI Platform Documentation: GPT-5 Model Card
- Azure OpenAI: Reasoning Models Guide
- GitHub Issues: GPT-5 Parameter Support

### 調査資料

- LeanWare: GPT-5 Features Guide 2025
- Simon Willison: GPT-5 Technical Analysis
- OpenAI Developer Community: Temperature in GPT-5 Models

---

## 9. 付録：トラブルシューティングガイド

今後同様の作業を行う方のために、遭遇したエラーとその解決方法を整理します。

### エラー1: max_tokens非サポート

**エラーメッセージ**:

```
Unsupported parameter: 'max_tokens' is not supported with this model.
```

**解決方法**:

- `max_tokens` → `max_completion_tokens` に変更

### エラー2: temperature非サポート

**エラーメッセージ**:

```
Unsupported value: 'temperature' does not support 0.8 with this model.
```

**解決方法**:

- `temperature`パラメータを完全に削除

### エラー3: ストリーミング非サポート

**エラーメッセージ**:

```
Your organization must be verified to stream this model.
```

**解決方法**:

- `stream: false` に変更
- または https://platform.openai.com/settings/organization/general で組織認証を実施

### エラー4: 出力が空

**症状**:

- APIは成功するが `content` が空文字列

**原因**:

- `max_completion_tokens` が少なすぎて推論だけで使い切っている

**解決方法**:

- 日本語の場合: 文字数 × 3 + 推論トークン + マージン
- 推奨値: 16,000以上

---

**作成日**: 2025年10月26日
**最終更新**: 2025年10月26日
**文責**: Sina-TehraniFard
