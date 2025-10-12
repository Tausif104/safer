import React from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import UserSettings from "@/components/settings/UserSettings";

const ProfilePage = () => {
  return (
    <DashboardLayout requireSubscription={false}>
      <div className="bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]">
        <UserSettings />
      </div>
    </DashboardLayout>
  );
};

export default ProfilePage;
