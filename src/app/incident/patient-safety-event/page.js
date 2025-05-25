import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import MobileNav from "@/components/MobileNav/MobileNav";
import PatientSaftyEvent from "@/components/PatientSafetyEvent/PatientSafetyEvent";
import React from "react";

const PatientaftyPage = () => {
  return (
    <div>
      <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]'>
          <Header />
          <PatientSaftyEvent />
          <MobileNav />
        </div>
      </Layout>
    </div>
  );
};

export default PatientaftyPage;
