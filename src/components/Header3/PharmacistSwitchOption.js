import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { LiaAngleDownSolid } from "react-icons/lia";
import { GiCheckMark } from "react-icons/gi";
import Link from "next/link";
import User from "@/assets/images/user.svg";
import Settings from "@/assets/images/settings.svg";
import Payment from "@/assets/images/payment.svg";
import Logout from "@/assets/images/logout.svg";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import userProfile from "@/assets/images/user-profile.svg";
import userProfile2 from "@/assets/images/user-profile2.svg";
import userProfile3 from "@/assets/images/user-profile3.svg";
import { API_BASE_URL } from "@/config/constant";

const PharmacistSwitchOption = () => {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="sm:order-2">
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <button className="flex gap-[12px]">
            <div>
              {user?.photo ? (
                <img
                  className="w-[48px] h-[48px] rounded-full object-cover"
                  src={
                    user?.photo.startsWith("http")
                      ? user?.photo
                      : `${API_BASE_URL}/public/img/${user?.photo}`
                  }
                  alt="bell"
                />
              ) : (
                <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">N/A</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2.5">
              <div className="text-left">
                <h6 className="text-[18px] mb-1">
                  {user?.name || "Unnamed User"}
                </h6>
                <p className="text-[14px]">
                  GPHC Number: {user?.gphcNumber || "N/A"}
                </p>
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
                      ODS Code: <span className="text-[#4B5563]">73847</span>
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
                      ODS Code: <span className="text-[#4B5563]">73847</span>
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
                      ODS Code: <span className="text-[#4B5563]">73847</span>
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
                  href="/settings"
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
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-[15px] text-[16px] cursor-pointer"
                >
                  <Image
                    className="grayscale-100 brightness-[.6]"
                    src={Logout}
                    alt="links"
                  />{" "}
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PharmacistSwitchOption;
