import { Skeleton } from "@repo/ui/components/ui/skeleton";
import SkeletonCard from "./SkeletoenCard";

const SkeletonCardList = () => {
  return (
    <div className="space-y-4">
      <Skeleton className="w-[200px] h-7" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map(() => (
          <SkeletonCard />
        ))}
      </div>
    </div>
  );
};

export default SkeletonCardList;
