import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import ListOfPharmacies from "@/components/ListOfPharmacies/ListOfPharmacies";
import ListOfPharmacist from "@/components/ListOfPharmacist/ListOfPharmacist";
import ListOfPharmacistPending from "@/components/ListOfPharmacistPending/ListOfPharmacistPending";
import MobileNav from "@/components/MobileNav/MobileNav";

const DashboardAdmin = () => {
  return (
    <div>
      <Layout>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]'>
          <Header />
          <ErrorsCounter />
          <ListOfPharmacies />
          <ListOfPharmacist />
          <ListOfPharmacistPending />
          <MobileNav />
        </div>
      </Layout>
    </div>
  );
};

export default DashboardAdmin;
