import { MouseEventHandler } from "react";
import { cn } from "@repo/ui/lib/utils";

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  icon: React.ReactNode;
  className?: string;
}

const IconButton = ({ onClick, icon, className }: IProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full flex items-center justify-center bg-white border shadow-md p-2 hover:scale-110 transition",
        className
      )}
    >
      {icon}
    </button>
  );
};

export default IconButton;
