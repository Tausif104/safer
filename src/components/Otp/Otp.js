"use client"
import React, { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "@/assets/images/logo-black.svg";
import FormSectionTitle from "@/components/FormSectionTitle/FormSectionTitle";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

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

  return (
    <div>
      {/* Logo */}
      <div className="mb-[30px]">
        <Link href="/">
          <Image className="mx-auto w-[180px]" src={LogoBlack} alt="Logo" />
        </Link>
      </div>

      {/* Title */}
      <FormSectionTitle alignment="center" title="OTP Verification" description="Enter the 4-digit code sent to your email" />

      <form action="#">
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
          Didn’t receive the OTP? <Link href="#" className="text-[#2563EB]">Resend OTP</Link>
        </p>

        {/* Submit Button */}
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <button type="submit" className="primary-btn cursor-pointer w-full">Verify</button>
        </div>
      </form>
    </div>
  );
};

export default Otp;
