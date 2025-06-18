"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PharmacistList from "@/components/Pharmacist/PharmacistList";

const PharmacistPage = () => {
  return (
    <DashboardLayout>
      <PharmacistList />
    </DashboardLayout>
  );
};

export default PharmacistPage;
