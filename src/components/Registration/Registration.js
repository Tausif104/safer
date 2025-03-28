import React from 'react'
import Link from "next/link"
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";

const Registration = () => {
  return (
    <section className='pt-[20px] sm:pt0'>
      <div className="flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap gap-4 mb-[30px]">
        <div className="flex items-center gap-4">
          <Link
            href=""
            className="h-[48px] w-[48px] min-w-[48px] bg-white flex items-center justify-center rounded-full border border-[#E7FBBD]"
          >
            <GoArrowLeft />
          </Link>
          <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">Registration </h3>
        </div>
      </div>
      <div className='bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]'>
        <form action="#">
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <input type="text" name="m_name" id="m_name" placeholder="Superintendents/Manager's Name" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <input type="text" name="m_phone" id="m_phone" placeholder="Superintendents/Manager's  Phone" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[20px] sm:mb-[30px]'>
                <input type="text" name="gphc" id="gphc" placeholder="Superintendents/Manager's GPhC number" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] md:text-[16px] text-[#262262] mb-2.5 block font-semibold'>Create a PIN for quick and secure login </label>
                <input type="text" name="pin" id="pin" placeholder="Enter PIN" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <input type="text" name="confirm_pin" id="confirm_pin" placeholder="Confirm PIN" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
                <label className='text-[14px] md:text-[16px] text-[#262262] mt-3 block'>Enter a 6 digit PIN </label>
            </div>
            <div className='flex md:justify-end'>
                <Link href="/" className="primary-btn w-full sm:w-[50%] mb-[20px]">Sign Up</Link>
            </div>
        </form>
      </div>
    </section>
  )
}

export default Registration
