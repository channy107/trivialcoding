import { Suspense } from "react";
import { LoginForm } from "@auth/login/_components/LoginForm";
import { FullScreenLoader } from "@repo/ui/components/service";

const LoginPage = () => {
  return (
    <Suspense fallback={<FullScreenLoader />}>
      <LoginForm />
    </Suspense>
  );
};

export default LoginPage;
