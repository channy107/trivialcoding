"use client";

import Container from "@/components/Container";

import SkeletonCartItem from "@/components/skeleton/SkeletonCartItem";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const Loading = () => {
  return (
    <Container>
      <div className="px-4 py-16 sm:px-6 lg:px-8">
        <Skeleton className="w-[300px] h-8" />
        <div className="mt-9 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
          <div className="lg:col-span-7">
            <SkeletonCartItem />
          </div>
          <Skeleton className="mt-4 w-[300px] lg:w-[400px] h-[200px]" />
        </div>
      </div>
    </Container>
  );
};

export default Loading;
