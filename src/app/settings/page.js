"use client";
import React from "react";
import UserSettings from "@/components/settings/UserSettings";
import PharmacySettings from "@/components/settings/PharmacySettings";
import Header3 from "@/components/Header3/Header3";
import Layout from "@/components/Layout/Layout";
import MobileNav from "@/components/MobileNav/MobileNav";
import useAuthStore from "@/store/useAuthStore";
import { USER_ROLE } from "@/config/constant";

const SettingsPage = () => {
  const { user } = useAuthStore();
  const isPharmacy = user?.role === USER_ROLE.PHARMACY;

  return (
    <Layout>
      <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]">
        <Header3 />
        <section className="pt-[20px] sm:pt0">
          <div className="flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap gap-4 mb-[30px]">
            <div className="flex items-center gap-4">
              <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">
                Settings
              </h3>
            </div>
          </div>
          <div className="bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]">
            <UserSettings />
            {isPharmacy && (
              <div className="mt-[40px] pt-[40px] border-t border-[#E7FBBD]">
                <PharmacySettings />
              </div>
            )}
          </div>
        </section>
        <MobileNav />
      </div>
    </Layout>
  );
};

export default SettingsPage;
