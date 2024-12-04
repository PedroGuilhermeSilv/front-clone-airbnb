"use client";

interface MenuLinkProps {
  label: string;
  onClick: () => void;
}

const MenuLink: React.FC<MenuLinkProps> = ({ label, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="p-4 rounded-xl hover:bg-gray-300 transition cursor-pointer"
    >
      {label}
    </div>
  );
};

export default MenuLink;
