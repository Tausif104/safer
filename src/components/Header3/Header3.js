"use client";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SearchIcon from "@/assets/images/search-icon.svg";
import Bell from "@/assets/images/bell.svg";
import userProfile from "@/assets/images/user-profile.svg";
import userProfile2 from "@/assets/images/user-profile2.svg";
import userProfile3 from "@/assets/images/user-profile3.svg";
import { API_BASE_URL, USER_ROLE } from "@/config/constant";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LiaAngleDownSolid } from "react-icons/lia";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useRootContext } from "@/provider/context";
import { GiCheckMark } from "react-icons/gi";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import axios from "axios";
import ViewIncidentModal from "@/components/Incident/ViewIncidentModal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LuMapPin } from "react-icons/lu";
import PharmacistSwitchOption from "./PharmacistSwitchOption";
import PremiseNameOds from "./PremiseNameOds";
import toast, { Toaster } from "react-hot-toast";
import AdminNameEmail from "./AdminNameEmail";

const Header = () => {
  const { user, pharmacy, logout } = useAuthStore();
  const router = useRouter();
  const { handleToggle } = useRootContext();
  const [searchResult, setSearchResult] = useState(null);
  const [showResultDialog, setShowResultDialog] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.search.value;

    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/incidents/full-search?query=${encodeURIComponent(
          searchQuery
        )}&odsCode=${pharmacy?.odsCode}`
      );

      if (response.status === 200) {
        if (response.data.data) {
          setSearchResult(response.data.data);
        }
        setShowResultDialog(true);
      } else {
        console.error("Search failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error performing search:", error);
      alert(
        error.response?.data?.message || "Search failed. Please try again."
      );
    }
  };

  const handleCloseModal = () => {
    setSearchResult(null);
  };

  const handleCloseResultDialog = () => {
    setShowResultDialog(false);
  };

  const handleIncidentClick = async (item) => {
    const incidentForModal = {
      id: item.id,
      incidentType: item.source.toUpperCase().replace("-", "_"),
    };
    setSelectedIncident(incidentForModal);
  };

  const handleCloseIncidentModal = () => {
    setSelectedIncident(null);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const showSecondDiv = user?.role !== USER_ROLE.ADMIN;

  return (
    <>
      <Toaster />
      <header className="bg-[#F8FEE6] sm:bg-white py-[20px] sm:py-[15px] px-[20px] rounded-[12px] sm:shadow-[6px_16px_50px_6px_rgba(38,57,136,0.06)] flex items-center mx-[-20px] sm:mx-0 sm:mb-[30px]">
        <div
          className={`${
            showSecondDiv ? "flex-1 sm:justify-end" : "w-full"
          } flex justify-between items-center gap-[15px] sm:order-2`}
        >
          {user?.role === USER_ROLE.PHARMACIST ? (
            <PharmacistSwitchOption />
          ) : user?.role === USER_ROLE.ADMIN ? (
            <AdminNameEmail user={user} />
          ) : (
            <PremiseNameOds pharmacy={pharmacy} />
          )}
          <div
            className={`flex gap-[10px] sm:order-1 ${
              showSecondDiv ? "" : "ml-auto"
            }`}
          >
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
          <form
            onSubmit={handleSearch}
            className="relative group hidden sm:flex"
          >
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
          </form>
        </div>
        {user?.role !== USER_ROLE.ADMIN && (
          <div className="sm:order-1 flex items-center gap-[20px]">
            <div className="gap-[14px] hidden xl:flex">
              <span className="h-[48px] w-[48px] min-w-[48px] border border-[#E7FBBD] sm:border-[#DAECFF] flex justify-center items-center rounded-full cursor-pointer bg-white">
                <LuMapPin />
              </span>
              <div className="">
                <p className="text-[12px] mb-[5px]">Pharmacy Address:</p>
                <p className="text-[16px]">
                  {`${pharmacy?.addressLine1}, ${pharmacy?.town}, ${pharmacy?.postCode}` ||
                    "N/A"}
                </p>
              </div>
            </div>
            <form
              onSubmit={handleSearch}
              className="flex relative group sm:hidden w-full"
            >
              <input
                className="w-full border border-[#E7FBBD] sm:border-[#DAECFF] bg-white leading-[60px] px-[24px] pr-[50px] rounded-full placeholder:text-[#707B8A] focus:outline-0 focus:shadow-none transition-all duration-300 origin-right"
                type="search"
                name="search"
                id="search"
                placeholder="Search here"
              />
              <button
                className="h-[48px] w-[48px] min-w-[48px] border border-[#DAECFF] flex items-center justify-center rounded-full bg-white absolute right-[7px] top-[7px] cursor-pointer"
                type="submit"
              >
                <Image className="" width={20} src={SearchIcon} alt="" />
              </button>
            </form>
          </div>
        )}
      </header>

      <Dialog open={showResultDialog} onOpenChange={handleCloseResultDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Search Results</DialogTitle>
          </DialogHeader>
          {Array.isArray(searchResult) && searchResult.length > 0 ? (
            <div className="py-4 space-y-3">
              {searchResult.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleIncidentClick(item)}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-200 shadow-sm"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full capitalize">
                        {item.source.replace("-", " ")}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {item.referenceNumber}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(item.createdAt)}
                    </span>
                  </div>
                  <p
                    className="text-sm text-gray-700 overflow-hidden"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {item.description || "No description available"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-4 text-center text-gray-500">
              No incidents found
            </div>
          )}
        </DialogContent>
      </Dialog>

      {selectedIncident && (
        <ViewIncidentModal
          incident={selectedIncident}
          onClose={handleCloseIncidentModal}
        />
      )}
    </>
  );
};

export default Header;
