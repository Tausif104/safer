"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";
import LoadingComp from "@/components/LoadingComp/LoadingComp";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import Image from "next/image";
import Login from "@/components/Login/Login";

export default function Home() {
  const router = useRouter();
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentIncidents, setRecentIncidents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = false;

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard");
    }
  }, [router, isAuthenticated]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const statsResponse = await fetch(
          "https://saferx-api.onrender.com/api/v1/dashboard/stats"
        );

        if (!statsResponse.ok) {
          throw new Error(
            `Stats API request failed with status ${statsResponse.status}`
          );
        }

        const statsData = await statsResponse.json();
        setDashboardStats(statsData.data);

        const incidentsResponse = await fetch(
          "https://saferx-api.onrender.com/api/v1/dashboard/recent-incidents"
        );

        if (!incidentsResponse.ok) {
          throw new Error(
            `Incidents API request failed with status ${incidentsResponse.status}`
          );
        }

        const incidentsData = await incidentsResponse.json();
        setRecentIncidents(incidentsData.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (!isAuthenticated) {
    return <Login onSuccessfulLogin={handleSuccessfulLogin} />;
  }

  function handleSuccessfulLogin() {
    router.push("/dashboard");
  }

  return (
    <>
      <Layout>
        <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[70px] sm:pb-[30px]">
          <Header />
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
          <MobileNav />
        </div>
      </Layout>
    </>
  );
}
