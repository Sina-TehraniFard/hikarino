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
  const baseClasses = "relative font-medium rounded-xl transition-all duration-200 transform hover:scale-102 active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed group";
  
  const variantClasses = {
    primary: "bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg",
    secondary: "bg-white dark:bg-gray-800 border border-purple-300 dark:border-purple-700 text-purple-600 dark:text-purple-400 hover:border-purple-400 dark:hover:border-purple-600",
  };
  
  const sizeClasses = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-base",
    large: "px-8 py-4 text-lg",
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
      {/* シンプルなホバーエフェクト */}
      {variant === "primary" && (
        <span className="absolute inset-0 bg-gradient-to-t from-purple-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      )}
      
      {/* ボタンテキスト */}
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
};

export default Button;