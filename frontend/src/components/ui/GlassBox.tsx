// 共通ガラスボックスコンポーネント - エレガントで洗練されたデザイン

import { ReactNode, HTMLAttributes } from "react";

interface GlassBoxProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  focusable?: boolean;
}

const GlassBox = ({
  children,
  className = "",
  onClick,
  disabled = false,
  focusable = false,
  ...props
}: GlassBoxProps) => {
  const baseStyles = `
    relative w-full
    ${
      disabled
        ? "bg-white/40 cursor-not-allowed border border-white/20"
        : "bg-white/20 border border-white/30 hover:bg-white/30 ring-1 ring-white/20"
    }
    backdrop-blur-xl
    rounded-2xl
    transition-all duration-300
    overflow-hidden
    ${onClick && !disabled ? "cursor-pointer group" : ""}
  `;

  return (
    <div
      className={`${baseStyles} ${className}`}
      onClick={disabled ? undefined : onClick}
      {...props}
    >
      {children}

      {/* エレガントなホバーエフェクト（clickableのみ） */}
      {onClick && !disabled && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
      )}

      {/* エレガントなグロウエフェクト（clickableのみ） */}
      {onClick && !disabled && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      )}

      {/* 優しいフォーカスエフェクト（focusableのみ） */}
      {focusable && !disabled && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-purple-400/10 rounded-2xl blur-md opacity-0 focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
      )}
    </div>
  );
};

export default GlassBox;
