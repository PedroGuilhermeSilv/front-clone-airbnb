import React from "react";

interface CustomButtonProps {
  label: string;
  className?: string;
  onClick: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onClick, className }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-airbnb w-full rounded-xl px-4 py-2 text-center hover:bg-airbnb-dark text-white transition ${className}`}
    >
      {label}
    </div>
  );
};

export default CustomButton;
