// ヒカリノのプロフィール表示コンポーネント

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
    <div className="flex items-center rounded-xl overflow-hidden max-w-md w-full h-28 mb-8">
      <div className="relative w-28 h-full flex-shrink-0 overflow-hidden rounded-l-xl">
        <Image
          src={imageSrc}
          alt={name}
          width={112}
          height={112}
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: "center 10%" }}
          priority
        />
      </div>
      <div className="px-4">
        <p className="text-gray-800 dark:text-gray-100 font-semibold text-sm leading-tight">{name}</p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-tight whitespace-pre-line">{description}</p>
      </div>
    </div>
  );
};

export default HikarinoProfile;