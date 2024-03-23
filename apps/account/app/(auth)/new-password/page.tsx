import { Suspense } from "react";
import { NewPasswordForm } from "@auth/new-password/_components/NewPasswordForm";
import { FullScreenLoader } from "@repo/ui/components/service";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <NewPasswordForm />
    </Suspense>
  );
};

export default NewPasswordPage;
