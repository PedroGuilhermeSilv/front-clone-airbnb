"use client";

import { ConversationType } from "@/app/inbox/page";
import CustomButton from "../forms/CustomButton";
import React, { useEffect, useState, useRef, use } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { send } from "process";
import { MessageType } from "@/app/inbox/[id]/page";
import { UserType } from "@/app/inbox/page";
interface ConversationDetailProps {
  token: string;
  userId: string;
  conversation: ConversationType;
  messages: MessageType[];
}

const ConversationDetail: React.FC<ConversationDetailProps> = ({
  conversation,
  userId,
  token,
  messages,
}) => {
  console.log(conversation);
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const [realtimeMessages, setRealTimeMessages] = useState<MessageType[]>([]);
  const [oldMessages, setOldMessages] = useState<MessageType[]>([]);
  const myUser = conversation.users.find((user) => user.id == userId);
  const otherUser = conversation.users.find((user) => user.id !== userId);
  const { sendJsonMessage, readyState, lastJsonMessage } = useWebSocket(
    `ws://localhost:8000/ws/${conversation.id}/?token=${token}`,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("Connection state changed", readyState);
  }, [readyState]);

  useEffect(() => {
    if (
      lastJsonMessage &&
      typeof lastJsonMessage === "object" &&
      "name" in lastJsonMessage &&
      "body" in lastJsonMessage
    ) {
      const message: MessageType = {
        id: "",
        name: lastJsonMessage.name as string,
        body: lastJsonMessage.body as string,
        conversationId: conversation.id,
        sent_to: otherUser as UserType,
        created_by: myUser as UserType,
      };
      setRealTimeMessages((realtimeMessages) => [...realtimeMessages, message]);
    }
  }, [lastJsonMessage]);
  const sendMessage = async () => {
    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage,
        name: myUser?.name,
        sent_to_id: otherUser?.id,
        conversation_id: conversation.id,
      },
    });

    setNewMessage("");

    setTimeout(() => {
      scrollToBottom();
    }, 50);
  };
  const scrollToBottom = () => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  };
  return (
    <>
      <div
        ref={messagesDiv}
        className=" h-max[400px] flex flex-col overflow-auto space-y-4"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] px-6 py-4 rounded-xl ${
              message.created_by.name === myUser?.name
                ? "ml-[20%] bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            <p className="font-bold text-gray-500">{message.created_by.name}</p>
            <p>{message.body}</p>
          </div>
        ))}
        {realtimeMessages.map((message, index) => (
          <div
            key={index}
            className={`w-[80%] px-6 py-4 rounded-xl ${
              message.name == myUser?.name
                ? "ml-[20%] bg-blue-200"
                : "bg-gray-200"
            }`}
          >
            <p className="font-bold text-gray-500">{message.name}</p>
            <p>{message.body}</p>
          </div>
        ))}
      </div>
      <div className=" justify-between mt-4 py-4 px-6 flex border border-gray-300 rounded-xl p-2">
        <input
          type="text"
          placeholder="Type your message..."
          className=" bg-gray-200 w-full p-2 mr-2 rounded-xl"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <CustomButton className="w-20" label="send" onClick={sendMessage} />
      </div>
    </>
  );
};

export default ConversationDetail;
