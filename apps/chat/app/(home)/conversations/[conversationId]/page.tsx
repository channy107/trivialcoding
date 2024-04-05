import { getMessagesByConversation } from "@/actions/conversation";
import { getCurrentUser } from "@/actions/user";
import { TMessage } from "@/types";
import Message from "@/components/Message";

interface IProps {
  params: {
    conversationId: string;
  };
}

const dummy: TMessage[] = [
  { id: "1", content: "안녕?", senderType: "user" },
  {
    id: "2",
    content: "안녕하세요. 반가워요, 무엇을 도와드릴까요?",
    senderType: "system",
  },
  {
    id: "3",
    content: "너의 이름은 뭐니?",
    senderType: "user",
  },
  {
    id: "4",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
  {
    id: "5",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
  {
    id: "6",
    content:
      "전 chat gpt 에요dfdsafsfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfafasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfad",
    senderType: "system",
  },
  {
    id: "7",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
  {
    id: "8",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
  {
    id: "9",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
  {
    id: "10",
    content: "전 chat gpt 에요",
    senderType: "system",
  },
];

const ConversationPage = async ({ params }: IProps) => {
  const user = await getCurrentUser();

  //   const messages = await getMessagesByConversation(params.conversationId);

  return (
    <div className="mx-auto w-[350px] md:w-[500px] lg:w-[720px] h-[90%]">
      {dummy.map((message) => (
        <Message key={message.id} message={message} user={user} />
      ))}
    </div>
  );
};

export default ConversationPage;
