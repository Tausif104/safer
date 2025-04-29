"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderLogoBalck from "@/assets/images/logo-black.svg";
import DashboardIcon from "@/assets/images/dashboard.svg";
import AdminMenuIcon1 from "@/assets/images/admin-menu-icon1.svg";
import AdminMenuIcon2 from "@/assets/images/admin-menu-icon2.svg";
import AdminMenuIcon3 from "@/assets/images/admin-menu-icon3.svg";
import AdminMenuIcon4 from "@/assets/images/admin-menu-icon4.svg";
import AdminMenuIcon5 from "@/assets/images/admin-menu-icon5.svg";
import AdminMenuIcon6 from "@/assets/images/admin-menu-icon6.svg";
import { useRootContext } from "@/provider/context";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Sidebar = () => {
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
  }, [pathname]);

  return (
    <div
      className={`Sidebar bg-white h-screen w-[280px] lg:w-[320px] fixed border-1 border-[#EBF5FF] ${
        isExpanded ? "left-0" : "left-[-280px]"
      } lg:left-0 top-0 transition-all duration-500 overflow-y-auto p-[15px] lg:p-[30px] pt-[30px] lg:pt-[40px] z-20`}
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
            src={HeaderLogoBalck}
            alt=''
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <div>
        <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[14px] lg:text-[16px] admin-dashboard-menu'>
          <li>
            <Link
              href='/'
              className={`${
                pathname === "/" ? "active" : ""
              } active menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
            >
              <Image
                className='group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={DashboardIcon}
                alt=''
              />
              Patient Safety
            </Link>
          </li>

          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon1}
                alt=''
              />
              Pharmacists AP..
              <span className="text-white text-[10px] font-semibold bg-[#F60000] rounded-full h-[16px] w-[16px] flex items-center justify-center">4</span>
            </Link>
          </li>

          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon2}
                alt=''
              />
              Pharmacies
            </Link>
          </li>

          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon3}
                alt=''
              />
              Pharmacists
            </Link>
          </li>
          
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:grayscale-0 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon4}
                alt=''
              />
              Revenue Report
            </Link>
          </li>

          {/* Add Incident Dropdown */}
          <li>
            <button
              onClick={() => setIsIncidentOpen(!isIncidentOpen)}
              className={`menu-link flex items-center justify-between gap-[16px] w-full text-[#4B5563] transition-all duration-300 cursor-pointer hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group ${
                isIncidentOpen ? "!text-[#99C729]" : ""
              }`}
            >
              <div className='flex items-center gap-[16px]'>
                <Image
                  className={`group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 ${
                    isIncidentOpen ? "!brightness-100 !invert-0" : ""
                  }`}
                  width={26}
                  src={AdminMenuIcon4}
                  alt=''
                />
                Dropdown Demo
              </div>
              <FaChevronDown
                className={`transition-transform duration-300 text-[#4B5563] ${
                  isIncidentOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Dropdown Menu */}
            <ul
              className={`overflow-hidden transition-all duration-300 pl-[28px] border-l border-[#454178] ml-[33px] ${
                isIncidentOpen
                  ? "max-h-[200px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <li>
                <Link
                  href='/incident/prescribing-intervention'
                  className={`${
                    pathname === "/incident/prescribing-intervention"
                      ? "active py-[12px] rounded-full px-[12px]"
                      : ""
                  } menu-link text-[14px] block mb-4 text-[#4B5563] hover:text-[#99C729] transition-all duration-300 `}
                >
                  Prescribing Intervention
                </Link>
              </li>
              <li>
                <Link
                  href='/incident/patient-safety-event'
                  className={`${
                    pathname === "/incident/patient-safety-event"
                      ? "active py-[12px] rounded-full px-[12px]"
                      : ""
                  } menu-link text-[14px] block mb-4 text-[#4B5563] hover:text-[#99C729] transition-all duration-300 `}
                >
                  Patient Safety Event
                </Link>
              </li>
              <li>
                <Link
                  href='/incident/near-miss'
                  className={`${
                    pathname === "/incident/near-miss"
                      ? "active py-[12px] rounded-full px-[12px]"
                      : ""
                  } menu-link text-[14px] block mb-4 text-[#4B5563] hover:text-[#99C729] transition-all duration-300 `}
                >
                  Near Miss
                </Link>
              </li>
              <li>
                <Link
                  href='/incident/faulty-medication'
                  className={`${
                    pathname === "/incident/faulty-medication"
                      ? "active py-[12px] rounded-full px-[12px]"
                      : ""
                  } menu-link text-[14px] block mb-4 text-[#4B5563] hover:text-[#99C729] transition-all duration-300 `}
                >
                  Faulty Medication
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* User Portal Section */}
        <h4 className='text-[14px] uppercase font-medium pb-[16px] mb-[15px] lg:mb-[30px] border-b-1 border-b-[#DAECFF] text-[#4B5563] pl-[20px]'>
        Admin Portal
        </h4>
        <ul className='flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[16px]'>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon5}
                alt=''
              />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href='/'
              className='menu-link flex items-center gap-[16px] text-[#4B5563] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group'
            >
              <Image
                className='group-hover:brightness-100 group-hover:invert-0'
                width={26}
                src={AdminMenuIcon6}
                alt=''
              />
              Settings
            </Link>
          </li>
        </ul>
      </div>
      {/* notice part  */}
      <div className='text-center'>
        <p className='text-[14px] lg:text-[16px] text-[#4B5563] pt-[20px] border-t border-[#DAECFF]'>
        Copyright © 2025 SafeRX. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
