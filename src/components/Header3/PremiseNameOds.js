import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LiaAngleDownSolid } from "react-icons/lia";
import Image from "next/image";
import Link from "next/link";
import Settings from "@/assets/images/settings.svg";
import Logout from "@/assets/images/logout.svg";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/config/constant";

const PremiseNameOds = ({ pharmacy }) => {
  const { logout } = useAuthStore();
  const router = useRouter();
  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="sm:order-2">
      <Popover>
        <PopoverTrigger asChild className="cursor-pointer">
          <button className="flex items-center gap-[12px]">
            {pharmacy?.logo ? (
              <div className="w-[48px] h-[48px] rounded-full overflow-hidden">
                <Image
                  src={
                    pharmacy.logo.startsWith("http")
                      ? pharmacy.logo
                      : `${API_BASE_URL}/public/img/${pharmacy.logo}`
                  }
                  alt="Pharmacy Logo"
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500 text-sm">N/A</span>
              </div>
            )}
            <div className="flex items-center gap-2.5">
              <div className="text-left">
                <h6 className="text-[18px] mb-1">{pharmacy?.name || "N/A"}</h6>
                <p className="text-[14px]">
                  ODS Code: {pharmacy?.odsCode || "N/A"}
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
          <ul className="flex flex-col gap-[15px] text-[#514E81]">
            <li>
              <Link
                href="/settings"
                className="flex items-center gap-[15px] text-[16px]"
              >
                <Image
                  className="grayscale-100 brightness-[.6]"
                  src={Settings}
                  alt="settings"
                />
                Settings
              </Link>
            </li>
            <li className="flex items-center gap-[15px] text-[16px]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-[15px] text-[16px] cursor-pointer"
              >
                <Image
                  className="grayscale-100 brightness-[.6]"
                  src={Logout}
                  alt="logout"
                />
                Logout
              </button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PremiseNameOds;
