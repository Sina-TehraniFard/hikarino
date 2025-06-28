// ステップガイドコンポーネント - 不安解消のための目立つデザイン

import Image from "next/image";
import { useState } from "react";

const AppIntro = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className="mb-8 w-full max-w-md relative">
      {/* 統合されたステップガイド */}

        {/* ヘッダー */}
        <div className="mb-5">
          {/* プレミアムヘッダーデザイン */}
          <div className="relative group">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="relative w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white pl-20 pr-4 py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-between overflow-hidden z-10"
            >
              {/* ヒカリノのアイコン（ボタン内左端に統合） */}
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-purple-700 to-transparent">
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/30 bg-white/20 backdrop-blur-sm">
                      <Image
                        src="/hikarino-normal.png"
                        alt="ヒカリノ"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover object-top"
                        style={{ objectPosition: "center 10%" }}
                        priority
                      />
                    </div>
                    {/* キラキラバッジ */}
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center shadow-sm animate-pulse">
                      <span className="text-purple-600 text-[10px] font-bold">✨</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="text-xs font-bold tracking-wide leading-tight">ヒカリノが教える<br />はじめての簡単４ステップ</span>

              <div className="flex items-center gap-2">
                {/* キラキラエフェクト */}
                <span className="text-white/60 text-xs animate-pulse">✨</span>
                <svg
                  className={`w-4 h-4 transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* ホバー時のオーバーレイ効果 */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* 装飾的なグロウエフェクト */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-indigo-600/30 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
          </div>
        </div>

        {/* ステップ（ドロップダウンアニメーション） */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                1
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">質問を入力</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">100文字以内で占いたいことを書く</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                2
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">タロットカードを引く</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">3枚のタロットカードが裏面で表示されます</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                3
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">カードをめくる</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">カードをタップして表に返してください</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0 shadow-md">
                4
              </div>
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-200">結果を見る</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">ヒカリノがタロットを読んでくれます</p>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default AppIntro;