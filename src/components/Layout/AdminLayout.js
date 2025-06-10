import React from "react";
import Layout2 from "../Layout2/Layout2";
import Header from "../Header/Header";
import MobileNav2 from "../MobileNav2/MobileNav2";

const AdminLayout = ({ children }) => {
  return (
    <Layout2>
      <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px bg-[#F8F9FB]">
        <Header />
        {children}
        <MobileNav2 />
      </div>
    </Layout2>
  );
};

export default AdminLayout;
