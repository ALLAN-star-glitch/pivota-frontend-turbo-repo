import { ReactNode } from "react";

interface PrimaryButtonProps {
  children?: ReactNode;
  className?: string;
  onClick?: () => void;
  icon?: ReactNode; // optional icon prop
}

export function PrimaryButton({ children, className = '', onClick, icon }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        bg-teal-600 text-white font-semibold rounded-full 
        px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 
        text-sm sm:text-base md:text-lg 
        shadow-md hover:shadow-lg hover:bg-teal-500 
        transition-all duration-300 transform hover:-translate-y-0.5 
        active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-1
        flex items-center justify-center gap-2
        min-w-[100px] sm:min-w-[120px] md:min-w-[140px]
        whitespace-nowrap
        ${className}
      `}
    >
      {icon && <span className="flex items-center">{icon}</span>}
      {children}
    </button>
  );
}
