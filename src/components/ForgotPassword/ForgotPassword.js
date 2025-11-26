"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "@/assets/images/logo-black.svg";
import SectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import { HiOutlineEnvelope } from "react-icons/hi2";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [returnTo, setReturnTo] = useState("/login-premises");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const returnToParam = searchParams.get("returnTo");
    if (returnToParam) {
      const returnPath = `/${returnToParam}`;
      setReturnTo(returnPath);
      // Store in sessionStorage so it's available when user comes back from email
      if (typeof window !== "undefined") {
        sessionStorage.setItem("forgot_password_return", returnPath);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      email: e.target.email.value,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/forgot-password`,
        formData
      );

      setEmailSent(true);
      toast.success(
        response.data?.message ||
          "If an account exists with this email, you will receive a password reset link shortly."
      );
    } catch (error) {
      console.error("Forgot password failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to send reset email. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="text-center">
        <div className="mb-[25px] sm:mb-[30px]">
          <Link href="/">
            <Image
              className="mx-auto w-[180px] lg:w-[180px]"
              src={LogoBlack}
              alt=""
            />
          </Link>
        </div>
        <SectionTitle
          alignment="center"
          title="Check Your Email"
          description="We've sent a password reset link to your email address. Please check your inbox and follow the instructions."
        />
        <div className="mt-[30px] space-y-4">
          <p className="text-[#374151] text-[16px]">
            Didn&apos;t receive the email? Check your spam folder or try again.
          </p>
          <Button
            onClick={() => setEmailSent(false)}
            className="primary-btn w-full"
          >
            Try Again
          </Button>
          <p className="text-[16px]">
            <Link href={returnTo} className="text-[#2563EB]">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="mb-[25px] sm:mb-[30px]">
        <Link href="/">
          <Image
            className="mx-auto w-[180px] lg:w-[180px]"
            src={LogoBlack}
            alt=""
          />
        </Link>
      </div>
      <SectionTitle
        alignment="center"
        title="Forgot Password?"
        description="Enter your email address and we'll send you a link to reset your password."
      />
      <form onSubmit={handleSubmit}>
        <div className="relative mb-[30px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <HiOutlineEnvelope />
          </span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            className="pl-[45px]"
            required
          />
        </div>
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <Button
            type="submit"
            className="primary-btn w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="text-white" />
                <span>Sending...</span>
              </div>
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </div>
        <p className="mb-[30px] sm:mb-[15px]">
          Remember your password?{" "}
          <Link href={returnTo} className="text-[#2563EB]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPassword;
