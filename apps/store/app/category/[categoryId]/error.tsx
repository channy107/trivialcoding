"use client";

import { useEffect } from "react";
import { ErrorComponent } from "@repo/ui/components/service";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorComponent
      message="상품 목록을 가져오는데 실패하였습니다. 잠시만 기다려주세요."
      actionMessage="새로고침"
      actionFn={reset}
    />
  );
}
