import Image from "next/image";

const Empty = () => {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-4">
      <Image src={"/logo.png"} width={50} height={50} alt="empty" />
      <h3 className="text-2xl font-bold">무엇을 도와드릴까요?</h3>
    </div>
  );
};

export default Empty;
