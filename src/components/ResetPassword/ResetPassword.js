"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "@/assets/images/logo-black.svg";
import SectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import { LuLockKeyhole } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [token, setToken] = useState("");
  const [isTokenValid, setIsTokenValid] = useState(true);
  const [returnTo, setReturnTo] = useState("/login-premises");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (!tokenFromUrl) {
      setIsTokenValid(false);
      toast.error("Invalid or missing reset token");
    } else {
      setToken(tokenFromUrl);
    }

    const returnToParam = searchParams.get("returnTo");
    if (returnToParam) {
      setReturnTo(`/${returnToParam}`);
    } else if (typeof window !== "undefined") {
      const storedReturnTo = sessionStorage.getItem("forgot_password_return");
      if (storedReturnTo) {
        setReturnTo(storedReturnTo);
      }
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPassword = e.target.newPassword.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in both password fields");
      setIsSubmitting(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/reset-password`,
        {
          token,
          newPassword,
        }
      );

      toast.success(
        response.data?.message ||
          "Password reset successful. You can now login with your new password."
      );

      if (typeof window !== "undefined") {
        sessionStorage.removeItem("forgot_password_return");
      }

      setTimeout(() => {
        router.push(returnTo);
      }, 2000);
    } catch (error) {
      console.error("Reset password failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isTokenValid) {
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
          title="Invalid Reset Link"
          description="This password reset link is invalid or has expired. Please request a new one."
        />
        <div className="mt-[30px]">
          <Link href="/forgot-password" className="primary-btn inline-block">
            Request New Link
          </Link>
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
        title="Reset Your Password"
        description="Enter your new password below."
      />
      <form onSubmit={handleSubmit}>
        <div className="relative mb-[20px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <LuLockKeyhole />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="newPassword"
            id="newPassword"
            placeholder="New Password"
            className="pl-[45px]"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[17px] top-[20px] text-gray-500"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <div className="relative mb-[30px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <LuLockKeyhole />
          </span>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm New Password"
            className="pl-[45px]"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-[17px] top-[20px] text-gray-500"
          >
            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
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
                <span>Resetting...</span>
              </div>
            ) : (
              "Reset Password"
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

export default ResetPassword;
