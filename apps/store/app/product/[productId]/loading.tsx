"use client";

import Container from "@/components/Container";
import SkeletonCardList from "@/components/skeleton/SkeletonCardList";
import { Separator } from "@repo/ui/components/ui/separator";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Skeleton className="aspect-square h-full w-full sm:rounded-lg" />
          <div className="flex flex-col gap-3 mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Skeleton className="w-[300px] h-8" />
            <Skeleton className="w-[100px] h-8" />
            <Separator />
            <Skeleton className="w-[200px] h-8" />
            <Skeleton className="w-[200px] h-8" />
            <Skeleton className="w-[150px] h-8" />
          </div>
        </div>
        <hr className="my-10" />
        <SkeletonCardList />
      </div>
    </Container>
  );
};

export default Loading;
