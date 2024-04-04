import ChatForm from "./_components/ChatForm";
import Empty from "@/components/Empty";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-between w-full h-[90%]">
      <div className="flex-1">
        <Empty />
      </div>
      <ChatForm />
    </div>
  );
};

export default HomePage;
