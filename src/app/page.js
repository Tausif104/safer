"use client";
import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import LoadingComp from "@/components/LoadingComp/LoadingComp";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import Image from "next/image";
import DemoHome from "@/components/DemoHome";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'pharmacist') {
      router.push('/dashboard-login-technician');
    } else if (user?.role === 'pharmacy') {
      router.push('/dashboard-login-premises');
    }
  }, [user]);

  return (
    <>
      {/* <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]'>
          <Header />
          <ErrorsCounter />
          <RecentIncedientsLogged />
          <MobileNav />
        </div>
      </Layout> */}
      {!isAuthenticated && <DemoHome />}
    </>
  );
}