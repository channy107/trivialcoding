import { Suspense } from "react";
import { RegisterForm } from "@auth/register/_components/RegisterForm";
import { FullScreenLoader } from "@repo/ui/components/service";

const RegisterPage = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <RegisterForm />
    </Suspense>
  );
};

export default RegisterPage;
