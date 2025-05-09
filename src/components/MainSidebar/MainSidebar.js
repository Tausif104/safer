"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderLogo from "@/assets/images/logo.svg";
import DashboardIcon from "@/assets/images/dashboard.svg";
import AddCircle from "@/assets/images/add-circle.svg";
import AddSquare from "@/assets/images/add-square.svg";
import Pricing from "@/assets/images/pricing.svg";
import User from "@/assets/images/user.svg";
import Stars from "@/assets/images/stars.svg";
import Settings from "@/assets/images/settings.svg";
import Payment from "@/assets/images/payment.svg";
import { useRootContext } from "@/provider/context";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // adjust path based on your setup

const MainSidebar = () => {
  const { isExpanded, handleToggle } = useRootContext();
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const pathname = usePathname();
  console.log(pathname, "pathname");
  useEffect(() => {
    if (pathname.includes("/incident")) {
      setIsIncidentOpen(true);
    } else {
      setIsIncidentOpen(false);
    }
  }, []);

  return (
    <div
      className={`Sidebar bg-[#262262] h-screen w-[280px] lg:w-[320px] fixed ${isExpanded ? "left-0" : "left-[-280px]"
        } lg:left-0 top-0 transition-all duration-500 overflow-y-auto p-[15px] pt-[20px] lg:pt-[30px] z-20`}
    >
      <div
        onClick={handleToggle}
        className='absolute right-0 top-0 bg-[#99C729] h-[30px] w-[30px] flex items-center justify-center text-white z-30 lg:hidden'
      >
        <BsArrowBarLeft />
      </div>

      {/* Logo Section */}
      <div className='logo mb-[45px]'>
        <Link href='/'>
          <Image
            className='mx-auto w-[180px] lg:w-[220px]'
            src={HeaderLogo}
            alt=''
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <div>
        <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[14px] lg:text-[16px]'>
          <li>
            <Link
              href='/'
              className={`${pathname === "/" ? "active" : ""
                } active menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={DashboardIcon}
                alt=''
              />
              Dashboard
            </Link>
          </li>

          {/* Add Incident Dropdown */}
          <li>
            <Collapsible open={isIncidentOpen} onOpenChange={setIsIncidentOpen}>
              <CollapsibleTrigger asChild>
                <button
                  className={`menu-link flex items-center justify-between gap-[16px] w-full text-[#D4D3E0] transition-all duration-300 cursor-pointer hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group ${isIncidentOpen ? "!text-[#99C729]" : ""
                    }`}
                >
                  <div className="flex items-center gap-[16px]">
                    <Image
                      className={`brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 ${isIncidentOpen ? "!brightness-100 !invert-0" : ""
                        }`}
                      width={26}
                      src={AddSquare}
                      alt=""
                    />
                    Add Incident
                  </div>
                  <FaChevronDown
                    className={`transition-transform duration-300 ${isIncidentOpen ? "rotate-180" : ""
                      }`}
                  />
                </button>
              </CollapsibleTrigger>

              <CollapsibleContent className="dropdown-menu pl-[28px] border-l border-[#454178] ml-[33px] space-y-4 mt-2">
                {[
                  { href: "/incident/prescribing-intervention", label: "Prescribing Intervention" },
                  { href: "/incident/patient-safety-event", label: "Patient Safety Event" },
                  { href: "/incident/near-miss", label: "Near Miss" },
                  { href: "/incident/faulty-medication", label: "Faulty Medication" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${pathname === item.href
                      ? "active py-[12px] rounded-full px-[12px]"
                      : ""
                      } menu-link text-[14px] block text-[#D4D3E0] hover:text-[#99C729] transition-all duration-300`}
                  >
                    {item.label}
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </li>

          <li>
            <Link
              href='/report'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AddCircle}
                alt=''
              />
              Reports
            </Link>
          </li>

          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={Pricing}
                alt=''
              />
              <span>New Features <sup className='text-[#99C729] text-[10px]'>(coming soon)</sup></span>
            </Link>
          </li>
        </ul>

        {/* User Portal Section */}
        <h4 className='text-[14px] uppercase font-medium pb-[16px] mb-[15px] lg:mb-[30px] border-b-1 border-b-white/20 text-[#D4D3E0] pl-[20px]'>
          User Portal
        </h4>
        <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[16px]'>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AddCircle}
                alt=''
              />
              Add Dispenser
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AddCircle}
                alt=''
              />
              Add Pharmacist
            </Link>
          </li>
          <li>
            <Link
              href='/pricing'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={Pricing}
                alt=''
              />
              Pricing Plan
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={User}
                alt=''
              />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={Settings}
                alt=''
              />
              Setting
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={Payment}
                alt=''
              />
              Payment
            </Link>
          </li>
        </ul>
      </div>
      {/* notice part  */}
      <div className='bg-[#3B82F6] rounded-[14px] text-center px-[24px] py-[22px] w-[220px] mx-auto'>
        <Image className='mx-auto mb-4' src={Stars} alt='' />
        <p className='text-[14px] lg:text-[16px] font-semibold mb-[25px] text-white'>
          Upgrade to PRO to get access to all features!
        </p>
        <Link className='primary-btn' href='/'>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default MainSidebar;
