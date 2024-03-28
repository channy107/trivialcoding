import { Skeleton } from "@repo/ui/components/ui/skeleton";

const SkeletonCartItem = () => {
  return (
    <div className="flex py-4">
      <div className="h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Skeleton className="w-full h-full" />
      </div>
      <div className="ml-4 flex flex-1 flex-col gap-3">
        <Skeleton className="w-[180px] h-8 lg:w-[300px]" />
        <Skeleton className="w-[130px] h-8 lg:w-[200px]" />
      </div>
    </div>
  );
};

export default SkeletonCartItem;
