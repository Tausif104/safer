"use client";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/config/constant";
import SuccessEmail from "@/assets/images/success-email.svg";
import SectionTitle from "../FormSectionTitle/FormSectionTitle";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/useAuthStore";

const Verification = ({ queryData }) => {
  const { signingUpEmail } = useAuthStore();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [hasEmailBeenSent, setHasEmailBeenSent] = useState(false);

  const handleSendEmail = async (e) => {
    e.preventDefault();

    if (!signingUpEmail) {
      toast.error("No email address found. Please try again.");
      return;
    }

    setIsSendingEmail(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/common/send-email`,
        {
          type: "verifyEmail",
          toEmail: signingUpEmail,
          userType: queryData?.userType,
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Email sent successfully!");
        setHasEmailBeenSent(true);
      } else {
        toast.error("Failed to send email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);

      let errorMessage = "Failed to send email. Please try again.";

      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
        console.log("Error response:", error.response.data);
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
        console.log("Error request:", error.request);
      } else {
        errorMessage = error.message || errorMessage;
        console.log("Error message:", error.message);
      }

      toast.error(errorMessage);
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <form onSubmit={handleSendEmail}>
      <Image className="mx-auto mb-[30px]" src={SuccessEmail} alt="" />
      <SectionTitle
        alignment="center"
        title="Email Verification"
        description={
          hasEmailBeenSent && signingUpEmail
            ? `Please check your email inbox at "${signingUpEmail}"`
            : "Click the button below to send a verification email"
        }
      />
      <div className="space-y-4">
        <button
          type="submit"
          disabled={isSendingEmail}
          className="primary-btn cursor-pointer w-full flex items-center justify-center gap-2"
        >
          {isSendingEmail ? <Spinner className="h-[16px] w-[16px]" /> : null}
          {isSendingEmail
            ? "Sending..."
            : hasEmailBeenSent
            ? "Resend Email"
            : "Verify Your Email"}
        </button>
      </div>
    </form>
  );
};

export default Verification;
