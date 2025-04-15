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

const LoginOds = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className='text-center'>
      <div className='mb-[25px] sm:mb-[30px]'>
        <Link href='/'>
          <Image
            className='mx-auto w-[180px] lg:w-[180px]'
            src={LogoBlack}
            alt=''
          />
        </Link>
      </div>
      <SectionTitle
        alignment='center'
        title={`Let’s confirm your Current \n ODS Code.`}
        description='Welcome Back! Please Enter Your Details.'
      />
      <form action='#'>
        <div className='relative mb-[20px]'>
          <span className='absolute left-[17px] top-[18px] sm:top-[20px]'>
            <HiOutlineEnvelope />
          </span>
          <input
            type='email'
            name='email'
            id='email'
            placeholder='ODS code'
            className='pl-[45px]'
          />
        </div>
        <div className='relative mb-[30px]'>
          <span className='absolute left-[17px] top-[18px] sm:top-[20px]'>
            <LuLockKeyhole />
          </span>
          <input
            type={showPassword ? "text" : "password"}
            name='password'
            id='password'
            placeholder='Enter your pin'
            className='pl-[45px]'
          />
          {/* Show/Hide Password Icon */}
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute right-[17px] top-[20px] text-gray-500'
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>

        <div className='flex justify-between gap-2.5 mb-[120px]'>
          <button type='submit' className='primary-btn cursor-pointer w-full'>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginOds;
