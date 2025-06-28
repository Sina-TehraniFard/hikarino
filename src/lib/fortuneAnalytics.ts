import { FortuneHistory } from "@/types";
import { differenceInDays, format } from "date-fns";

export interface FortuneStats {
  totalReadings: number;
  mostFrequentCard: {
    name: string;
    count: number;
    meaning: string;
  } | null;
  readingFrequency: {
    average: string;
    pattern: string;
  };
  dominantElement: {
    element: string;
    percentage: number;
    meaning: string;
  };
  specialInsight: string;
}

// タロットカードの元素属性
export const cardElements: Record<string, string> = {
  "愚者": "風",
  "魔術師": "地",
  "女教皇": "水",
  "女帝": "風",
  "皇帝": "火",
  "教皇": "地",
  "恋人": "風",
  "戦車": "水",
  "力": "火",
  "隠者": "地",
  "運命の輪": "水",
  "正義": "風",
  "吊るされた男": "水",
  "死神": "水",
  "節制": "火",
  "悪魔": "地",
  "塔": "水",
  "星": "風",
  "月": "水",
  "太陽": "火",
  "審判": "水",
  "世界": "風"
};

const elementMeanings: Record<string, string> = {
  "火": "情熱と行動のエネルギーが強い",
  "水": "感情と直感を大切にする時期",
  "風": "思考とコミュニケーションが重要",
  "地": "現実的な基盤を築く時"
};

export function analyzeFortuneHistory(fortunes: FortuneHistory[]): FortuneStats {
  if (fortunes.length === 0) {
    return {
      totalReadings: 0,
      mostFrequentCard: null,
      readingFrequency: {
        average: "データなし",
        pattern: "まだ占いを始めていません"
      },
      dominantElement: {
        element: "未定",
        percentage: 0,
        meaning: "最初の一歩を踏み出しましょう"
      },
      specialInsight: "あなたの物語はこれから始まります"
    };
  }

  // カード出現頻度の計算
  const cardCounts = new Map<string, number>();
  const elementCounts = { 火: 0, 水: 0, 風: 0, 地: 0 };
  
  fortunes.forEach(fortune => {
    fortune.cards.forEach(({ cardName }) => {
      cardCounts.set(cardName, (cardCounts.get(cardName) || 0) + 1);
      const element = cardElements[cardName];
      if (element) {
        elementCounts[element as keyof typeof elementCounts]++;
      }
    });
  });

  // 最頻出カード
  let mostFrequentCard = null;
  let maxCount = 0;
  cardCounts.forEach((count, cardName) => {
    if (count > maxCount) {
      maxCount = count;
      mostFrequentCard = {
        name: cardName,
        count,
        meaning: getCardMeaning(cardName)
      };
    }
  });

  // 占い頻度の分析
  const frequency = analyzeReadingFrequency(fortunes);

  // 支配的な元素
  const totalElements = Object.values(elementCounts).reduce((a, b) => a + b, 0);
  const dominantElement = Object.entries(elementCounts).reduce((a, b) => 
    elementCounts[a[0] as keyof typeof elementCounts] > elementCounts[b[0] as keyof typeof elementCounts] ? a : b
  );

  // 特別な洞察
  const specialInsight = generateSpecialInsight(fortunes, mostFrequentCard, dominantElement[0]);

  return {
    totalReadings: fortunes.length,
    mostFrequentCard,
    readingFrequency: frequency,
    dominantElement: {
      element: dominantElement[0],
      percentage: Math.round((dominantElement[1] / totalElements) * 100),
      meaning: elementMeanings[dominantElement[0]]
    },
    specialInsight
  };
}

function getCardMeaning(cardName: string): string {
  const meanings: Record<string, string> = {
    "愚者": "新しい冒険への呼びかけ",
    "魔術師": "創造力と実現力の象徴",
    "女教皇": "内なる知恵への導き",
    "女帝": "豊かさと育みのエネルギー",
    "皇帝": "リーダーシップと安定",
    "教皇": "伝統的な知恵と学び",
    "恋人": "選択と調和の時",
    "戦車": "意志の力と前進",
    "力": "内なる強さと優しさ",
    "隠者": "内省と真実の探求",
    "運命の輪": "変化とチャンスの訪れ",
    "正義": "バランスと公正さ",
    "吊るされた男": "新しい視点の獲得",
    "死神": "変容と再生のプロセス",
    "節制": "調和とバランスの追求",
    "悪魔": "執着からの解放",
    "塔": "突然の気づきと変革",
    "星": "希望と導きの光",
    "月": "直感と潜在意識",
    "太陽": "成功と喜びの訪れ",
    "審判": "覚醒と新たな始まり",
    "世界": "完成と新サイクル"
  };
  return meanings[cardName] || "深い意味を持つカード";
}

function analyzeReadingFrequency(fortunes: FortuneHistory[]): { average: string; pattern: string } {
  if (fortunes.length < 2) {
    return { average: "まだ分析中", pattern: "パターンを見つけるには時間が必要です" };
  }

  const sortedFortunes = [...fortunes].sort((a, b) => 
    (a.timestamp?.seconds || 0) - (b.timestamp?.seconds || 0)
  );

  const firstDate = new Date((sortedFortunes[0].timestamp?.seconds || 0) * 1000);
  const lastDate = new Date((sortedFortunes[sortedFortunes.length - 1].timestamp?.seconds || 0) * 1000);
  const daysDiff = differenceInDays(lastDate, firstDate) || 1;
  
  const avgDays = Math.round(daysDiff / (fortunes.length - 1));

  let pattern = "";
  if (avgDays <= 1) {
    pattern = "毎日の習慣として定着しています";
  } else if (avgDays <= 3) {
    pattern = "定期的に内省の時間を持っています";
  } else if (avgDays <= 7) {
    pattern = "週に一度の振り返りを大切にしています";
  } else {
    pattern = "必要な時に導きを求めています";
  }

  return {
    average: avgDays <= 1 ? "毎日" : `約${avgDays}日ごと`,
    pattern
  };
}


function generateSpecialInsight(
  fortunes: FortuneHistory[], 
  mostFrequentCard: { name: string; count: number } | null,
  dominantElement: string
): string {
  const insights = [
    `${dominantElement}のエネルギーがあなたを導いています`,
    mostFrequentCard ? `${mostFrequentCard.name}があなたの守護カードかもしれません` : "",
    fortunes.length > 10 ? "深い自己理解への道を歩んでいます" : "占いの旅は始まったばかりです",
    "運命の糸は確実に紡がれています"
  ];

  return insights.filter(Boolean).join("。");
}