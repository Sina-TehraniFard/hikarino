// 占い結果表示コンポーネント

import { useState, useEffect } from "react";

interface FortuneResultProps {
  result: string;
  placeholder?: string;
}

const FortuneResult = ({
  result,
  placeholder = "カードを引いて、ヒカリノに解釈してもらいましょう。",
}: FortuneResultProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (result) {
      // 結果が設定されたら少し遅延してアニメーション開始
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [result]);

  return (
    <div className="min-h-[200px] flex items-center justify-center p-4 md:p-8 transition-all duration-300 ease-in-out">
      {result ? (
        <div
          className={`whitespace-pre-wrap text-lg leading-relaxed text-gray-700 w-full transition-all duration-700 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {result}
        </div>
      ) : (
        <div className="text-gray-300 text-center w-full">{placeholder}</div>
      )}
    </div>
  );
};

export default FortuneResult;
