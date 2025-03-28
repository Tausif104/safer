import React from 'react'
import Image from "next/image"
import SuccessEmail from "@/assets/images/success-email.svg";
import SectionTitle from '../FormSectionTitle/FormSectionTitle';

const Verification = () => {
  return (
    <div>
        <Image className='mx-auto mb-[30px]' src={SuccessEmail} alt='' />
        <SectionTitle alignment="center" title="Email Verification" description="Open your Gmail check your email “example@gmail.com”" />
        <button type="submit" className="primary-btn cursor-pointer w-full">Verify Your Email</button>
    </div>
  )
}

export default Verification
