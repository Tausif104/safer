import DashboardLayout from "@/components/Layout/DashboardLayout";
import PharmacistList from "@/components/Pharmacist/PharmacistList";
import React from "react";

const PharmacistsApprovalPendingPage = () => {
  return (
    <DashboardLayout>
      <PharmacistList type="approval-pending" />
    </DashboardLayout>
  );
};

export default PharmacistsApprovalPendingPage;
