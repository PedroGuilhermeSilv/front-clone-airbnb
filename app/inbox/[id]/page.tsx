import ConversationDetail from "@/app/components/inbox/ConversationDetail";
import { getUserId } from "@/app/lib/actions";
import { ConversationType, UserType } from "../page";
import apiService from "@/app/service/apiService";
import { getAccessToken } from "@/app/lib/actions";

export type MessageType = {
  id: string;
  name: string;
  body: string;
  conversationId: string;
  sent_to: UserType;
  created_by: UserType;
};


export type ResponseMessageType = {
conversation: ConversationType;
messages: MessageType[]
}
const ConversationPage = async ({ params }: { params: { id: string } }) => {
  const userId = await getUserId();
  const token = await getAccessToken();
  if (!userId || !token) {
    return (
      <main className="max-w-[1500px] max-auto px-6 py-12">
        <div className="text-center">
          <p className="text-2xl font-medium">
            Please login to view your chat.
          </p>
        </div>
      </main>
    );
  }
  const conversation = await apiService.get<ResponseMessageType>(`/api/chat/${params.id}`);
  () => {};
  return (
    <>
      <main className="max-w-[1500px]  mx-auto px-6 pb-6">
        <ConversationDetail
          token={token}
          userId={userId}
          messages={conversation.data.messages}
          conversation={conversation.data.conversation}
        />
      </main>
      ;
    </>
  );
};

export default ConversationPage;
