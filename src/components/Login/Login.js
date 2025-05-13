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

const Login = ({ onSuccessfulLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validCredentials = {
    email: "user@example.com",
    password: "password123",
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    if (
      email === validCredentials.email &&
      password === validCredentials.password
    ) {
      if (onSuccessfulLogin) {
        onSuccessfulLogin();
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="text-center mx-10 my-5">
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
        title="Let's sign you in."
        description="Welcome Back! Please Enter Your Details."
      />

      {error && <p className="text-red-500 mb-4">{error}</p>}

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            />
            Remember Me
          </label>
          <Link href="#" className="text-[#3B82F6] text-[16px] sm:text-[18px]">
            Forget Password?
          </Link>
        </div>
        <div className="flex justify-between gap-2.5 mb-[30px]">
          <button type="submit" className="primary-btn cursor-pointer w-full">
            Login
          </button>
        </div>
        <p className="mb-[30px] sm:mb-[15px]">
          Don't have an account yet?{" "}
          <Link href="#" className="text-[#2563EB]">
            Sign Up
          </Link>
        </p>

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
      </form>
    </div>
  );
};

export default Login;
