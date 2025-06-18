import React from "react";
import MainSidebar from "../MainSidebar/MainSidebar";
import Header3 from "../Header3/Header3";
import MobileNav from "../MobileNav/MobileNav";

const DashboardLayout = ({ children }) => {
  return (
    <>
      <MainSidebar />
      <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]">
        <Header3 />
        {children}
        <MobileNav />
      </div>
    </>
  );
};

export default DashboardLayout;
