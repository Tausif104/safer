import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import HomeIcon from '@/assets/images/home-mobile.svg'
import Settings from '@/assets/images/settings-dark.svg'
import UserProfile from '@/assets/images/user-profile-dark.svg'
import { Button } from "@/components/ui/button"
import { FaPlus } from "react-icons/fa6";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


const MobileNav = () => {
  return (
    <>
      
      <div className='fixed bottom-0 left-0 w-full z-50 sm:hidden'>
        <div className='px-[20px] mb-[20px]'>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="primary-btn cursor-pointer w-full !py-[24px]">
                <FaPlus />
                Add Incident
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 rounded-[10px] p-[16px] border-b-2 border-b-[#99C729]">
              <div className='flex flex-col gap-4'>
                <Link href="#" className="primary-btn !bg-[#F3F4F6] !border-[#C8CFDA] !text-[#707B8A] hover:!bg-[#99C729] hover:!text-white">Prescribing Intervention</Link>
                <Link href="#" className="primary-btn !bg-[#F3F4F6] !border-[#C8CFDA] !text-[#707B8A] hover:!bg-[#99C729] hover:!text-white">Patient Safety Event</Link>
                <Link href="#" className="primary-btn !bg-[#F3F4F6] !border-[#C8CFDA] !text-[#707B8A] hover:!bg-[#99C729] hover:!text-white">Near Miss</Link>
                <Link href="#" className="primary-btn !bg-[#F3F4F6] !border-[#C8CFDA] !text-[#707B8A] hover:!bg-[#99C729] hover:!text-white">Faulty Medication</Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className='bg-white shadow-[10px_-40px_60px_0px_#E5E9ED_0.4] py-[10px] px-[20px]'>
          <ul className='flex text-center justify-between gap-2 text-[12px] font-medium'>
              <li>
                  <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                      <Image className='mx-auto' src={HomeIcon} alt="Home" />
                      <span>Home</span>
                  </Link>
              </li>
              <li>
                  <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                      <Image className='mx-auto' src={Settings} alt="Home" />
                      <span>Setting</span>
                  </Link>
              </li>
              <li>
                  <Link href="/" className='text-center flex flex-col gap-1.5 justify-center'>
                      <Image className='mx-auto' src={UserProfile} alt="Home" />
                      <span>Profile</span>
                  </Link>
              </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default MobileNav
