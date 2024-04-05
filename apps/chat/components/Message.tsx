import { TSelectMessage } from "@/db/schema";
import { TUser } from "@/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/ui/avatar";

interface IProps {
  user: TUser;
  message: TSelectMessage;
}

const Message = ({ user, message }: IProps) => {
  const isAssistant = message.senderType === "assistant";
  const name = isAssistant ? "Chat GPT" : user.name;
  return (
    <div className="w-full my-2 min-h-[80px]">
      <div className="flex items-start gap-2">
        <Avatar>
          <AvatarImage
            src={isAssistant ? "/logo.png" : user.image}
            alt="avatar"
          />
          <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="mt-2">
          <h2 className="font-bold">{name}</h2>
          <div className="mt-2 break-words max-w-[270px] md:max-w-[400px] lg:max-w-[600px]">
            {message.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
