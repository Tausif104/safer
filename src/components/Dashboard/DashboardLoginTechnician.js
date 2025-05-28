import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header2 from "@/components/Header2/Header2";
import Layout from "@/components/Layout/Layout";
import LoadingComp from "@/components/LoadingComp/LoadingComp";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import Image from "next/image";

export default function DashboardLoginPremises() {
  return (
    <>
      <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]'>
          <Header2 />
          <ErrorsCounter />
          <RecentIncedientsLogged />
          <MobileNav />
        </div>
      </Layout>
    </>
  );
}
