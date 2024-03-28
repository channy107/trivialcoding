import { Skeleton } from "@repo/ui/components/ui/skeleton";

const SkeletonCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="aspect-[2/1] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px] lg:w-[150px]" />
        <Skeleton className="h-4 w-[220px] lg:w-[120px]" />
      </div>
    </div>
  );
};

export default SkeletonCard;
