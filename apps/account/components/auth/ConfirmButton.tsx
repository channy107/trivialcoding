import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import { Button } from "@repo/ui/components/ui/button";

interface Props {
  disabled: boolean;
  buttonText: ReactNode;
  isPending: boolean;
}

const ConfirmButton = ({ disabled, isPending, buttonText }: Props) => {
  return (
    <Button disabled={disabled} type="submit" className="w-full">
      {isPending ? (
        <>
          <ClipLoader size={15} color="#fff" className="mr-2" />
        </>
      ) : (
        <>{buttonText}</>
      )}
    </Button>
  );
};

export default ConfirmButton;
