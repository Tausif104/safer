"use client"
import React, { useState, useRef } from "react";
import SectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import { FaTimes } from "react-icons/fa";

const WrongOtp = () => {
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
      <div className="h-[77px] w-[77px] bg-[#F74850] rounded-full text-white flex justify-center items-center text-[50px] mx-auto mb-[30px]">
        <FaTimes />
      </div>
      <SectionTitle alignment="center" title="Wrong OTP" description="You entered wrong OTP. Pleae try again" />
      <button type="submit" className="primary-btn cursor-pointer w-full">Try Again</button>
    </div>
  );
};

export default WrongOtp;
