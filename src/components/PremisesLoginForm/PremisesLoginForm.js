"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import LogoBlack from "@/assets/images/logo-black.svg";
import SectionTitle from "@/components/FormSectionTitle/FormSectionTitle";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { LuLockKeyhole } from "react-icons/lu";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import AppleIcon from "@/assets/images/apple.svg";
import Google from "@/assets/images/google.svg";
import Facebook from "@/assets/images/facebook.svg";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { useRouter } from "next/navigation";
import { Spinner } from "../ui/spinner";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const PremisesLoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    setUser,
    setIsAuthenticated,
    setToken,
    setPharmacy,
    setSubscription,
    fetchSubscription,
  } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = {
      email: e.target.email.value,
      passwordOrPin: e.target.password.value,
    };

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/login`,
        formData
      );
      console.log("data", response.data);
      if (!response.data?.data?.pharmacy) {
        toast.error("You don't have access to a premises account");
        setIsSubmitting(false);
        return;
      }
      setUser(response.data?.data?.user);
      setPharmacy(response.data?.data?.pharmacy);
      setSubscription(response.data?.data?.subscription);
      setToken(response.data?.data?.token);
      setIsAuthenticated(true);

      // Fetch latest subscription status for lock icon display
      await fetchSubscription();

      toast.success("Login successful!");
      if (response.data?.data?.pharmacy?.status === "DEMO") {
        router.push("/dashboard");
      } else {
        router.push("/login-premises/premises-otp");
      }
    } catch (error) {
      console.error("Login failed:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Login failed. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

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
        title="Sign In as Pharmacy (Premises)"
        description="Welcome Back! Please Enter Your Details."
      />
      <form onSubmit={handleSubmit}>
        <div className="relative mb-[20px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <HiOutlineEnvelope />
          </span>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Your email"
            className="pl-[45px]"
          />
        </div>
        <div className="relative mb-[30px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <LuLockKeyhole />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="Password"
            className="pl-[45px]"
          />
          {/* Show/Hide Password Icon */}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-[17px] top-[20px] text-gray-500"
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <label className="relative flex items-center gap-[10px] text-[#374151] text-[16px] sm:text-[18px]">
            <input
              className="h-[15px] sm:h-[20px] w-[15px] sm:w-[20px]"
              type="checkbox"
              name="remember"
              id="remember"
            />{" "}
            Remember Me
          </label>
          <Link href="#" className="text-[#3B82F6] text-[16px] sm:text-[18px]">
            Forget Password?
          </Link>
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
                <span>Logging in...</span>
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
        <p className="mb-[30px] sm:mb-[15px]">
          Don&apos;t have an account yet?{" "}
          <Link href="/signup-premises" className="text-[#2563EB]">
            Sign Up
          </Link>
        </p>
        <div className="flex flex-col gap-4 mx-[-20px] sm:mx-0 px-[20px] sm:px-0 pt-[40px] sm:pt-0 pb-[50px] sm:pb-0 bg-shape relative z-10 overflow-hidden text-[#474851]">
          <p>Or, Login with</p>
          <ul className="flex justify-center gap-[15px]">
            <li>
              <Link
                href="#"
                className="bg-[#F3F4F6] flex items-center h-[40px] w-[40px] rounded-full"
              >
                <Image className="mx-auto w-[20px]" src={AppleIcon} alt="" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="bg-[#F3F4F6] flex items-center h-[40px] w-[40px] rounded-full"
              >
                <Image className="mx-auto w-[20px]" src={Google} alt="" />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="bg-[#F3F4F6] flex items-center h-[40px] w-[40px] rounded-full"
              >
                <Image className="mx-auto w-[20px]" src={Facebook} alt="" />
              </Link>
            </li>
          </ul>
          <p>
            By signing in you agree to our{" "}
            <Link href="#" className="text-[#2563EB]">
              Terms & Conditions of Use
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PremisesLoginForm;
