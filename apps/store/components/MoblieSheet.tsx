"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/ui/sheet";

interface IProps {
  title?: string;
  content: ReactNode;
  triggerComponent: ReactNode;
}

const MobileSheet = ({ title, content, triggerComponent }: IProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{triggerComponent}</SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-5">
          <SheetTitle>{title}</SheetTitle>
        </SheetHeader>
        {content}
      </SheetContent>
    </Sheet>
  );
};

export default MobileSheet;
