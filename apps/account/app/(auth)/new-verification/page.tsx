import { Suspense } from "react";
import { FullScreenLoader } from "@repo/ui/components/service";
import { NewVerificationForm } from "@auth/new-verification/_components/NewVerificationForm";

const NewVerificationPage = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <NewVerificationForm />
    </Suspense>
  );
};

export default NewVerificationPage;
