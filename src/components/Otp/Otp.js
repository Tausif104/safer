"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/constant";
import LogoBlack from "@/assets/images/logo-black.svg";
import FormSectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCountdown, setResendCountdown] = useState(0);
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);
  const [isInitialEmailSent, setIsInitialEmailSent] = useState(false);
  const inputRefs = useRef([]);
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.email && !isInitialEmailSent) {
      sendOtpEmail();
      setIsInitialEmailSent(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  useEffect(() => {
    let timer;
    if (resendCountdown > 0) {
      timer = setTimeout(() => {
        setResendCountdown(resendCountdown - 1);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [resendCountdown]);

  const sendOtpEmail = async () => {
    if (!user?.email) {
      toast.error("No email address found. Please try again.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/common/send-email`,
        {
          type: "otpCode",
          toEmail: user.email,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("OTP sent to your email!");
        setHasEmailBeenSent(true);
        setResendCountdown(60);
      } else {
        toast.error("Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Please try again."
      );
    }
  };

  const handleResendOtp = async () => {
    if (resendCountdown > 0) return;

    setIsResending(true);
    try {
      await sendOtpEmail();
    } finally {
      setIsResending(false);
    }
  };

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/verify/otp`,
        {
          email: user.email,
          code: otp.join(""),
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("OTP verified successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("OTP verification failed:", error);
      toast.error(
        error.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div>
      {/* Logo */}
      <div className="mb-[30px]">
        <Link href="/">
          <Image className="mx-auto w-[180px]" src={LogoBlack} alt="Logo" />
        </Link>
      </div>

      {/* Title */}
      <FormSectionTitle
        alignment="center"
        title="OTP Verification"
        description="We will send you an one time password on your email"
      />

      <form onSubmit={handleSubmit}>
        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-[20px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-[48px] sm:h-[52px] md:h-[56px] w-[40px] sm:w-[45px] md:w-[50px] text-center border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-base sm:text-lg font-semibold"
            />
          ))}
        </div>

        {/* Resend OTP Section */}
        <div className="mb-[30px] text-center">
          <p className="text-sm text-gray-600 mb-2">
            Didn&apos;t receive the OTP?
          </p>
          {resendCountdown > 0 ? (
            <p className="text-sm text-gray-500">
              Resend available in {formatTime(resendCountdown)}
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-[#2563EB] hover:text-[#1d4ed8] font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending ? (
                <div className="flex items-center justify-center gap-2">
                  <Spinner size="sm" className="text-[#2563EB]" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Resend OTP"
              )}
            </button>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <Button
            type="submit"
            className="primary-btn cursor-pointer w-full"
            disabled={isSubmitting || otp.join("").length !== 6}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="text-white" />
                <span>Verifying...</span>
              </div>
            ) : (
              "Verify"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
