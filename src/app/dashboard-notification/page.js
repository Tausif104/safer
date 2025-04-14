import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import MobileNav from "@/components/MobileNav/MobileNav";
import React from "react";
import DashboardNotificationTable from "@/components/DashboardNotification/DashboardNotification";

const DashboardNotification = () => {
  return (
    <div>
      <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]'>
          <Header />
          <DashboardNotificationTable />
          <MobileNav />
        </div>
      </Layout>
    </div>
  );
};

export default DashboardNotification;
