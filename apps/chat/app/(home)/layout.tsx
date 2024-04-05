import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ChatForm from "@/components/ChatForm";
import { getConversationsByUser } from "@/actions/conversation";

const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversationsByUser();
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80">
        <Sidebar conversations={conversations} />
      </div>
      <main className="md:pl-72 h-[90%]">
        <Navbar />
        {children}
        <ChatForm />
      </main>
    </div>
  );
};

export default HomeLayout;
