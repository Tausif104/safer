import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]">
            <Header/>
            <ErrorsCounter/>
            <RecentIncidents/>
            <MobileNav/>
        </div>
      </Layout>
    </>
  );
}
