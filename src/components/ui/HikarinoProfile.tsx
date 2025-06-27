// 魔法のような体験への招待コンポーネント

import Image from "next/image";

interface HikarinoProfileProps {
  name?: string;
  description?: string;
  imageSrc?: string;
}

const HikarinoProfile = ({
  name = "ヒカリノ",
  imageSrc = "/hikarino-normal.png",
}: HikarinoProfileProps) => {
  return (
    <div className="max-w-md w-full mb-6 relative">
      {/* 案内人（ヒカリノ）- コンパクトなカード */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-1 ring-purple-100 dark:ring-purple-900">
              <Image
                src={imageSrc}
                alt={name}
                width={48}
                height={48}
                className="w-full h-full object-cover object-top"
                style={{ objectPosition: "center 10%" }}
                priority
              />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✨</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-600 dark:text-gray-400 uppercase tracking-wide">占い師 {name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HikarinoProfile;