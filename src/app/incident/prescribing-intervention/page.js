import React from "react";
import Layout from "@/components/Layout/Layout";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import PrescribingIntervention from "@/components/PrescribingIntervention/PrescribingIntervention";

const PrescribingInterventionPage = () => {
  return (
    <div>
      <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]'>
          <Header />
          <PrescribingIntervention />
          <MobileNav />
        </div>
      </Layout>
    </div>
  );
};

export default PrescribingInterventionPage;
