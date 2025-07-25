# CoinPurchaseModal UI設計書

## 1. 概要

### 1.1 背景と目的
本設計書は、CoinPurchaseModal（コイン購入画面）のUIを「光と温もりを感じる安心感のあるUI」へ刷新するための詳細設計を記載します。現在のガラス調（透過・ブラー）のデザインから、暖色系の不透明なデザインへ移行し、課金・決済導線においてユーザーの心理的ハードルを下げることを目的とします。

### 1.2 スコープ
- **含む**: 
  - CoinPurchaseModalコンポーネントの色彩設計
  - 背景・ボタン・テキストの質感変更
  - アニメーション・トランジションの調整
- **含まない**: 
  - 機能の追加・削除
  - レイアウト構造の大幅な変更
  - 他のモーダルやコンポーネントへの影響

### 1.3 成功基準
- ユーザーが安心感を持って課金操作を行えるUI
- 占いアプリケーションの世界観と調和した温かみのあるデザイン
- 視認性とアクセシビリティの維持・向上

## 2. カラーパレット

### 2.1 メインカラー構成

| 要素 | 現在の色 | 新しい色 | 色コード | 説明 |
|------|----------|----------|----------|------|
| モーダル背景 | rgba(0,0,0,0.5) + blur | #ECC356 | `#ECC356` | 柔らかい太陽光のような金色。不透明で温かく包み込む |
| オーバーレイ | rgba(0,0,0,0.5) | クリーム色 | `#FFFDF5` (30%透明度) | 白に近いクリーム色で柔らかな重なり |
| メインカラー | 青系統 | 空色 | `#ABD2DD` | 澄んだ空色。落ち着きと安心を提供 |
| アクセント | 白 | 白 | `#FFFFFF` | 純粋さと明瞭さ。価格やタイトルを際立たせる |
| 購入ボタン | 紫・緑系統 | グラデーション | `linear-gradient(to right, #F7971E, #FFD200)` | 太陽の導きを表現。行動喚起を促す |
| ボタンホバー | 各色の暗色 | 濃い金色 | `#EFB00C` | ホバー時により強い印象を与える |

### 2.2 セカンダリカラー

| 要素 | 色コード | 用途 |
|------|----------|------|
| 成功・推奨 | `#10B981` | おすすめプラン、成功メッセージ |
| 警告・割引 | `#EF4444` | 割引バッジ、注意事項 |
| 情報 | `#3B82F6` | セキュリティ情報、リンク |
| テキスト（メイン） | `#1F2937` | 主要なテキスト |
| テキスト（サブ） | `#6B7280` | 補助的な説明文 |

## 3. コンポーネント別スタイル仕様

### 3.1 モーダルコンテナ

```css
/* 旧スタイル（GlassBox使用） */
.modal-container {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* 新スタイル */
.modal-container {
  background: #ECC356;
  opacity: 1;
  border: none;
  box-shadow: 0 20px 25px -5px rgba(236, 195, 86, 0.3),
              0 10px 10px -5px rgba(236, 195, 86, 0.2);
}
```

### 3.2 オーバーレイ背景

```css
/* 旧スタイル */
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

/* 新スタイル */
.overlay {
  background-color: rgba(255, 253, 245, 0.3); /* #FFFDF5 with 30% opacity */
  backdrop-filter: none;
}
```

### 3.3 購入オプションカード

```css
/* 通常カード */
.purchase-option {
  background: #FFFFFF;
  border: 2px solid #ABD2DD;
  transition: all 0.3s ease;
}

.purchase-option:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 20px rgba(171, 210, 221, 0.3);
  border-color: #8FC5D4;
}

/* おすすめカード */
.purchase-option.recommended {
  background: linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%);
  border: 3px solid #F7971E;
  position: relative;
  overflow: visible;
}

.purchase-option.recommended::before {
  content: '';
  position: absolute;
  top: -3px;
  left: -3px;
  right: -3px;
  bottom: -3px;
  background: linear-gradient(135deg, #F7971E, #FFD200);
  border-radius: inherit;
  z-index: -1;
  opacity: 0.5;
  filter: blur(8px);
}
```

### 3.4 購入ボタン

```css
/* メインCTAボタン */
.purchase-button {
  background: linear-gradient(to right, #F7971E, #FFD200);
  color: #FFFFFF;
  font-weight: 700;
  padding: 16px 32px;
  border-radius: 12px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(247, 151, 30, 0.4);
}

.purchase-button:hover {
  background: #EFB00C;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(239, 176, 12, 0.5);
}

.purchase-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(239, 176, 12, 0.3);
}
```

### 3.5 セキュリティ情報セクション

```css
.security-info {
  background: linear-gradient(to bottom, #E6F4F9, #F0F9FC);
  border: 1px solid #ABD2DD;
  border-radius: 12px;
}

.security-info-header {
  background: #ABD2DD;
  color: #1F2937;
  padding: 12px 16px;
  border-radius: 12px 12px 0 0;
}
```

## 4. タイポグラフィ

### 4.1 フォント階層

| 要素 | サイズ | ウェイト | 色 | 行間 |
|------|--------|----------|-----|------|
| モーダルタイトル | 24px | 700 (Bold) | #1F2937 | 1.3 |
| 価格（大） | 32px | 700 (Bold) | #F7971E | 1.2 |
| コイン数 | 28px | 700 (Bold) | #1F2937 | 1.2 |
| 説明文 | 14px | 400 (Regular) | #6B7280 | 1.5 |
| 割引バッジ | 12px | 600 (SemiBold) | #FFFFFF | 1.2 |
| ボタンテキスト | 16px | 700 (Bold) | #FFFFFF | 1.2 |

### 4.2 フォントファミリー
```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Hiragino Sans", 
             "Noto Sans JP", sans-serif;
```

## 5. アニメーション・トランジション

### 5.1 モーダル表示アニメーション

```css
/* フェードイン + スケール */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-enter {
  animation: modalFadeIn 0.3s ease-out;
}
```

### 5.2 ホバーエフェクト

```css
/* カードホバー */
.card-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* ボタンホバー */
.button-hover {
  transition: background 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
```

### 5.3 光のアニメーション（推奨プラン）

```css
@keyframes shimmer {
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
}

.recommended-shimmer {
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.7) 50%,
    transparent 60%
  );
  background-size: 200% 100%;
  animation: shimmer 3s ease-in-out infinite;
}
```

## 6. アクセシビリティ考慮事項

### 6.1 コントラスト比
- 背景色 `#ECC356` に対するテキスト色 `#1F2937`: **7.2:1** (WCAG AAA準拠)
- ボタン背景 `#F7971E` に対する白文字: **2.8:1** (WCAG AA準拠)
- 情報背景 `#E6F4F9` に対するテキスト色 `#1F2937`: **10.5:1** (WCAG AAA準拠)

### 6.2 フォーカススタイル
```css
.focusable:focus-visible {
  outline: 3px solid #3B82F6;
  outline-offset: 2px;
}
```

### 6.3 モーション設定
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 7. レスポンシブデザイン

### 7.1 ブレークポイント
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### 7.2 モバイル最適化
```css
@media (max-width: 640px) {
  .modal-container {
    width: 100%;
    height: 100%;
    border-radius: 0;
    max-height: 100vh;
  }
  
  .purchase-option {
    padding: 16px;
    font-size: 14px;
  }
  
  .purchase-button {
    padding: 14px 24px;
    font-size: 14px;
  }
}
```

## 8. 実装への移行計画

### 8.1 段階的実装
1. **Phase 1**: カラーパレットの適用
   - 背景色の変更
   - テキストカラーの更新
   - ボタンスタイルの実装

2. **Phase 2**: 質感の変更
   - GlassBoxコンポーネントの置き換え
   - 不透明な背景の実装
   - 影とボーダーの調整

3. **Phase 3**: アニメーションの追加
   - トランジション効果の実装
   - ホバーエフェクトの追加
   - 光のアニメーション実装

### 8.2 既存コンポーネントとの互換性
- `GlassBox`コンポーネントを新しい`WarmBox`コンポーネントに置き換え
- 既存のアニメーションライブラリ（Lottie）との調和を保つ
- Tailwind CSSクラスの拡張で対応可能な部分は既存構造を活用

## 9. Figmaデザイン仕様

### 9.1 アセット構成
```
📁 CoinPurchaseModal
├── 📁 Colors
│   ├── Primary (#ECC356, #ABD2DD)
│   ├── CTA Gradient (#F7971E → #FFD200)
│   └── Text (#1F2937, #6B7280)
├── 📁 Components
│   ├── Modal Container
│   ├── Purchase Options (Normal/Recommended)
│   ├── Buttons (Primary/Secondary)
│   └── Security Info Section
└── 📁 States
    ├── Default
    ├── Hover
    ├── Active
    └── Loading
```

### 9.2 デザイントークン
```json
{
  "color": {
    "background": {
      "primary": "#ECC356",
      "overlay": "rgba(255, 253, 245, 0.3)",
      "card": "#FFFFFF",
      "recommended": "linear-gradient(135deg, #FFFDF5, #FFF8E7)"
    },
    "text": {
      "primary": "#1F2937",
      "secondary": "#6B7280",
      "accent": "#F7971E"
    },
    "button": {
      "primary": "linear-gradient(to right, #F7971E, #FFD200)",
      "hover": "#EFB00C"
    }
  },
  "spacing": {
    "xs": "4px",
    "sm": "8px",
    "md": "16px",
    "lg": "24px",
    "xl": "32px"
  },
  "borderRadius": {
    "sm": "8px",
    "md": "12px",
    "lg": "16px",
    "full": "9999px"
  }
}
```

## 10. 実装サンプルコード

### 10.1 新しいスタイル定義（Tailwind拡張）
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'warm': {
          'gold': '#ECC356',
          'sky': '#ABD2DD',
          'cream': '#FFFDF5',
          'orange': '#F7971E',
          'yellow': '#FFD200',
          'hover': '#EFB00C'
        }
      },
      backgroundImage: {
        'warm-gradient': 'linear-gradient(to right, #F7971E, #FFD200)',
        'soft-cream': 'linear-gradient(135deg, #FFFDF5 0%, #FFF8E7 100%)'
      }
    }
  }
}
```

### 10.2 コンポーネント実装例
```typescript
// WarmBox.tsx - GlassBoxの代替コンポーネント
const WarmBox: React.FC<{ className?: string; children: React.ReactNode }> = ({ 
  className = '', 
  children 
}) => {
  return (
    <div className={`
      bg-warm-gold 
      shadow-2xl 
      shadow-warm-gold/30 
      rounded-2xl 
      ${className}
    `}>
      {children}
    </div>
  );
};
```

## 11. テスト項目

### 11.1 視覚的テスト
- [ ] 全ての色が仕様通りに表示されるか
- [ ] ホバー効果が正しく動作するか
- [ ] アニメーションがスムーズに実行されるか
- [ ] レスポンシブデザインが正しく適用されるか

### 11.2 アクセシビリティテスト
- [ ] コントラスト比がWCAG基準を満たすか
- [ ] キーボードナビゲーションが可能か
- [ ] スクリーンリーダーで正しく読み上げられるか
- [ ] prefers-reduced-motionが尊重されるか

### 11.3 パフォーマンステスト
- [ ] アニメーションが60fpsで動作するか
- [ ] 画面のちらつきがないか
- [ ] モバイルデバイスでスムーズに動作するか