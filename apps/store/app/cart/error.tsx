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
      message="장바구니를 가져오는데 실패하였습니다. 잠시만 기다려주세요."
      actionMessage="새로고침"
      actionFn={reset}
    />
  );
}
