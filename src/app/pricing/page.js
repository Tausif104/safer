import { Suspense } from "react";
import Header3 from "@/components/Header3/Header3";
import Layout from "@/components/Layout/Layout";
import MobileNav from "@/components/MobileNav/MobileNav";
import Pricing from "@/components/Pricing/Pricing";

export default function Home() {
  return (
    <>
      <Layout>
        <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]">
          <Header3 />
          <Suspense
            fallback={
              <div className="text-center py-12">Loading pricing...</div>
            }
          >
            <Pricing />
          </Suspense>
          <MobileNav />
        </div>
      </Layout>
    </>
  );
}
