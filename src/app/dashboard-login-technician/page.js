"use client";
import ErrorsCounter from "@/components/ErrorsCounter/ErrorsCounter";
import Header3 from "@/components/Header3/Header3";
import Layout from "@/components/Layout/Layout";
import LoadingComp from "@/components/LoadingComp/LoadingComp";
import MobileNav from "@/components/MobileNav/MobileNav";
import RecentIncedientsLogged from "@/components/RecentIncedentsLogged/RecentIncedientsLogged";
import RecentIncidents from "@/components/RecentIncidents/RecentIncidents";
import { API_BASE_URL } from "@/config/constant";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentIncidents, setRecentIncidents] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('whats wrong here');
    const fetchData = async () => {
      try {
        const statsResponse = await axios.get(
          `${API_BASE_URL}/api/v1/dashboard/stats`
        );
        setDashboardStats(statsResponse.data.data);

        const incidentsResponse = await axios.get(
          `${API_BASE_URL}/api/v1/dashboard/recent-incidents`
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
  }, []);

  return (
    <>
      <Layout>
        <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]">
          <Header3 />
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
