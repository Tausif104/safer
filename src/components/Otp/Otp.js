"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "@/assets/images/logo-black.svg";
import FormSectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const { user } = useAuthStore();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // Only allow numbers

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      email: user.email,
      otp: otp.join(""),
    };
    setIsSubmitting(false);
    router.push("/dashboard");
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
        description="We will send you an one time password on this Email"
      />

      <form onSubmit={handleSubmit}>
        {/* OTP Inputs */}
        <div className="flex justify-center gap-4 mb-[20px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="h-[52px] sm:h-[56px] text-center"
            />
          ))}
        </div>

        {/* Resend OTP Link */}
        <p className="mb-[30px]">
          Didn&apos;t receive the OTP?{" "}
          <Link href="#" className="text-[#2563EB]">
            Resend OTP
          </Link>
        </p>

        {/* Submit Button */}
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <Button
            type="submit"
            className="primary-btn cursor-pointer w-full"
            disabled={isSubmitting}
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
