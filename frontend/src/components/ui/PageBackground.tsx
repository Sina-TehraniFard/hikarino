import { memo } from "react";
import Image from "next/image";

// 共通ページ背景コンポーネント

const PageBackground = memo(() => {
  return (
    <div className="fixed inset-0 -z-20">
      {/* 背景画像 */}
      <Image
        src="/hikarino-bg.jpg"
        alt=""
        fill
        priority
        quality={90}
        className="object-cover"
      />
    </div>
  );
});

PageBackground.displayName = "PageBackground";

export default PageBackground;
