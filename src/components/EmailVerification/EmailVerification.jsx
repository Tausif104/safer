"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL, USER_ROLE } from "@/config/constant";
import SectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import { Spinner } from "@/components/ui/spinner";
import LogoBlack from "@/assets/images/logo-black.svg";
import SuccessEmail2 from "@/assets/images/success-email2.svg";
import Warning from "@/assets/images/warning.svg";

const EmailVerification = () => {
  const [verificationState, setVerificationState] = useState("loading");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const userType = searchParams.get("userType");

  useEffect(() => {
    if (token) {
      verifyEmail();
    } else {
      setVerificationState("error");
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      setVerificationState("loading");

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/verify/email`,
        { token }
      );

      if (response.status === 200 || response.status === 201) {
        setVerificationState("success");
        toast.success("Email verified successfully!");
      } else {
        setVerificationState("error");
        toast.error("Email verification failed. Please try again.");
      }
    } catch (error) {
      console.error("Email verification failed:", error);
      setVerificationState("error");
      toast.error(
        error.response?.data?.message ||
          "Email verification failed. Please try again."
      );
    }
  };

  const handleContinue = (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    if (userType === USER_ROLE.PHARMACY) {
      router.push("/pricing");
    } else {
      router.push("/registration");
    }
  };

  const handleGoHome = () => {
    router.push("/");
  };

  const renderContent = () => {
    switch (verificationState) {
      case "loading":
        return (
          <div className="text-center">
            <div className="flex justify-center mb-[30px]">
              <Spinner className="h-[50px] w-[50px] text-[#99C729]" />
            </div>
            <SectionTitle
              alignment="center"
              title="Verifying Your Email"
              description="Please wait while we verify your email address..."
            />
          </div>
        );

      case "success":
        return (
          <div className="text-center">
            <Image
              className="mx-auto mb-[30px]"
              src={SuccessEmail2}
              alt="Success"
            />
            <SectionTitle
              alignment="center"
              title="Email Verified Successfully!"
              description="Your email has been verified. You can now proceed to access your account."
            />
            <button
              type="button"
              onClick={handleContinue}
              disabled={isSubmitting}
              className="primary-btn cursor-pointer w-full flex items-center justify-center gap-2"
            >
              {isSubmitting ? <Spinner className="h-[16px] w-[16px]" /> : null}
              Continue
            </button>
          </div>
        );

      case "error":
        return (
          <div className="text-center">
            <Image className="mx-auto mb-[30px]" src={Warning} alt="Error" />
            <SectionTitle
              alignment="center"
              title="Email Verification Failed"
              description="We couldn't verify your email. The verification link may have expired or is invalid."
            />
            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoHome}
                className="primary-btn cursor-pointer w-full"
              >
                Go to Home Page
              </button>
              <div className="text-center text-sm text-[#707B8A]">
                <p className="mb-2">Need help?</p>
                <p>
                  Please contact our admin team for assistance at{" "}
                  <a
                    href="mailto:admin@saferx.co.uk"
                    className="text-[#3B82F6] underline"
                  >
                    admin@saferx.co.uk
                  </a>
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="text-center mx-10 my-5">
      <div className="mb-[25px] sm:mb-[30px]">
        <Link href="/">
          <Image
            className="mx-auto w-[180px] lg:w-[180px]"
            src={LogoBlack}
            alt="SafeRx Logo"
          />
        </Link>
      </div>
      {renderContent()}
    </div>
  );
};

export default EmailVerification;
