import Image from 'next/image'
import React from 'react'
import SearchIcon from '@/assets/images/search-icon.svg'
import Bell from '@/assets/images/bell.svg'
import userProfile from '@/assets/images/user-profile.svg'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LiaAngleDownSolid } from "react-icons/lia";
import { HiOutlineBars3 } from "react-icons/hi2";

const Header = () => {
  return (
    <>
      <header className='sm:bg-white py-[20px] sm:py-[15px] px-[20px] rounded-[12px] sm:shadow-[6px_16px_50px_6px_rgba(38,57,136,0.06)] grid sm:grid-cols-[5fr_7fr] gap-[20px] sm:gap-0 items-center sm:mb-[30px]'>
        <div className='flex sm:justify-end justify-between gap-[15px] sm:order-2'>
          <div className='sm:order-2'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='flex gap-[12px]'>
                  <div>
                    <Image className='w-[48px] h-[48px]' src={userProfile} alt='bell' />
                  </div>
                  <div className='flex items-center gap-2.5'>
                    <div className='text-left'>
                      <h6 className='text-[18px] mb-1'>John Diggle</h6>
                      <p className='text-[14px]'>Pharmacist</p>
                    </div>
                    <div>
                      <LiaAngleDownSolid />
                    </div>
                  </div>
                  </button>
              </PopoverTrigger>
              <PopoverContent className="" side="top" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">User</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className='flex gap-[10px] sm:order-1'>
            <Popover>
              <PopoverTrigger asChild>
                <button className='h-[48px] w-[48px] border border-[#E7FBBD] sm:border-[#DAECFF] flex justify-center items-center rounded-full cursor-pointer bg-white'><Image className='' width={20} src={Bell} alt='bell' /></button>
              </PopoverTrigger>
              <PopoverContent className="" side="top" align="end">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Notification</h4>
                    <p className="text-sm text-muted-foreground">
                      Set the dimensions for the layer.
                    </p>
                  </div>
                  
                </div>
              </PopoverContent>
            </Popover>
            <div className='h-[48px] w-[48px] border bg-white border-[#E7FBBD] sm:border-[#DAECFF] flex justify-center items-center rounded-full cursor-pointer text-[#262262] text-[24px] lg:hidden'>
              <HiOutlineBars3 />
            </div>
          </div>
        </div>
        <div className='flex relative sm:order-1'>
          <input className='w-full border border-[#E7FBBD] sm:border-[#DAECFF] bg-white leading-[54px] px-[24px] pr-[50px] rounded-full placeholder:text-[#707B8A] focus:outline-0 focus:shadow-none' type="search" name="search" id="search" placeholder="Search here" />
          <button className='h-[42px] w-[42px] min-w-[42px] flex items-center justify-center rounded-full sm:bg-primary absolute right-[7px] top-[7px] cursor-pointer' type="submit"><Image className='sm:brightness-0 sm:invert-100' width={20} src={SearchIcon} alt='' /></button>
        </div>
      </header> 
    </>
  )
}

export default Header
