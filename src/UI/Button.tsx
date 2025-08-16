import React from "react";

// Типы для кнопки
export interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "landing" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "xl";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  title?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  leftIcon,
  rightIcon,
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = "button",
  className = "",
  title,
}) => {
  // Базовые классы
  const baseClasses =
    "relative inline-flex items-center justify-center text-[16px] font-regular rounded-[16px] transition-all duration-200 cursor-pointer outline-none focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  // Классы для размеров
  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm gap-1.5",
    md: "px-4 py-2 text-sm gap-3",
    lg: "px-6 py-3 text-base gap-2.5",
    xl: "px-8 py-4 text-lg gap-3",
  };

  // Классы для вариантов
  const variantClasses = {
    primary:
      "bg-primary text-white hover:bg-primary/80 shadow-sm hover:shadow-md",
    secondary:
      "bg-background text-white hover:bg-gray-700 shadow-sm hover:shadow-md",
    dark: "bg-background text-white hover:bg-background/50",
    outline:
      "border-1 border-background text-white hover:bg-background/20 bg-transparent",
    landing:
      "border-1 border-surface text-change hover:bg-background/20 bg-transparent hover:shadow-[0_0px_8px_0px_#8077FF]",
    ghost: "text-blue-600 hover:bg-blue-50 bg-transparent",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md",
  };

  const widthClasses = fullWidth ? "w-full" : "";

  const buttonClasses = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    widthClasses,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const LoadingIcon = () => (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
      title={title}
    >
      {loading ? (
        <LoadingIcon />
      ) : (
        <>
          {leftIcon && leftIcon}
          {children}
          {rightIcon && rightIcon}
        </>
      )}
    </button>
  );
};

export default Button;
