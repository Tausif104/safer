import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ErrorsCounter from "../ErrorsCounter/ErrorsCounter";

export default function DashboardLoginPremises() {
  return (
    <>
      <DashboardLayout>
        <ErrorsCounter />
        <RecentIncedientsLogged />
      </DashboardLayout>
    </>
  );
}
