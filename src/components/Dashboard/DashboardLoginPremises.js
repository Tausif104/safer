"use client";
import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header3 from "@/components/Header3/Header3";
import LoadingComp from "@/components/LoadingComp/LoadingComp";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import { API_BASE_URL } from "@/config/constant";
import { useEffect, useState } from "react";
import api from "@/lib/api-interceptor";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import useAuthStore from "@/store/useAuthStore";
import { useSubscriptionStatus } from "@/hooks/useSubscriptionStatus";
import SubscriptionStatusScreen from "../SubscriptionStatusScreen/SubscriptionStatusScreen";

export default function DashboardLoginPremises() {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentIncidents, setRecentIncidents] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { pharmacy } = useAuthStore();
  const { canAccess, subscription, isTrialExpired } = useSubscriptionStatus();

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

    if (canAccess) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [pharmacy?.odsCode, canAccess]);

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
            {canAccess ? (
              <>
                <ErrorsCounter
                  nearMissErrorCodeStats={dashboardStats.nearMissErrorCodeStats}
                  incidentTypeCount={dashboardStats.incidentTypeCount}
                />
                <RecentIncedientsLogged recentIncidents={recentIncidents} />
              </>
            ) : (
              <SubscriptionStatusScreen
                subscription={subscription}
                isTrialExpired={isTrialExpired}
                canAccess={canAccess}
              />
            )}
          </>
        )}
      </DashboardLayout>
    </>
  );
}
