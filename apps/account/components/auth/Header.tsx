import { Poppins } from "next/font/google";
import { cn } from "@repo/ui/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface Props {
  title: string;
  description: string;
}

export const Header = ({ title, description }: Props) => {
  return (
    <div className="w-full flex flex-col gap-y-4 items-center justify-center">
      <h1 className={cn("text-2xl font-semibold", font.className)}>{title}</h1>
      <p className="text-muted-foreground text-center text-sm whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
};
