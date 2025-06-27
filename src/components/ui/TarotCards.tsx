// タロットカード表示コンポーネント

import Image from "next/image";
import { DrawnCard } from "@/types";

interface TarotCardsProps {
  cards: DrawnCard[];
}

const TarotCards = ({ cards }: TarotCardsProps) => {
  if (cards.length === 0) return null;

  return (
    <div className="mt-4 mb-6 flex gap-2 md:gap-6 justify-center overflow-x-auto">
      {cards.map((item, idx) => (
        <div
          key={idx}
          className="rounded-xl shadow-md p-2 flex flex-col items-center w-20 md:w-28 border border-purple-100 dark:border-purple-700 bg-white dark:bg-gray-800 flex-shrink-0"
        >
          <Image
            src={item.card.imagePath}
            alt={item.card.name}
            width={96}
            height={128}
            className={`w-16 md:w-24 aspect-[3/4] object-contain mb-2 ${
              item.isReversed ? "rotate-180" : ""
            }`}
            priority={idx === 0}
          />
          <span className="w-full text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.card.name}
          </span>
          <span className="w-full text-center text-xs text-gray-500 dark:text-gray-400 mt-1">
            {item.isReversed ? "逆位置" : "正位置"}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TarotCards;