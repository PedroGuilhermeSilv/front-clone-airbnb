"use client";
import { ConversationType } from "@/app/inbox/page";
import React from "react";
import { useRouter } from "next/navigation";

interface ConversationProps {
  userId: string;
  conversation: ConversationType;
}

const Conversation: React.FC<ConversationProps> = ({
  userId,
  conversation,
}) => {
  const router = useRouter();
  const otherUser = conversation.users.find((user) => user.id !== userId);
  return (
    <div className="border border-gray-300 rounded-xl p-6 cursor-pointer ">
      <p className="text-xl font-medium pb-5"> {otherUser?.name}</p>
      <p
        onClick={() => {
          router.push(`/inbox/${conversation.id}`);
        }}
        className="text-xl text-airbnb"
      >
        Go to conversation
      </p>
    </div>
  );
};

export default Conversation;
