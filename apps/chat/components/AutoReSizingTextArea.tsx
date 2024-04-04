import { useRef, useEffect, TextareaHTMLAttributes } from "react";

import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className: string;
}

const AutoResizingTextarea = (props: IProps) => {
  const { className, value, ...others } = props;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      ref={textareaRef}
      className={cn(
        "resize-none overflow-auto min-h-[20px] max-h-[300px]",
        className
      )}
      {...others}
    />
  );
};

export default AutoResizingTextarea;
