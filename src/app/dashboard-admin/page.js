import ErrorsCounter2 from "@/components/ErrorsCounter2/ErrorsCounter2";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import ListOfPharmacies from "@/components/ListOfPharmacies/ListOfPharmacies";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import Image from "next/image";

const DashboardAdmin = () => {
  return (
    <div>
      <Layout>
        <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]">
            <Header/>
            <ErrorsCounter2/>
            <ListOfPharmacies/>
            <MobileNav/>
        </div>
      </Layout>
    </div>
  )
}

export default DashboardAdmin
