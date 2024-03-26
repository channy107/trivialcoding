"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
});

interface IProps {
  value?: string | number;
}

const Currency = ({ value = 0 }: IProps) => {
  //   const [isMounted, setIsMounted] = useState(false);

  //   useEffect(() => {
  //     setIsMounted(true);
  //   }, []);

  //   if (!isMounted) {
  //     return null;
  //   }

  return <div className="font-semibold">{formatter.format(Number(value))}</div>;
};

export default Currency;
