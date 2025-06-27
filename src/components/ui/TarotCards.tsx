// タロットカード表示コンポーネント

import Image from "next/image";
import { DrawnCard } from "@/types";
import { useState, useEffect } from "react";

interface TarotCardsProps {
  cards: DrawnCard[];
}

const TarotCards = ({ cards }: TarotCardsProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // スクロール位置監視
  useEffect(() => {
    const container = document.querySelector('.tarot-scroll-container') as HTMLElement;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const cardWidth = window.innerWidth < 768 ? 172 : 216; // カード幅 + gap
      const rawIndex = scrollLeft / cardWidth;
      const newIndex = Math.round(rawIndex);
      // 最後のカードまで確実に検出
      const maxIndex = cards.length - 1;
      const finalIndex = Math.max(0, Math.min(newIndex, maxIndex));
      setCurrentIndex(finalIndex);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [cards.length]);

  if (cards.length === 0) return null;

  return (
    <div className="mt-6 mb-12">
      {/* 横スクロール可能なカード表示エリア（画面全幅使用） */}
      <div className="relative w-screen -ml-6 md:-ml-0 md:w-full overflow-hidden">
        {/* スクロールコンテナ（スクロールバー非表示） */}
        <div 
          className="tarot-scroll-container flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide touch-pan-x snap-x snap-mandatory pb-4 pl-6 md:pl-0"
        >
          {/* 左端の余白 */}
          <div className="flex-shrink-0 w-4"></div>
          
          {cards.map((item, idx) => (
            <div
              key={idx}
              className="relative group flex-shrink-0 w-40 md:w-52 snap-center"
            >
              {/* カード本体 */}
              <div className="relative bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-xl border border-purple-200/50 dark:border-purple-700/50 overflow-hidden">
                {/* カード番号ヘッダー */}
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-2">
                  <span className="text-sm font-bold">カード {idx + 1}</span>
                </div>
                
                {/* カード画像 */}
                <div className="relative p-4">
                  <Image
                    src={item.card.imagePath}
                    alt={item.card.name}
                    width={120}
                    height={180}
                    className={`w-full aspect-[2/3] object-cover rounded-lg transition-transform duration-300 ${
                      item.isReversed ? "rotate-180" : ""
                    }`}
                    priority={idx === 0}
                  />
                  
                  {/* 位置表示バッジ */}
                  <div className="absolute top-6 right-6">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      item.isReversed 
                        ? "bg-rose-500 text-white" 
                        : "bg-emerald-500 text-white"
                    }`}>
                      {item.isReversed ? "逆位置" : "正位置"}
                    </div>
                  </div>
                </div>
                
                {/* カード名フッター */}
                <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-center text-sm font-medium text-gray-800 dark:text-gray-200">
                    {item.card.name}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {/* 右端の余白 */}
          <div className="flex-shrink-0 w-8"></div>
        </div>
        
        {/* 左右ナビゲーションボタン（PC・モバイル共通） */}
        <div className="flex justify-center items-center mt-4 gap-4">
          <button 
            onClick={() => {
              const container = document.querySelector('.tarot-scroll-container') as HTMLElement;
              if (container) {
                const newIndex = Math.max(0, currentIndex - 1);
                setCurrentIndex(newIndex);
                const scrollAmount = window.innerWidth < 768 ? -172 : -220;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
              }
            }}
            className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 flex items-center justify-center transition-colors duration-200 text-purple-600 dark:text-purple-400"
          >
            ←
          </button>
          
          <button 
            onClick={() => {
              const container = document.querySelector('.tarot-scroll-container') as HTMLElement;
              if (container) {
                const newIndex = Math.min(cards.length - 1, currentIndex + 1);
                setCurrentIndex(newIndex);
                const scrollAmount = window.innerWidth < 768 ? 172 : 220;
                container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
              }
            }}
            className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 hover:bg-purple-200 dark:hover:bg-purple-800 flex items-center justify-center transition-colors duration-200 text-purple-600 dark:text-purple-400"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TarotCards;