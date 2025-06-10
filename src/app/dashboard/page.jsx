"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";
import { USER_ROLE } from "@/config/constant";
import DashboardLoginTechnician from "@/components/Dashboard/DashboardLoginTechnician";
import DashboardLoginPremises from "@/components/Dashboard/DashboardLoginPremises";
import DashboardLoginAdmin from "@/components/Dashboard/DashboardLoginAdmin";

const Dashboard = () => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  if (user?.role === USER_ROLE.PHARMACIST) {
    return <DashboardLoginTechnician />;
  } else if (user?.role === USER_ROLE.PHARMACY) {
    return <DashboardLoginPremises />;
  } else if (user?.role === USER_ROLE.ADMIN) {
    return <DashboardLoginAdmin />;
  }
};

export default Dashboard;
