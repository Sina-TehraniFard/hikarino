# GPT-4からGPT-5への移行で学んだ7つの重要なポイント【実践ガイド】

## はじめに

OpenAI APIを使用した開発において、モデルのバージョンアップは避けて通れない課題です。2025年8月にリリースされたGPT-5は、前世代のGPT-4と比較して大幅なコスト削減と性能向上を実現していますが、移行には思わぬ落とし穴が潜んでいます。

本記事では、実際のプロダクション環境でGPT-4からGPT-5への移行を行った際に直面した課題と、その解決方法を詳しく解説します。これから同様の移行を検討されている方の参考になれば幸いです。

## GPT-5とは？GPT-4との違いを理解する

### GPT-5の主な特徴

GPT-5は単なるバージョンアップではなく、アーキテクチャレベルで大きな変更が加えられたモデルです。主な特徴は以下の通りです。

**1. 推論能力の大幅な向上**

GPT-5は内部に推論機構を統合しており、回答を生成する前に「考える」プロセスを経ます。これにより、より論理的で一貫性のある応答が可能になりました。

**2. 圧倒的なコスト削減**

入力トークンあたりの料金がGPT-4の約96%削減されています。

- GPT-4: $30 per 1M tokens
- GPT-5: $1.25 per 1M tokens

**3. コンテキスト長の拡大**

- GPT-4: 最大8,000トークン
- GPT-5: 最大400,000トークン

この拡大により、より長い文脈を扱えるようになりました。

## 移行作業で直面した4つの大きな課題

### 課題1: `max_tokens`パラメータが使えない

GPT-4からGPT-5に単純にモデル名を変更すると、以下のようなエラーが発生します。

```
400 Unsupported parameter: 'max_tokens' is not supported with this model.
Use 'max_completion_tokens' instead.
```

**原因**

GPT-5では出力トークン数を制御するパラメータ名が変更されています。

**解決方法**

パラメータ名を変更するだけでは不十分です。後述する「推論トークン」の考慮が必要になります。

```typescript
// ❌ GPT-4の書き方（GPT-5では動作しない）
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  max_tokens: 800,
});

// ✅ GPT-5の正しい書き方
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  max_completion_tokens: 16000, // 推論トークンを考慮した値
});
```

### 課題2: `temperature`パラメータが使用できない

GPT-4では出力のランダム性を調整するために`temperature`パラメータを使用していましたが、GPT-5では以下のエラーが発生します。

```
400 Unsupported value: 'temperature' does not support 0.8 with this model.
Only the default (1) value is supported.
```

**原因**

GPT-5は推論モデルとして設計されており、内部の複雑な推論プロセスの安定性を保つため、`temperature`パラメータのカスタマイズが禁止されています。

**技術的背景**

推論モデルは以下のような複数段階のプロセスを経ます。

1. 問題の分析
2. 複数の候補を生成
3. 各候補を検証
4. 最適な回答を選択

このプロセスは精密に調整されており、外部から`temperature`を変更すると品質と安全性が損なわれる可能性があります。

**解決方法**

`temperature`パラメータを完全に削除し、デフォルト値（1.0）を使用します。

```typescript
// ❌ GPT-4の書き方（GPT-5ではエラー）
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  temperature: 0.8, // このパラメータが原因でエラー
});

// ✅ GPT-5の正しい書き方
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  // temperatureパラメータを削除
});
```

### 課題3: ストリーミングに組織認証が必要

リアルタイムに結果を表示するストリーミング機能を使用すると、以下のエラーが発生する場合があります。

```
400 Your organization must be verified to stream this model.
error.code: 'unsupported_value', param: 'stream'
```

**原因**

GPT-5のストリーミング機能は、組織認証済みのアカウントのみが利用可能です。

**解決方法**

短期的な対応として、ストリーミングを無効化します。

```typescript
// ❌ 組織認証がない場合はエラー
const stream = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  stream: true, // エラーの原因
});

// ✅ 非ストリーミングモード
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  stream: false,
});
```

**トレードオフの理解**

この変更により、ユーザーインターフェースでの逐次表示が一括表示に変わります。しかし、API呼び出しの安定性を優先することが重要です。

将来的に組織認証を完了すれば、ストリーミングを再度有効化できます。認証は[OpenAIの組織設定ページ](https://platform.openai.com/settings/organization/general)から行えます。

### 課題4: 推論トークンの考慮が必須【最重要】

これが最も見落としがちで、重要な課題です。

**問題の発見**

`max_completion_tokens: 800`と設定したところ、APIレスポンスは成功するものの、実際の出力が空になる現象が発生しました。

**デバッグログの分析**

APIレスポンスの`usage`フィールドを確認すると、以下のような情報が得られました。

```json
{
  "usage": {
    "completion_tokens": 800,
    "completion_tokens_details": {
      "reasoning_tokens": 800,
      "audio_tokens": 0
    }
  }
}
```

**原因の特定**

GPT-5は内部で深く推論を行うモデルであり、`max_completion_tokens`は以下の合計値を表します。

- **推論トークン**: モデルが内部で「考える」ために使用するトークン
- **出力トークン**: 実際にユーザーに返される文章のトークン

800トークンでは、推論だけで使い切ってしまい、実際の出力用トークンが残っていなかったのです。

**トークン数の適切な計算方法**

日本語を扱う場合、以下のように計算します。

```
必要な出力文字数: 2,000文字
日本語のトークン換算率: 1文字 = 2〜3トークン
出力に必要なトークン: 2,000 × 3 = 6,000トークン

推論に必要なトークン（推定）: 2,000トークン
安全マージン: 8,000トークン
-------------------------------------------
合計: 16,000トークン
```

**最終的な実装**

```typescript
const completion = await openai.chat.completions.create({
  model: "gpt-5",
  messages: [{ role: "user", content: prompt }],
  max_completion_tokens: 16000, // 推論と出力の両方を考慮
  stream: false,
});
```

## 実装例: GPT-4とGPT-5のコード比較

### GPT-4の実装（変更前）

```typescript
// GPT-4を使用したストリーミング実装
async function generateFortune(prompt: string) {
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
      // 逐次的に結果を表示
      console.log(content);
    }
  }
}
```

### GPT-5の実装（変更後）

```typescript
// GPT-5を使用した非ストリーミング実装
async function generateFortune(prompt: string) {
  const completion = await openai.chat.completions.create({
    model: "gpt-5",
    messages: [{ role: "user", content: prompt }],
    max_completion_tokens: 16000, // 推論トークンを考慮
    stream: false,
  });

  // 一括レスポンスの処理
  const content = completion.choices[0]?.message?.content || "";
  console.log(content);

  // トークン使用量の確認（デバッグ用）
  console.log("Token usage:", completion.usage);
}
```

### 主な変更点の一覧表

| 項目           | GPT-4                            | GPT-5                                   | 変更理由                           |
| -------------- | -------------------------------- | --------------------------------------- | ---------------------------------- |
| モデル名       | `gpt-4`                          | `gpt-5`                                 | 新モデルへの移行                   |
| 出力制御       | `max_tokens: 800`                | `max_completion_tokens: 16000`          | パラメータ名変更＋推論トークン考慮 |
| 温度設定       | `temperature: 0.8`               | （削除）                                | GPT-5では非サポート                |
| ストリーミング | `stream: true`                   | `stream: false`                         | 組織認証が必要                     |
| レスポンス形式 | `chunk.choices[0].delta.content` | `completion.choices[0].message.content` | 非ストリーミング形式に対応         |

## 移行後の検証方法

### 1. ビルドとリントの確認

まず、コードに構文エラーや型エラーがないことを確認します。

```bash
npm run build
npm run lint
```

すべてのチェックが成功することを確認してください。

### 2. API動作確認

実際にAPIを呼び出して、正常に動作することを確認します。

```bash
curl -X POST http://localhost:3000/api/fortune \
  -H "Content-Type: application/json" \
  -d '{
    "question": "今日の運勢を教えてください",
    "context": "朝から良い天気です"
  }'
```

### 3. トークン使用量の確認

APIレスポンスの`usage`フィールドを確認し、推論トークンと出力トークンが適切に配分されていることを確認します。

```typescript
console.log(completion.usage);
// 出力例:
// {
//   "prompt_tokens": 2222,
//   "completion_tokens": 3500,
//   "completion_tokens_details": {
//     "reasoning_tokens": 1200,
//     "output_tokens": 2300
//   }
// }
```

**確認ポイント**:

- `reasoning_tokens`: 推論に使用したトークン数
- `output_tokens`: 実際の出力に使用したトークン数
- 両方が適切に存在することを確認

## トラブルシューティング

移行作業中によくある問題と解決方法をまとめました。

### エラー1: max_tokensが使えない

```
Unsupported parameter: 'max_tokens' is not supported with this model.
```

**解決方法**: `max_tokens`を`max_completion_tokens`に変更してください。

### エラー2: temperatureが使えない

```
Unsupported value: 'temperature' does not support 0.8 with this model.
```

**解決方法**: `temperature`パラメータを完全に削除してください。

### エラー3: ストリーミングが使えない

```
Your organization must be verified to stream this model.
```

**解決方法**:

1. 短期的には`stream: false`に変更
2. 長期的には[組織認証](https://platform.openai.com/settings/organization/general)を実施

### 問題4: 出力が空になる

**症状**: APIは成功するが`content`が空文字列

**原因**: `max_completion_tokens`が少なすぎて推論だけで使い切っている

**解決方法**:

- 日本語の場合: 文字数 × 3 + 推論トークン + マージン
- 推奨値: 16,000以上

## 移行によって得られたメリット

### 1. 大幅なコスト削減

実際の運用では、API利用料金が約96%削減されました。これは長期的なプロダクト運用において大きなメリットです。

### 2. 品質の向上

GPT-5の高度な推論能力により、より論理的で洞察に富んだ回答が得られるようになりました。特に複雑な質問に対する回答品質が向上しています。

### 3. スケーラビリティの向上

コンテキスト長が大幅に拡大したことで、より詳細なプロンプト設計が可能になりました。

## まとめ

GPT-4からGPT-5への移行は、単純なモデル名の変更だけでは完了しません。本記事で解説した以下のポイントを押さえることが重要です。

**チェックリスト**:

- ✅ `max_tokens`を`max_completion_tokens`に変更
- ✅ 推論トークンを考慮した十分なトークン数を設定（推奨: 16,000以上）
- ✅ `temperature`パラメータを削除
- ✅ `stream: false`に変更（組織認証がない場合）
- ✅ レスポンス形式を非ストリーミング対応に変更
- ✅ トークン使用量をモニタリング

特に「推論トークン」という新しい概念を理解することが、成功への鍵となります。GPT-5は内部で「考える」プロセスを経るため、出力文字数だけでなく問題の複雑さも考慮したトークン設計が必要です。

これから移行を検討されている方は、本記事の内容を参考に、段階的なデバッグと慎重な検証を行うことをお勧めします。

## 参考資料

- [OpenAI Platform Documentation](https://platform.openai.com/docs/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [OpenAI 組織設定ページ](https://platform.openai.com/settings/organization/general)

---

**執筆日**: 2025年10月30日
**対象読者**: OpenAI APIを使用する開発者、特にGPT-4からGPT-5への移行を検討している方
**キーワード**: GPT-5, OpenAI API, モデル移行, 推論トークン, max_completion_tokens
