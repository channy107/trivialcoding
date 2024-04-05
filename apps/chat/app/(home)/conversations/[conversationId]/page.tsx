import Message from "@/components/Message";
import { getMessagesByConversation } from "@/actions/conversation";
import { getCurrentUser } from "@/actions/user";

interface IProps {
  params: {
    conversationId: string;
  };
}

const ConversationPage = async ({ params }: IProps) => {
  const user = await getCurrentUser();
  const messages = await getMessagesByConversation(params.conversationId);

  return (
    // TODO 사용자가 입력했을 때 API 모두 완료 후 이동하는 것에 대해 개선
    <div className="mx-auto w-[350px] md:w-[500px] lg:w-[720px] mt-[80px]">
      {messages?.map((message) => (
        <Message key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};

export default ConversationPage;
