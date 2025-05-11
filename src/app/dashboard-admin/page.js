import ErrorsCounterFull from "@/components/ErrorsCounterFull/ErrorsCounterFull";
import ErrorsCounter2 from "@/components/Charts/Chatrs";
import Header from "@/components/Header/Header";
import Layout2 from "@/components/Layout2/Layout2";

import ListOfPharmacies from "@/components/ListOfPharmacies/ListOfPharmacies";
import ListOfPharmacist from "@/components/ListOfPharmacist/ListOfPharmacist";
import ListOfPharmacistPending from "@/components/ListOfPharmacistPending/ListOfPharmacistPending";
import MobileNav2 from "@/components/MobileNav2/MobileNav2";

const DashboardAdmin = () => {
  return (
    <div>
      <Layout2>
        <div className='main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px bg-[#F8F9FB]'>
          <Header />
          <ErrorsCounterFull />
          <ErrorsCounter2 />
          <ListOfPharmacies />
          <ListOfPharmacist />
          <ListOfPharmacistPending />
          <MobileNav2 />
        </div>
      </Layout2>
    </div>
  );
};

export default DashboardAdmin;
