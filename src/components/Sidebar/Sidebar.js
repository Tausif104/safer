import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import HeaderLogo from "@/assets/images/logo.svg";
import DashboardIcon from "@/assets/images/dashboard.svg";
import AddCircle from "@/assets/images/add-circle.svg";
import AddSquare from "@/assets/images/add-square.svg";
import Pricing from "@/assets/images/pricing.svg";
import User from "@/assets/images/user.svg";
import Settings from "@/assets/images/settings.svg";
import Payment from "@/assets/images/payment.svg";

const Sidebar = () => {
  return (
    <div className='Sidebar bg-[#262262] h-screen w-[280] lg:w-[320px] fixed left-[-280px] lg:left-0 top-0 transition-all duration-500 overflow-y-auto p-[15px] lg:p-[30px] pt-[30px] lg:pt-[40px]'>
        {/* logo part  */}
        <div className='logo mb-[45px]'>
            <Link href='/'>
                <Image className='mx-auto w-[180px] lg:w-[220px]' src={HeaderLogo} alt='' />
            </Link>
        </div>
        {/* navigation part  */}
        <div>
            <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[14px] lg:text-[16px]'>
                <li>
                <Link href='/' className='menu-link active flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={DashboardIcon} alt='' /> Dashboard</Link>
                </li>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={AddCircle} alt='' /> Add Pharmacy</Link>
                </li>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={AddSquare} alt='' /> Add Incident</Link>
                </li>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={Pricing} alt='' /> Pricing Plan</Link>
                </li>
            </ul>
            <h4 className='text-[14px] uppercase font-medium pb-[16px] mb-[15px] lg:mb-[30px] border-b-1 border-b-white/20 text-white pl-[20px]'>USer Portal</h4>
            <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[16px]'>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={User} alt='' /> Profile</Link>
                </li>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={Settings} alt='' /> Setting</Link>
                </li>
                <li>
                <Link href='/' className='menu-link flex items-center gap-[16px] text-white transition-all duration-300 hover:bg-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full opacity-[.8]'><Image className='' width={20} src={Payment} alt='' /> Payment</Link>
                </li>
            </ul>
        </div>
        {/* notice part  */}
        <div className='bg-[#3B82F6] rounded-[14px] text-center px-[24px] py-[22px] w-[220px] mx-auto'>
            <p className='text-[14px] lg:text-[16px] font-semibold mb-[25px] text-white'>Upgrade to PRO to get access to all features!</p>
            <Link className='primary-btn' href="/">Get Started</Link>
        </div>
    </div>
  )
}

export default Sidebar
