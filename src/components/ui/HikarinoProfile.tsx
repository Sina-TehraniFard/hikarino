// ヒカリノのプロフィール表示コンポーネント

import Image from "next/image";

interface HikarinoProfileProps {
  name?: string;
  description?: string;
  imageSrc?: string;
}

const HikarinoProfile = ({
  name = "ヒカリノ",
  description = "あなたの心にそっと寄り添います。",
  imageSrc = "/hikarino-normal.png",
}: HikarinoProfileProps) => {
  return (
    <div className="flex items-center rounded-xl overflow-hidden max-w-md w-full h-24 mb-8">
      <div className="relative w-24 h-full flex-shrink-0 overflow-hidden rounded-l-xl">
        <Image
          src={imageSrc}
          alt={name}
          width={96}
          height={96}
          className="w-full h-full object-cover object-top"
          style={{ objectPosition: "center 10%" }}
          priority
        />
      </div>
      <div className="px-4">
        <p className="text-gray-800 font-semibold text-sm leading-tight">{name}</p>
        <p className="text-gray-600 text-sm leading-tight">{description}</p>
      </div>
    </div>
  );
};

export default HikarinoProfile;