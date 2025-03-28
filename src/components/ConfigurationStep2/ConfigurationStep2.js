import React from 'react'
import Link from "next/link"
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";


const ConfigurationStep2 = () => {
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
          <div className='cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item active'>
           2
          </div>
          <div className='cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item'>
            3
          </div>
        </div>
      </div>
      <div className='bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]'>
        <h4 className='text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]'>2. Employee Information</h4>
        <form action="#">
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Employee name</label>
                <input type="text" name="name" id="name" placeholder="Zahidul Islam" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Phone number</label>
                <input type="text" name="phone" id="phone" placeholder="(123) 456 7890" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>Email Address</label>
                <input type="email" name="email-address" id="email-address" placeholder="zahidulislam@gmail.com" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='relative mb-[16px] sm:mb-[20px]'>
                <label className='text-[14px] text-[#707B8A] mb-2.5 block'>GPhC code</label>
                <input type="text" name="gphc" id="gphc" placeholder="12345" className='bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]'/>
            </div>
            <div className='grid sm:grid-cols-2 gap-3'>
                <div className='text-center'>
                    <Link href="/" className="primary-btn w-full !bg-transparent !border-[#262262] !text-[#262262] mb-[20px]"><FaPlus /> Add Employee</Link>
                    <Link href="/" className="text-[#262262] font-medium text-[14px] sm:text-[18px] hidden sm:block">Skip</Link>
                </div>
                <div className='text-center'>
                    <Link href="/configuration-step3" className="primary-btn w-full mb-[20px]">Next</Link>
                    <Link href="/configuration-step3" className="text-[#262262] font-medium text-[14px] sm:text-[18px] sm:hidden">Skip</Link>
                </div>
            </div>
        </form>
      </div>
    </section>
  )
}

export default ConfigurationStep2
