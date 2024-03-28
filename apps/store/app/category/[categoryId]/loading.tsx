"use client";

import Container from "@/components/Container";
import SkeletonCardList from "@/components/skeleton/SkeletonCardList";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="mt-10">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            <div className="hidden lg:block">
              <div className="mb-8">
                <Skeleton className="w-[100px] h-5" />
                <hr className="my-4" />
                <ul className="flex flex-col gap-4">
                  {Array.from({ length: 4 }).map(() => (
                    <Skeleton className="w-[150px] h-5" />
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 lg:col-span-4 lg:mt-0">
              <SkeletonCardList />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Loading;
