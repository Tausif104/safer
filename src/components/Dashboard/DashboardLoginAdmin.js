import React from "react";
import ErrorsCounterFull from "../ErrorsCounterFull/ErrorsCounterFull";
import ErrorsCounter2 from "../Charts/Chatrs";
import ListOfPharmacies from "../ListOfPharmacies/ListOfPharmacies";
import ListOfPharmacist from "../ListOfPharmacist/ListOfPharmacist";
import { PHARMACIST_STATUS } from "@/config/constant";
import DashboardLayout from "../Layout/DashboardLayout";

const DashboardLoginAdmin = () => {
  return (
    <DashboardLayout requireSubscription={false}>
      <ErrorsCounterFull />
      <ErrorsCounter2 />
      <ListOfPharmacies />
      <ListOfPharmacist />
      <ListOfPharmacist status={PHARMACIST_STATUS.PENDING} />
    </DashboardLayout>
  );
};

export default DashboardLoginAdmin;
