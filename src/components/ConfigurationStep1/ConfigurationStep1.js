import React from 'react'
import Link from "next/link"
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";

const ConfigurationStep1 = () => {
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
          <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">Company Configuration</h3>
        </div>
        <div className="flex justify-between w-[250px] md:w-[380px] relative z-10 before:absolute before:left-0 before:top-[50%] before:h-0.5 before:w-full before:content-null before:bg-[#E2F3B2] before:-z-10">
          <div className='cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item active'>
            1
          </div>
          <div className='cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item'>
           2
          </div>
          <div className='cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item'>
            3
          </div>
        </div>
      </div>
      <div className='bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]'>
        <h4 className='text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]'>1. Pharmacy Information</h4>
        <form action="#">
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Pharmacy name</label>
                <input type="text" name="name" id="name" placeholder="ZK Pharmacy" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Phone number</label>
                <input type="text" name="phone" id="phone" placeholder="(123) 456 7890" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Address</label>
                <input type="text" name="address" id="address" placeholder="1901 Thornridge Cir. Shiloh, Hawaii 81063" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>ODS code</label>
                <input type="text" name="ods" id="ods" placeholder="12345" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>GPhc premise number (optional)</label>
                <input type="text" name="gphc" id="gphc" placeholder="3683 618 639" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='flex justify-between gap-3 items-center'>
              <Link href="/" className="text-[#3B82F6] font-medium text-[14px] sm:text-[18px]">Skip</Link>
              <Link href="/configuration-step2" className="primary-btn w-full sm:w-[390px]">Next</Link>
            </div>
        </form>
      </div>
    </section>
  )
}

export default ConfigurationStep1
