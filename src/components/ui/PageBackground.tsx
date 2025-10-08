import { memo } from 'react';

// 共通ページ背景コンポーネント - シンプル版

const PageBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-20">
      {/* シンプルな静的グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50" />
    </div>
  );
});

PageBackground.displayName = 'PageBackground';

export default PageBackground;