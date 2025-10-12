import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import ErrorsCounter from "../ErrorsCounter/ErrorsCounter";
import { useState, useEffect } from "react";
import api from "@/lib/api-interceptor";
import { API_BASE_URL } from "@/config/constant";
import LoadingComp from "../LoadingComp/LoadingComp";
import useAuthStore from "@/store/useAuthStore";

export default function DashboardLoginTechnician() {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentIncidents, setRecentIncidents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pharmacy } = useAuthStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await api.get(
          `/api/v1/dashboard/stats?odsCode=${pharmacy?.odsCode}`
        );
        setDashboardStats(statsResponse.data.data);

        const incidentsResponse = await api.get(
          `/api/v1/dashboard/recent-incidents?odsCode=${pharmacy?.odsCode}`
        );
        setRecentIncidents(incidentsResponse.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pharmacy?.odsCode]);

  return (
    <>
      <DashboardLayout requireSubscription={false}>
        {loading ? (
          <LoadingComp />
        ) : error ? (
          <div className="text-red-500 p-4">
            Error loading dashboard data: {error}
          </div>
        ) : (
          <>
            <ErrorsCounter
              nearMissErrorCodeStats={dashboardStats.nearMissErrorCodeStats}
              incidentTypeCount={dashboardStats.incidentTypeCount}
            />
            <RecentIncedientsLogged recentIncidents={recentIncidents} />
          </>
        )}
      </DashboardLayout>
    </>
  );
}
