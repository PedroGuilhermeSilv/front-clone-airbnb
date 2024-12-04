"use client";
import React from "react";
import useAddPropertyModal from "../hooks/useAddPropertyModal";
import useLoginModal from "../hooks/useLoginModal";

interface AddPropertyButtonProps {
  userId?: string | null;
}

const AddPropertyButton: React.FC<AddPropertyButtonProps> = ({ userId }) => {
  const loginModal = useLoginModal();
  const addPropertyModal = useAddPropertyModal();
  const airbnbModal = () => {
    if (!userId) {
      loginModal.open();
    } else {
      addPropertyModal.open();
    }
  };
  return (
    <div
      onClick={airbnbModal}
      className="p-2 text-sm cursor-pointer font-semibold rounded-full hover:bg-gray-200"
    >
      Djangobnb your home
    </div>
  );
};

export default AddPropertyButton;
