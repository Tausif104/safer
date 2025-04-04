import React from 'react'
import Image from "next/image"
import SuccessEmail2 from "@/assets/images/success-email2.svg";
import SectionTitle from '../FormSectionTitle/FormSectionTitle';

const Verificationsuccessful = () => {
  return (
    <div>
        <Image className='mx-auto mb-[30px]' src={SuccessEmail2} alt='' />
        <SectionTitle alignment="center" title="Wait for Your Account to be Approved." description="We will get back to you within 48 hours to approve your account." />
        <button type="submit" className="primary-btn cursor-pointer w-full">Verify Your Email</button>
    </div>
  )
}

export default Verificationsuccessful
