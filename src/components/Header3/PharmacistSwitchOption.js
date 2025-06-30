"use client";
import React, { useEffect, useState } from "react";
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
import { API_BASE_URL } from "@/config/constant";
import axios from "axios";
import PharmacySwitchPasswordModal from "./PharmacySwitchPasswordModal";
import { useRootContext } from "@/provider/context";
import toast from "react-hot-toast";

const PharmacistSwitchOption = () => {
  const {
    user,
    logout,
    pharmacy: userPharmacy,
    setUser,
    setPharmacy,
    setToken,
    setIsAuthenticated,
  } = useAuthStore();
  const [userPharmacies, setUserPharmacies] = useState([]);
  const [selectedPharmacy, setSelectedPharmacy] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsGlobalLoading } = useRootContext();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const handlePharmacyClick = (pharmacy) => {
    if (pharmacy?.id === userPharmacy?.id) {
      return;
    }
    setSelectedPharmacy(pharmacy);
    setIsPasswordModalOpen(true);
  };

  const handlePasswordConfirm = async (password) => {
    if (!selectedPharmacy || !user?.email) {
      toast.error("Missing required information");
      return;
    }

    setIsSubmitting(true);
    setIsGlobalLoading(true);

    setIsPasswordModalOpen(false);
    setSelectedPharmacy(null);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
        email: user.email,
        passwordOrPin: password,
        odsCode: selectedPharmacy.odsCode,
      });

      if (response.data && response.data.data) {
        const {
          user: newUser,
          pharmacy: newPharmacy,
          token: newToken,
        } = response.data.data;
        setUser(newUser);
        setPharmacy(newPharmacy);
        setToken(newToken);
        setIsAuthenticated(true);

        toast.success(`Successfully switched to ${newPharmacy.name}`);

        window.location.reload();
      } else {
        toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Pharmacy switch error:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to switch pharmacy. Please check your password."
      );
    } finally {
      setIsSubmitting(false);
      setIsGlobalLoading(false);
    }
  };

  const handlePasswordModalClose = () => {
    setIsPasswordModalOpen(false);
    setSelectedPharmacy(null);
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(`${API_BASE_URL}/api/v1/users/${user?.id}/pharmacies`)
        .then((res) => {
          setUserPharmacies(res?.data?.data);
        });
    }
  }, [user]);

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
                <div
                  className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center"
                  style={{ minWidth: 48, minHeight: 48, aspectRatio: "1/1" }}
                >
                  <span className="text-gray-500 text-sm leading-none">
                    N/A
                  </span>
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
            {userPharmacies?.length > 0 && (
              <div className="flex flex-col gap-[15px] mb-[20px]">
                {userPharmacies?.map((pharmacy) => (
                  <div
                    key={pharmacy?.id}
                    className="flex justify-between cursor-pointer items-center mb-[15px] hover:bg-gray-50 p-2 rounded-lg transition-colors"
                    onClick={() => handlePharmacyClick(pharmacy)}
                  >
                    <div className="flex gap-[15px] items-center">
                      {pharmacy?.logo ? (
                        <img
                          className="w-[48px] h-[48px] rounded-full object-cover"
                          src={
                            pharmacy?.logo.startsWith("http")
                              ? pharmacy?.logo
                              : `${API_BASE_URL}/public/img/${pharmacy?.logo}`
                          }
                          alt="pharmacy logo"
                        />
                      ) : (
                        <div
                          className="w-[48px] h-[48px] rounded-full bg-gray-200 flex items-center justify-center"
                          style={{
                            minWidth: 48,
                            minHeight: 48,
                            aspectRatio: "1/1",
                          }}
                        >
                          <span className="text-gray-500 text-sm leading-none">
                            N/A
                          </span>
                        </div>
                      )}

                      <div>
                        <h6 className="text-[16px] font-medium text-[#262262] mb-[5px]">
                          {pharmacy?.name}
                        </h6>
                        <p className="text-[14px] text-[#707B8A]">
                          ODS Code:{" "}
                          <span className="text-[#4B5563]">
                            {pharmacy?.odsCode}
                          </span>
                        </p>
                      </div>
                    </div>
                    {pharmacy?.id === userPharmacy?.id && (
                      <span className="h-[24px] w-[24px] bg-[#E8F1FF] rounded-full flex items-center justify-center text-[12px] text-[#3B82F6]">
                        <GiCheckMark />
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}

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

      <PharmacySwitchPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handlePasswordModalClose}
        pharmacy={selectedPharmacy}
        onConfirm={handlePasswordConfirm}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default PharmacistSwitchOption;
