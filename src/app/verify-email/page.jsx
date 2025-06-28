import EmailVerification from "@/components/EmailVerification/EmailVerification";
import React, { Suspense } from "react";

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center px-[20px] bg-[#F8F9FB] sm:bg-[#F9FFE7]">
      <div className="bg-[#F8F9FB] sm:bg-white w-[566px] sm:p-[40px] sm:rounded-[16px] mx-auto max-w-full md:my-8 mt-[30px] sm:mt-0">
        <Suspense
          fallback={
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#99C729] mx-auto mb-4"></div>
                <p className="text-[#707B8A]">Loading...</p>
              </div>
            </div>
          }
        >
          <EmailVerification />
        </Suspense>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
