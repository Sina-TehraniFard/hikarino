// ユーザー情報表示コンポーネント

import { User } from "@/types";
import Image from "next/image";

interface UserInfoProps {
  user: User;
  displayCoins: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, displayCoins }) => {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border-b border-purple-200 dark:border-purple-900/20">
      <div className="max-w-lg mx-auto px-6">
        <div className="flex justify-between items-center py-1 md:py-2">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-full flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-sm md:text-base">
                {(user.displayName || user.email || '').charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-gray-900 dark:text-gray-100 font-medium text-sm md:text-base truncate max-w-[150px] md:max-w-[200px]">
              {(user.displayName || user.email) + ' さん'}
            </span>
          </div>
          {/*
            【重要】コイン残高はサービス全体でAI解釈ごとに100コイン消費など、今後も多用途で利用される予定です。
            coinsがnullの場合は0として常に表示し、ユーザーに一貫した体験を提供します。
            今後コインの取得・消費ロジックを拡張する際も、この表示仕様を守ってください。
            コイン残高はCoinContextでグローバル管理されています。
          */}
          <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-1.5 rounded-full shadow-sm border border-purple-200 dark:border-purple-700 hover:shadow-md transition-all duration-200">
            <div className="w-6 h-6 relative animate-pulse">
              <Image
                src="/coin-icon.svg"
                alt="コイン"
                width={24}
                height={24}
                className="w-full h-full"
              />
            </div>
            <span className="font-bold text-purple-600 dark:text-purple-400 text-base md:text-lg">
              {typeof displayCoins === 'number' ? displayCoins.toLocaleString() : 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;