"use client";

import apiService from "@/app/service/apiService";
import useLoginModal from "../hooks/useLoginModal";
import React from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/app/lib/actions";

interface ContactButtonProps {
  userId?: string;
  landlord_id: string;
}

interface Response {
  conversation_id: string;
  sucess: boolean;
}

const ContactButton: React.FC<ContactButtonProps> = ({
  userId,
  landlord_id,
}) => {
  const longiModel = useLoginModal();
  const router = useRouter();
  let token: string | undefined;

  const startConversation = async () => {
    token = await getAccessToken();
    if (userId) {
      const response = await apiService.get<Response>(`/api/chat/start/${landlord_id}/`);
      if (response.data.conversation_id) {
        router.push(`/inbox/${response.data.conversation_id}`);
      }
    } else {
      longiModel.open();
    }
  };
  return (
    <button
      onClick={startConversation}
      className="transition cursor-pointer mt-6 p-3 pl-5 pr-5 text-white bg-airbnb rounded-lg hover:bg-airbnb-dark"
    >
      Contact
    </button>
  );
};

export default ContactButton;
