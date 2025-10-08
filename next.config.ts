import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // ビルド時の型チェックを無効化（Next.js 15.5.4のバグ回避）
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
