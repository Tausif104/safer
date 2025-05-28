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
import { RiLockPasswordLine } from "react-icons/ri";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { Spinner } from "../ui/spinner";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [ReshowPassword, reSetShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { setSigningUpEmail, setUser, setPharmacy, setToken } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (!password || !confirmPassword) {
      alert("Please fill in both password fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/signup-premise`,
        {
          pharmacyEmail: e.target.p_email.value,
          odsCode: e.target.odsCode.value,
          password,
        }
      );

      if (response.status === 200) {
        setSigningUpEmail(e.target.p_email.value);
        setUser(response.data?.data?.user);
        setToken(response.data?.data?.token);
        setPharmacy(response.data?.data?.pharmacy);
        router.push("/signup-premises/premises-verification?type=premise");
      }
    } catch (error) {
      console.error("Signup error:", error);
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
        title="Create an account"
        description="Welcome Back! Please Enter Your Details."
      />
      <form onSubmit={handleSubmit}>
        <div className="relative mb-[20px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <HiOutlineEnvelope />
          </span>
          <input
            type="email"
            name="p_email"
            id="p_email"
            placeholder="Pharmacy Email"
            className="pl-[45px]"
          />
        </div>
        <div className="relative mb-[20px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <RiLockPasswordLine />
          </span>
          <input
            type="text"
            name="odsCode"
            id="odsCode"
            placeholder="ODS Code"
            className="pl-[45px]"
          />
        </div>
        <div className="relative mb-[20px]">
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
        <div className="relative mb-[30px]">
          <span className="absolute left-[17px] top-[18px] sm:top-[20px]">
            <LuLockKeyhole />
          </span>
          <input
            type={ReshowPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Re-Password"
            className="pl-[45px]"
          />
          {/* Show/Hide Password Icon */}
          <button
            type="button"
            onClick={() => reSetShowPassword(!ReshowPassword)}
            className="absolute right-[17px] top-[20px] text-gray-500"
          >
            {ReshowPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
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
        </div>
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <button
            type="submit"
            className={`primary-btn w-full ${
              isSubmitting
                ? "opacity-70 pointer-events-none !transition-none hover:!transform-none active:!transform-none"
                : "cursor-pointer"
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                <Spinner size="sm" className="text-white" />
                <span>Signing up...</span>
              </div>
            ) : (
              "Sign Up"
            )}
          </button>
        </div>
        <p className="mb-[30px] sm:mb-[15px]">
          Already have an account?{" "}
          <Link href="/login-premises" className="text-[#2563EB]">
            Login
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
            By signing up you agree to our{" "}
            <Link href="#" className="text-[#2563EB]">
              Terms & Conditions of Use
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
