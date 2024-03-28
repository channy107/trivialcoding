"use client";

import Container from "@/components/Container";
import SkeletonCardList from "@/components/skeleton/SkeletonCardList";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl aspect-square md:aspect-[2/1]">
          <Skeleton className="w-full h-full " />
        </div>
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <SkeletonCardList />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
