// ユーザー情報表示コンポーネント

import { User } from "@/types";

interface UserInfoProps {
  user: User;
  displayCoins: number;
}

const UserInfo: React.FC<UserInfoProps> = ({ user, displayCoins }) => {
  return (
    <div className="w-full flex justify-end items-center text-gray-700 font-medium text-base p-2 gap-4">
      <span>{(user.displayName || user.email) + ' さん'}</span>
      {/*
        【重要】コイン残高はサービス全体でAI解釈ごとに100コイン消費など、今後も多用途で利用される予定です。
        coinsがnullの場合は0として常に表示し、ユーザーに一貫した体験を提供します。
        今後コインの取得・消費ロジックを拡張する際も、この表示仕様を守ってください。
        コイン残高はCoinContextでグローバル管理されています。
      */}
      <span>🪙 {typeof displayCoins === 'number' ? displayCoins : 0} コイン</span>
    </div>
  );
};

export default UserInfo;