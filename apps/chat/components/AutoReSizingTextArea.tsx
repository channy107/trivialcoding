import {
  useRef,
  useEffect,
  TextareaHTMLAttributes,
  forwardRef,
  useImperativeHandle,
} from "react";

import { Textarea } from "@repo/ui/components/ui/textarea";
import { cn } from "@repo/ui/lib/utils";

interface IProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
}

const AutoResizingTextarea = forwardRef<HTMLTextAreaElement, IProps>(
  (props, ref) => {
    const { className, ...others } = props;
    const innerRef = useRef<HTMLTextAreaElement>(null);

    useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement, []);

    useEffect(() => {
      if (innerRef.current) {
        innerRef.current.style.height = "inherit";
        innerRef.current.style.height = `${innerRef.current.scrollHeight}px`;
      }
    }, [props.value]);

    return (
      <Textarea
        ref={innerRef}
        className={cn(
          "resize-none overflow-auto min-h-[20px] max-h-[300px]",
          className
        )}
        {...others}
      />
    );
  }
);

export default AutoResizingTextarea;
