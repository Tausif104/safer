"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchIcon from "@/assets/images/search-icon.svg";
import Bell from "@/assets/images/bell.svg";
import userProfile from "@/assets/images/user-profile.svg";
import userProfile2 from "@/assets/images/user-profile2.svg";
import userProfile3 from "@/assets/images/user-profile3.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LiaAngleDownSolid } from "react-icons/lia";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useRootContext } from "@/provider/context";
import { GiCheckMark } from "react-icons/gi";

import User from "@/assets/images/user.svg";
import Settings from "@/assets/images/settings.svg";
import Payment from "@/assets/images/payment.svg";
import Logout from "@/assets/images/logout.svg";

const Header = () => {
  const { handleToggle } = useRootContext();
  return (
    <>
      <header className="bg-[#F8FEE6] sm:bg-white py-[20px] sm:py-[15px] px-[20px] rounded-[12px] sm:shadow-[6px_16px_50px_6px_rgba(38,57,136,0.06)] grid sm:grid-cols-[5fr_7fr] gap-[20px] sm:gap-0 items-center mx-[-20px] sm:mx-0 sm:mb-[30px]">
        <div className="flex sm:justify-end justify-between gap-[15px] sm:order-2">
          <div className="sm:order-2">
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex gap-[12px]">
                  <div>
                    <Image
                      className="w-[48px] h-[48px]"
                      src={userProfile}
                      alt="bell"
                    />
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-left">
                      <h6 className="text-[18px] mb-1">John Diggle</h6>
                      <p className="text-[14px]">Pharmacist</p>
                    </div>
                    <div>
                      <LiaAngleDownSolid />
                    </div>
                  </div>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="rounded-[10px] p-[20px]"
                side="top"
                align="end"
              >
                <div className="">
                  <p className="text-[14px] font-medium uppercase text-[#9298A1] mb-[15px] pb-[15px] border-b border-b-[#DAECFF]">
                    Switch Account
                  </p>
                  <div className="flex flex-col gap-[15px] mb-[20px]">
                    {/* single item  */}
                    <div className="flex justify-between items-center mb-[15px]">
                      <div className="flex gap-[15px] items-center">
                        <Image
                          className="w-[48px] h-[48px]"
                          src={userProfile}
                          alt="userProfile"
                        />
                        <div>
                          <h6 className="text-[16px] font-medium text-[#262262] mb-[5px]">
                            SK Pharmacy
                          </h6>
                          <p className="text-[14px] text-[#707B8A]">
                            ODS Code:{" "}
                            <span className="text-[#4B5563]">73847</span>
                          </p>
                        </div>
                      </div>
                      <span className="h-[24px] w-[24px] bg-[#E8F1FF] rounded-full flex items-center justify-center text-[12px] text-[#3B82F6]">
                        <GiCheckMark />
                      </span>
                    </div>

                    {/* single item  */}
                    <div className="flex justify-between items-center mb-[15px]">
                      <div className="flex gap-[15px] items-center">
                        <Image
                          className="w-[48px] h-[48px]"
                          src={userProfile2}
                          alt="userProfile2"
                        />
                        <div>
                          <h6 className="text-[16px] font-medium text-[#262262] mb-[5px]">
                            SK Pharmacy
                          </h6>
                          <p className="text-[14px] text-[#707B8A]">
                            ODS Code:{" "}
                            <span className="text-[#4B5563]">73847</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* single item  */}
                    <div className="flex justify-between items-center mb-[15px]">
                      <div className="flex gap-[15px] items-center">
                        <Image
                          className="w-[48px] h-[48px]"
                          src={userProfile3}
                          alt="userProfile3"
                        />
                        <div>
                          <h6 className="text-[16px] font-medium text-[#262262] mb-[5px]">
                            SK Pharmacy
                          </h6>
                          <p className="text-[14px] text-[#707B8A]">
                            ODS Code:{" "}
                            <span className="text-[#4B5563]">73847</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[14px] font-medium uppercase text-[#9298A1] mb-[15px] pb-[15px] border-b border-b-[#DAECFF]">
                    USer Portal
                  </p>
                  <ul className="flex flex-col gap-[15px] mb-[20px] text-[#514E81] border-b border-b-[#DAECFF] mb-[15px] pb-[15px]">
                    <li className="">
                      <Link
                        href="/"
                        className="flex items-center gap-[15px] text-[16px]"
                      >
                        <Image
                          className="grayscale-100 brightness-[.6]"
                          src={User}
                          alt="links"
                        />{" "}
                        Profile
                      </Link>{" "}
                    </li>
                    <li className="">
                      <Link
                        href="/"
                        className="flex items-center gap-[15px] text-[16px]"
                      >
                        <Image
                          className="grayscale-100 brightness-[.6]"
                          src={Settings}
                          alt="links"
                        />{" "}
                        Settings
                      </Link>
                    </li>
                    <li className="">
                      <Link
                        href="/"
                        className="flex items-center gap-[15px] text-[16px]"
                      >
                        <Image
                          className="grayscale-100 brightness-[.6]"
                          src={Payment}
                          alt="links"
                        />{" "}
                        Payment
                      </Link>
                    </li>
                  </ul>

                  <ul className="flex flex-col gap-[15px] text-[#514E81]">
                    <li className="flex items-center gap-[15px] text-[16px]">
                      <Link
                        href="/"
                        className="flex items-center gap-[15px] text-[16px]"
                      >
                        <Image
                          className="grayscale-100 brightness-[.6]"
                          src={Logout}
                          alt="links"
                        />{" "}
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex gap-[10px] sm:order-1">
            <Popover>
              <PopoverTrigger asChild>
                <button className="h-[48px] w-[48px] border border-[#E7FBBD] sm:border-[#DAECFF] flex justify-center items-center rounded-full cursor-pointer bg-white">
                  <Image className="" width={20} src={Bell} alt="bell" />
                </button>
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
            <div
              onClick={handleToggle}
              className="h-[48px] w-[48px] border bg-white border-[#E7FBBD] sm:border-[#DAECFF] flex justify-center items-center rounded-full cursor-pointer text-[#262262] text-[24px] lg:hidden"
            >
              <HiOutlineBars3 />
            </div>
          </div>
        </div>
        <div className="flex relative sm:order-1">
          <input
            className="w-full border border-[#E7FBBD] sm:border-[#DAECFF] bg-white leading-[54px] px-[24px] pr-[50px] rounded-full placeholder:text-[#707B8A] focus:outline-0 focus:shadow-none"
            type="search"
            name="search"
            id="search"
            placeholder="Search here"
          />
          <button
            className="h-[42px] w-[42px] min-w-[42px] flex items-center justify-center rounded-full sm:bg-primary absolute right-[7px] top-[7px] cursor-pointer"
            type="submit"
          >
            <Image
              className="sm:brightness-0 sm:invert-100"
              width={20}
              src={SearchIcon}
              alt=""
            />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
