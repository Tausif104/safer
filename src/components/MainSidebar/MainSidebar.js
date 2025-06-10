"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import HeaderLogo from "@/assets/images/logo.svg";
import DashboardIcon from "@/assets/images/dashboard.svg";
import AddCircle from "@/assets/images/add-circle.svg";
import AdminMenuIcon1 from "@/assets/images/admin-menu-icon1.svg";
import AdminMenuIcon2 from "@/assets/images/admin-menu-icon2.svg";
import AdminMenuIcon3 from "@/assets/images/admin-menu-icon3.svg";
import AdminMenuIcon4 from "@/assets/images/admin-menu-icon4.svg";
import AdminMenuIcon5 from "@/assets/images/admin-menu-icon5.svg";
import AdminMenuIcon6 from "@/assets/images/admin-menu-icon6.svg";
import AddSquare from "@/assets/images/add-square.svg";
import Pricing from "@/assets/images/pricing.svg";
import User from "@/assets/images/user.svg";
import Stars from "@/assets/images/stars.svg";
import Settings from "@/assets/images/settings.svg";
import Payment from "@/assets/images/payment.svg";
import { useRootContext } from "@/provider/context";
import { BsArrowBarLeft } from "react-icons/bs";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { usePathname } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"; // adjust path based on your setup
import useAuthStore from "@/store/useAuthStore";

const MainSidebar = () => {
  const { isExpanded, handleToggle } = useRootContext();
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();
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
      className={`Sidebar bg-[#262262] h-screen w-[280px] lg:w-[320px] fixed ${
        isExpanded ? "left-0" : "left-[-280px]"
      } lg:left-0 top-0 transition-all duration-500 overflow-y-auto p-[15px] pt-[20px] lg:pt-[30px] z-20`}
    >
      <div
        onClick={handleToggle}
        className="absolute right-0 top-0 bg-[#99C729] h-[30px] w-[30px] flex items-center justify-center text-white z-30 lg:hidden"
      >
        <BsArrowBarLeft />
      </div>

      {/* Logo Section */}
      <div className="logo mb-[45px]">
        <Link href="/dashboard">
          <Image
            className="mx-auto w-[180px] lg:w-[220px]"
            src={HeaderLogo}
            alt=""
          />
        </Link>
      </div>

      {/* Navigation Section */}
      <div>
        <ul className="flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[14px] lg:text-[16px]">
          <li>
            <Link
              href="/dashboard"
              className={`${
                pathname === "/dashboard" ? "active" : ""
              } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
            >
              <Image
                className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                width={26}
                src={DashboardIcon}
                alt=""
              />
              Dashboard
            </Link>
          </li>

          {user?.role === "admin" ? (
            <>
              <li>
                <Link
                  href="/pharmacists-approval-pending"
                  className={`${
                    pathname === "/pharmacists-approval-pending" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={AdminMenuIcon1}
                    alt=""
                  />
                  Pharmacists Approv..
                  {/* <span className="text-white text-[10px] font-semibold bg-[#F60000] rounded-full h-[16px] w-[16px] flex items-center justify-center">
                    4
                  </span> */}
                </Link>
              </li>

              <li>
                <Link
                  href="/pharmacies"
                  className={`${
                    pathname === "/pharmacies" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={AdminMenuIcon2}
                    alt=""
                  />
                  Pharmacies
                </Link>
              </li>

              <li>
                <Link
                  href="/pharmacists"
                  className={`${
                    pathname === "/pharmacists" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={AdminMenuIcon3}
                    alt=""
                  />
                  Pharmacists
                </Link>
              </li>

              <li>
                <Link
                  href="/revenue"
                  className={`${
                    pathname === "/revenue" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={AdminMenuIcon4}
                    alt=""
                  />
                  Revenue Report
                </Link>
              </li>
            </>
          ) : (
            <>
              {/* Add Incident Dropdown */}
              <li>
                <Collapsible
                  open={isIncidentOpen}
                  onOpenChange={setIsIncidentOpen}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={`menu-link flex items-center justify-between gap-[16px] w-full text-[#D4D3E0] transition-all duration-300 cursor-pointer hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group ${
                        isIncidentOpen ? "!text-[#99C729]" : ""
                      }`}
                    >
                      <div className="flex items-center gap-[16px]">
                        <Image
                          className={`brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 ${
                            isIncidentOpen ? "!brightness-100 !invert-0" : ""
                          }`}
                          width={26}
                          src={AddSquare}
                          alt=""
                        />
                        Add Incident
                      </div>
                      {isIncidentOpen ? (
                        <FaChevronUp className="transition duration-300" />
                      ) : (
                        <FaChevronDown className="transition duration-300" />
                      )}
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="dropdown-menu pl-[28px] border-l border-[#454178] ml-[33px] space-y-4 mt-2">
                    {[
                      {
                        href: "/incident/prescribing-intervention",
                        label: "Prescribing Intervention",
                      },
                      {
                        href: "/incident/patient-safety-event",
                        label: "Patient Safety Event",
                      },
                      { href: "/incident/near-miss", label: "Near Miss" },
                      {
                        href: "/incident/faulty-medication",
                        label: "Faulty Medication",
                      },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`${
                          pathname === item.href
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
                  href="/report"
                  className={`${
                    pathname === "/report" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={AddCircle}
                    alt=""
                  />
                  Reports
                </Link>
              </li>

              <li>
                <Link
                  href="/dashboard"
                  className={`${
                    pathname === "/features" ? "active" : ""
                  } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
                >
                  <Image
                    className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                    width={26}
                    src={Pricing}
                    alt=""
                  />
                  <span>
                    New Features{" "}
                    <sup className="text-[#99C729] text-[10px]">
                      (coming soon)
                    </sup>
                  </span>
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* User Portal Section */}
        <h4 className="text-[14px] uppercase font-medium pb-[16px] mb-[15px] lg:mb-[30px] border-b-1 border-b-white/20 text-[#D4D3E0] pl-[20px]">
          User Portal
        </h4>
        <ul className="flex flex-col gap-[5px] mb-[20px] lg:mb-[40px] text-[16px]">
          <li>
            <Link
              href="/profile"
              className={`${
                pathname === "/profile" ? "active" : ""
              } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
            >
              <Image
                className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                width={26}
                src={User}
                alt=""
              />
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/settings"
              className={`${
                pathname === "/settings" ? "active" : ""
              } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
            >
              <Image
                className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                width={26}
                src={Settings}
                alt=""
              />
              Setting
            </Link>
          </li>
        </ul>
      </div>
      {user?.role !== "admin" && (
        <div className="bg-[#3B82F6] rounded-[14px] text-center px-[24px] py-[22px] w-[220px] mx-auto">
          <Image className="mx-auto mb-4" src={Stars} alt="" />
          <p className="text-[14px] lg:text-[16px] font-semibold mb-[25px] text-white">
            Upgrade to PRO to get access to all features!
          </p>
          <Link className="primary-btn" href="/">
            Get Started
          </Link>
        </div>
      )}
      {user?.role === "admin" && (
        <div className="text-center">
          <p className="text-[14px] lg:text-[16px] text-[#D4D3E0] pt-[20px] border-t border-white/20">
            Copyright © 2025 SafeRX.<br/> All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
