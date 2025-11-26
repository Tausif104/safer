import ResetPassword from "@/components/ResetPassword/ResetPassword";
import React, { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const ResetPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10">
          <Spinner size="lg" />
        </div>
      }
    >
      <ResetPassword />
    </Suspense>
  );
};

export default ResetPasswordPage;
