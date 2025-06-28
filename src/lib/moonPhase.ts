/**
 * 月相計算ユーティリティ
 * 日付から月相を計算し、視覚的な表現を提供
 */

export type MoonPhase = {
  phase: number; // 0-1の値（0=新月、0.5=満月）
  name: string;
  emoji: string;
  description: string;
  energy: string;
};

/**
 * 日付から月相を計算
 * 簡易的な計算式を使用（実際の月相とは若干の誤差あり）
 */
export function calculateMoonPhase(date: Date): MoonPhase {
  // 2000年1月6日の新月を基準
  const baseDate = new Date(2000, 0, 6, 18, 14, 0);
  const lunarCycle = 29.530588853; // 朔望月（日）
  
  const daysSinceBase = (date.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24);
  const phase = (daysSinceBase % lunarCycle) / lunarCycle;
  
  // 8つの主要な月相に分類
  if (phase < 0.0625 || phase >= 0.9375) {
    return {
      phase,
      name: "新月",
      emoji: "🌑",
      description: "始まりの時",
      energy: "新たな種を蒔く最適な時期"
    };
  } else if (phase < 0.1875) {
    return {
      phase,
      name: "三日月",
      emoji: "🌒",
      description: "成長の兆し",
      energy: "意図を明確にし、行動を起こす時"
    };
  } else if (phase < 0.3125) {
    return {
      phase,
      name: "上弦の月",
      emoji: "🌓",
      description: "決断の時",
      energy: "障害を乗り越え、前進する力"
    };
  } else if (phase < 0.4375) {
    return {
      phase,
      name: "十三夜月",
      emoji: "🌔",
      description: "充実への道",
      energy: "努力が実を結び始める時期"
    };
  } else if (phase < 0.5625) {
    return {
      phase,
      name: "満月",
      emoji: "🌕",
      description: "完成の時",
      energy: "願いが叶い、感謝を捧げる時"
    };
  } else if (phase < 0.6875) {
    return {
      phase,
      name: "寝待月",
      emoji: "🌖",
      description: "内省の始まり",
      energy: "収穫を振り返り、手放す準備"
    };
  } else if (phase < 0.8125) {
    return {
      phase,
      name: "下弦の月",
      emoji: "🌗",
      description: "解放の時",
      energy: "不要なものを手放し、浄化する"
    };
  } else {
    return {
      phase,
      name: "有明月",
      emoji: "🌘",
      description: "静寂の時",
      energy: "次のサイクルへの準備と休息"
    };
  }
}

/**
 * 月相に基づいた背景グラデーション
 */
export function getMoonPhaseGradient(phase: MoonPhase): string {
  const gradients = {
    "新月": "from-gray-900 via-purple-900 to-black",
    "三日月": "from-indigo-900 via-purple-800 to-pink-900",
    "上弦の月": "from-blue-800 via-purple-700 to-pink-800",
    "十三夜月": "from-blue-700 via-purple-600 to-pink-700",
    "満月": "from-yellow-200 via-pink-200 to-purple-200",
    "寝待月": "from-orange-300 via-pink-400 to-purple-500",
    "下弦の月": "from-purple-700 via-pink-800 to-indigo-900",
    "有明月": "from-gray-800 via-purple-900 to-gray-900"
  };
  
  return gradients[phase.name] || gradients["新月"];
}

/**
 * 月相の視覚的な表現（SVGパス）
 */
export function getMoonPhaseSVG(phase: number): string {
  // 0-1の値を角度に変換
  const angle = phase * 360;
  const isWaxing = phase < 0.5;
  const illumination = isWaxing ? phase * 2 : (1 - phase) * 2;
  
  // SVGパスの計算（簡略化）
  return `M 50 0 A 50 50 0 1 ${isWaxing ? 1 : 0} 50 100 A ${50 * illumination} 50 0 1 ${isWaxing ? 0 : 1} 50 0`;
}