"use client";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import DispenserList from "@/components/Dispenser/DispenserList";
import React from "react";

const DispenserPage = () => {
  return (
    <DashboardLayout>
      <DispenserList />
    </DashboardLayout>
  )
};

export default DispenserPage;