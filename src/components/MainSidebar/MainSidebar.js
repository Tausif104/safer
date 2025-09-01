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
import { USER_ROLE } from "@/config/constant";

const MenuItem = ({
  href,
  icon,
  label,
  isActive,
  children,
  onClick,
  isCollapsible,
  isOpen,
  onOpenChange,
}) => {
  if (isCollapsible) {
    return (
      <li>
        <Collapsible open={isOpen} onOpenChange={onOpenChange}>
          <CollapsibleTrigger asChild>
            <button
              className={`menu-link flex items-center justify-between gap-[16px] w-full text-[#D4D3E0] transition-all duration-300 cursor-pointer hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group ${
                isOpen ? "!text-[#99C729]" : ""
              }`}
            >
              <div className="flex items-center gap-[16px]">
                <Image
                  className={`brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0 transition-all duration-300 ${
                    isOpen ? "!brightness-100 !invert-0" : ""
                  }`}
                  width={26}
                  src={icon}
                  alt=""
                />
                {label}
              </div>
              {isOpen ? (
                <FaChevronUp className="transition duration-300" />
              ) : (
                <FaChevronDown className="transition duration-300" />
              )}
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="dropdown-menu pl-[28px] border-l border-[#454178] ml-[33px] space-y-4 mt-2">
            {children}
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  return (
    <li>
      <Link
        href={href}
        className={`${
          isActive ? "active" : ""
        } menu-link flex items-center gap-[16px] text-[#D4D3E0] transition-all duration-300 hover:text-[#99C729] hover:opacity-[1] py-[10px] lg:py-[14px] px-[15px] lg:px-[20px] rounded-full group`}
        onClick={onClick}
      >
        <Image
          className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
          width={26}
          src={icon}
          alt=""
        />
        {label}
      </Link>
    </li>
  );
};

const RoleBasedMenu = ({ userRole }) => {
  const pathname = usePathname();
  const [isIncidentOpen, setIsIncidentOpen] = useState(false);

  useEffect(() => {
    if (pathname.includes("/incident")) {
      setIsIncidentOpen(true);
    } else {
      setIsIncidentOpen(false);
    }
  }, [pathname]);

  const incidentItems = [
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
  ];

  const menuItems = {
    [USER_ROLE.ADMIN]: [
      {
        href: "/pharmacists-approval-pending",
        icon: AdminMenuIcon1,
        label: "Pharmacists Approv..",
        show: true,
      },
      {
        href: "/pharmacies",
        icon: AdminMenuIcon2,
        label: "Pharmacies",
        show: true,
      },
      {
        href: "/pharmacists",
        icon: AdminMenuIcon3,
        label: "Pharmacists",
        show: true,
      },
      {
        href: "/dispensers",
        icon: AdminMenuIcon5,
        label: "Dispensers",
        show: true,
      },
      {
        href: "/revenue",
        icon: AdminMenuIcon4,
        label: "Revenue Report",
        show: true,
      },
    ],
    [USER_ROLE.PHARMACIST]: [
      {
        isCollapsible: true,
        icon: AddSquare,
        label: "Add Incident",
        show: true,
        children: incidentItems.map((item) => (
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
        )),
      },
      {
        href: "/pharmacists",
        icon: AdminMenuIcon3,
        label: "Pharmacists",
        show: true,
      },
      {
        href: "/dispensers",
        icon: AdminMenuIcon5,
        label: "Dispensers",
        show: true,
      },
      {
        href: "/report",
        icon: AddCircle,
        label: "Reports",
        show: true,
      },
      {
        href: "/rss",
        icon: Pricing,
        label: "RSS",
        show: true,
      },
      {
        href: "/",
        icon: Pricing,
        label: (
          <span>
            New Features{" "}
            <sup className="text-[#99C729] text-[10px]">(coming soon)</sup>
          </span>
        ),
        show: true,
      },
    ],
    [USER_ROLE.PHARMACY]: [
      {
        isCollapsible: true,
        icon: AddSquare,
        label: "Add Incident",
        show: true,
        children: incidentItems.map((item) => (
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
        )),
      },
      {
        href: "/pharmacists",
        icon: AdminMenuIcon3,
        label: "Pharmacists",
        show: true,
      },
      {
        href: "/dispensers",
        icon: AdminMenuIcon5,
        label: "Dispensers",
        show: true,
      },
      {
        href: "/report",
        icon: AddCircle,
        label: "Reports",
        show: true,
      },
    ],
  };

  const currentMenuItems =
    menuItems[userRole] || menuItems[USER_ROLE.PHARMACIST];

  return (
    <>
      {currentMenuItems.map(
        (item, index) =>
          item.show && (
            <MenuItem
              key={index}
              href={item.href}
              icon={item.icon}
              label={item.label}
              isActive={pathname === item.href}
              isCollapsible={item.isCollapsible}
              isOpen={isIncidentOpen}
              onOpenChange={setIsIncidentOpen}
            >
              {item.children}
            </MenuItem>
          )
      )}
    </>
  );
};

const MainSidebar = () => {
  const { isExpanded, handleToggle } = useRootContext();
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuthStore();

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
          <MenuItem
            href="/dashboard"
            icon={DashboardIcon}
            label="Dashboard"
            isActive={pathname === "/dashboard"}
          />
          <RoleBasedMenu userRole={user?.role} />
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
      {user?.role !== USER_ROLE.ADMIN && (
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
      {user?.role === USER_ROLE.ADMIN && (
        <div className="text-center">
          <p className="text-[14px] lg:text-[16px] text-[#D4D3E0] pt-[20px] border-t border-white/20">
            Copyright © 2025 SafeRX.
            <br /> All rights reserved.
          </p>
        </div>
      )}
    </div>
  );
};

export default MainSidebar;
