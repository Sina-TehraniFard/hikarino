// サービス価値提案コンポーネント（旧：HikarinoProfile）

import Image from "next/image";

interface HikarinoProfileProps {
  name?: string;
  description?: string;
  imageSrc?: string;
}

const HikarinoProfile = ({
  name = "ヒカリノ",
  description = "無料でカードを引いてみませんか？\nあなたへのメッセージが見つかります\n何かヒントになることがあるかもしれません",
  imageSrc = "/hikarino-normal.png",
}: HikarinoProfileProps) => {
  return (
    <div className="max-w-md w-full mb-8 text-center">
      {/* メインメッセージ - 最も重要な情報を最初に */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
        無料でカードを引いてみませんか？
      </h2>
      
      {/* 価値提案 - ユーザーが得られる価値 */}
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
        あなたへのメッセージが見つかります<br />
        何かヒントになることがあるかもしれません
      </p>
      
      {/* キャラクター情報 - 補助的な要素として控えめに配置 */}
      <div className="flex items-center justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">
        <div className="relative w-10 h-10 rounded-full overflow-hidden">
          <Image
            src={imageSrc}
            alt={name}
            width={40}
            height={40}
            className="w-full h-full object-cover object-top"
            style={{ objectPosition: "center 10%" }}
            priority
          />
        </div>
        <span>案内人: {name}</span>
      </div>
    </div>
  );
};

export default HikarinoProfile;