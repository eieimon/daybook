import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode; // Optional icon prop
};

const ButtonWidget = ({
  label,
  onClick,
  disabled,
  className,
  icon,
}: ButtonProps) => {
  return (
    <button
      type="button"
      className={`flex items-center px-4 py-2 bg-daybook-primary text-white rounded-2xl text-xs-custom cursor-pointer hover:bg-primary-dark ease-in-out duration-300 ${className || ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label}
    </button>
  );
};

export default ButtonWidget;
