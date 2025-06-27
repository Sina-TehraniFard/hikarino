// 再利用可能なボタンコンポーネント

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  fullWidth?: boolean;
  className?: string;
}

const Button = ({
  children,
  onClick,
  disabled = false,
  variant = "primary",
  size = "medium",
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  const baseClasses = "relative font-serif rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden group";
  
  const variantClasses = {
    primary: "bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white shadow-lg hover:shadow-2xl",
    secondary: "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:border-purple-400 dark:hover:border-purple-600",
  };
  
  const sizeClasses = {
    small: "px-6 py-2.5 text-sm",
    medium: "px-8 py-3.5 text-base",
    large: "px-10 py-4.5 text-lg",
  };
  
  const widthClasses = fullWidth ? "w-full max-w-md" : "";
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    widthClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {/* 魔法のような背景エフェクト */}
      {variant === "primary" && (
        <>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300" />
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
        </>
      )}
      
      {/* きらめきエフェクト */}
      <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-sparkle" />
      <span className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-white rounded-full opacity-0 group-hover:opacity-50 group-hover:animate-sparkle delay-300" />
      
      {/* ボタンテキスト */}
      <span className="relative z-10 flex items-center justify-center gap-2">
        {variant === "primary" && <span className="text-lg">✨</span>}
        {children}
        {variant === "primary" && <span className="text-lg">✨</span>}
      </span>
    </button>
  );
};

export default Button;