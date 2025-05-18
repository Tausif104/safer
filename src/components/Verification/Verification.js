"use client";
import React from "react";
import Image from "next/image";
import SuccessEmail from "@/assets/images/success-email.svg";
import SectionTitle from "../FormSectionTitle/FormSectionTitle";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

const Verification = ({ queryData }) => {
  const { signingUpEmail } = useAuthStore();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (queryData.type === "premise") {
      router.push("/pricing");
    } else {
      router.push("/registration");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Image className="mx-auto mb-[30px]" src={SuccessEmail} alt="" />
      <SectionTitle
        alignment="center"
        title="Email Verification"
        description={
          signingUpEmail
            ? `Please check your email inbox at "${signingUpEmail}"`
            : "Please check your email inbox"
        }
      />
      <button type="submit" className="primary-btn cursor-pointer w-full">
        Verify Your Email
      </button>
    </form>
  );
};

export default Verification;
