import ForgotPassword from "@/components/ForgotPassword/ForgotPassword";
import React, { Suspense } from "react";
import { Spinner } from "@/components/ui/spinner";

const ForgotPasswordPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-10">
          <Spinner size="lg" />
        </div>
      }
    >
      <ForgotPassword />
    </Suspense>
  );
};

export default ForgotPasswordPage;
