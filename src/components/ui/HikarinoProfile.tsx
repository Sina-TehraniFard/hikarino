// 魔法のような体験への招待コンポーネント

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
    <div className="max-w-md w-full mb-12 space-y-8 relative">
      {/* 幻想的な背景装飾 */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-700" />
      </div>
      
      {/* 1. サービス名 - エレガントなタイポグラフィ */}
      <div className="text-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-2xl animate-pulse" />
        </div>
        <h1 className="relative text-4xl md:text-5xl font-serif bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
          Mystic Tarot
        </h1>
        <p className="text-sm text-purple-600/60 dark:text-purple-300/60 mt-2 tracking-wider">
          運命の扉を開く魔法の占い
        </p>
      </div>
      
      {/* 2. 案内人（ヒカリノ）- 神秘的な演出 */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 rounded-2xl blur-xl" />
        <div className="relative bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-purple-200/50 dark:border-purple-700/50 hover:shadow-2xl transition-all duration-500">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-300" />
              <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-white dark:ring-gray-800">
                <Image
                  src={imageSrc}
                  alt={name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-300"
                  style={{ objectPosition: "center 10%" }}
                  priority
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs">✨</span>
              </div>
            </div>
            <div>
              <p className="text-xs text-purple-600/70 dark:text-purple-300/70 tracking-wider uppercase">Your Guide</p>
              <p className="text-lg font-serif text-gray-800 dark:text-gray-100">{name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 italic">心の声を聴く占い師</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* 3. 魅惑的なメッセージ - 心に響く言葉 */}
      <div className="text-center space-y-4 relative">
        <div className="relative inline-block">
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg blur opacity-30 animate-pulse" />
          <p className="relative text-2xl md:text-3xl font-serif text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text leading-relaxed">
            今夜、運命のカードが
            <br />
            あなたを待っています
          </p>
        </div>
        
        <div className="space-y-2 text-gray-700 dark:text-gray-300">
          <p className="text-lg relative">
            <span className="inline-block w-6 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent mr-3" />
            心に秘めた答えが見つかる
            <span className="inline-block w-6 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent ml-3" />
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400 italic">
            星々が囁く、あなただけのメッセージ
          </p>
        </div>
      </div>
      
      {/* 4. 優雅な装飾要素 */}
      <div className="flex justify-center items-center gap-4 opacity-60">
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
        <div className="text-purple-400">⋆</div>
        <div className="text-pink-400">✦</div>
        <div className="text-purple-400">⋆</div>
        <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent" />
      </div>
    </div>
  );
};

export default HikarinoProfile;