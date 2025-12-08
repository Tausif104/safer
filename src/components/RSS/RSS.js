"use client";
import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import Warning from "@/assets/images/warning.svg";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import api from "@/lib/api-interceptor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RSS = () => {
  const [loading, setLoading] = useState(true);
  const [rssFeed, setRSSFeed] = useState([]);
  const [pageTitle, setPageTitle] = useState("");
  const [responses, setResponses] = useState({});
  const [submittedResponses, setSubmittedResponses] = useState({});
  const [selectedMonthFilter, setSelectedMonthFilter] = useState("all");
  const { user, pharmacy, _hasHydrated } = useAuthStore();

  useEffect(() => {
    // Wait for store to hydrate before making API calls
    if (!_hasHydrated) {
      return;
    }

    const fetchRSS = async () => {
      try {
        const res = await api.get(`/api/v1/rss`);
        setRSSFeed(res.data?.data?.items || []);
        setPageTitle(res.data?.data?.title);
      } catch (error) {
        console.error("Error fetching RSS:", error);
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchRSS();
  }, [_hasHydrated]);

  useEffect(() => {
    // Wait for store to hydrate before making API calls
    if (!_hasHydrated || !user?.id || !pharmacy?.id) {
      return;
    }

    const fetchMyResponses = async () => {
      const res = await api.get(`/api/v1/rss/my-responses`, {
        params: {
          userId: user?.id,
          pharmacyId: pharmacy?.id,
        },
      });
      const mappedData = {};
      res.data?.data.forEach((item) => {
        mappedData[item.rssFeedId] = {
          action: item.isAcknowledged ? "acknowledge" : "deny",
          comments: item.comment,
          submittedAt: item.createdAt,
        };
      });
      setSubmittedResponses(mappedData);
    };
    fetchMyResponses();
  }, [pharmacy?.id, user?.id, _hasHydrated]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Get unique month/year combinations from RSS feed
  const availableMonths = useMemo(() => {
    const monthMap = new Map();
    rssFeed.forEach((item) => {
      const dateString = item.pubDate || item.isoDate;
      if (dateString) {
        const date = new Date(dateString);
        const monthYear = date.toLocaleDateString("en-GB", {
          month: "long",
          year: "numeric",
        });
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        if (!monthMap.has(key)) {
          monthMap.set(key, monthYear);
        }
      }
    });
    return Array.from(monthMap.entries())
      .sort((a, b) => {
        const [yearA, monthA] = a[0].split("-").map(Number);
        const [yearB, monthB] = b[0].split("-").map(Number);
        if (yearA !== yearB) return yearB - yearA;
        return monthB - monthA;
      })
      .map(([key, label]) => ({ key, label }));
  }, [rssFeed]);

  // Filter RSS feed based on selected month
  const filteredRSSFeed = useMemo(() => {
    if (selectedMonthFilter === "all") {
      return rssFeed;
    }

    const [year, month] = selectedMonthFilter.split("-").map(Number);
    return rssFeed.filter((item) => {
      const dateString = item.pubDate || item.isoDate;
      if (!dateString) return false;
      const date = new Date(dateString);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }, [rssFeed, selectedMonthFilter]);

  const getAlertType = (title) => {
    if (title?.toLowerCase().includes("safety roundup")) {
      return "MHRA Safety Roundup";
    } else if (title?.toLowerCase().includes("field safety notice")) {
      return "Field safety notice";
    } else if (
      title?.toLowerCase().includes("medicines recall") ||
      title?.toLowerCase().includes("notification")
    ) {
      return "Medicines recall/notification";
    }
    return "Safety Alert";
  };

  const handleResponseChange = (itemId, field, value) => {
    setResponses((prev) => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const handleSubmitResponse = (itemId) => {
    const response = responses[itemId];
    if (!response?.action) {
      toast.error("Please select Acknowledge or Deny");
      return;
    }

    setSubmittedResponses((prev) => ({
      ...prev,
      [itemId]: {
        ...response,
        submittedAt: new Date().toISOString(),
      },
    }));

    setResponses((prev) => ({
      ...prev,
      [itemId]: {},
    }));

    api.post(`/api/v1/rss/response`, {
      rssFeedId: itemId,
      isAcknowledged: response.action === "acknowledge",
      comment: response.comments,
      userId: user?.id,
      pharmacyId: pharmacy?.id,
    });
    toast.success(`Response ${response.action.toLowerCase()}d successfully`);
  };

  const getStatusBadge = (itemId) => {
    const submittedResponse = submittedResponses[itemId];
    if (!submittedResponse) return null;

    const isAcknowledged = submittedResponse.action === "acknowledge";
    return (
      <div
        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          isAcknowledged
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {isAcknowledged ? "✓ Acknowledged" : "✗ Denied"}
      </div>
    );
  };

  if (loading) {
    return (
      <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
        <div className="flex items-center justify-center h-64">
          <div className="text-[#707B8A]">Loading RSS feed...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-[20px] sm:text-[28px] font-semibold text-[#262262]">
            {pageTitle}
          </h1>
          {rssFeed.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-[13px] sm:text-[14px] font-medium text-[#262262] whitespace-nowrap">
                Filter by month:
              </label>
              <Select value={selectedMonthFilter} onValueChange={setSelectedMonthFilter}>
                <SelectTrigger className="w-[180px] sm:w-[200px] h-9 text-[13px]">
                  <SelectValue placeholder="Select month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Months</SelectItem>
                  {availableMonths.map(({ key, label }) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-4">
          {filteredRSSFeed.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#707B8A]">
                {rssFeed.length === 0
                  ? "No RSS feed items available"
                  : "No alerts found for the selected month"}
              </p>
            </div>
          ) : (
            filteredRSSFeed.map((item, index) => (
              <div
                key={item.id || index}
                className="border border-[#DAECFF] rounded-[8px] p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-[16px] sm:text-[20px] font-semibold text-[#8B5CF6] mb-1 flex-1 pr-3">
                    {item.title}
                  </h2>
                  {getStatusBadge(item.id || index)}
                </div>
                <p className="text-[13px] sm:text-[15px] text-[#374151] mb-3">
                  {item.summary}
                </p>

                <div className="flex flex-wrap gap-4 text-[12px] sm:text-[13px] mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#262262]">
                      Alert type:
                    </span>
                    <span className="text-[#707B8A]">
                      {getAlertType(item.title)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#262262]">Issued:</span>
                    <span className="text-[#707B8A]">
                      {formatDate(item.pubDate || item.isoDate)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  {item.link && (
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#2563EB] font-medium text-[13px]"
                    >
                      <Image
                        src={Warning}
                        alt="warning icon"
                        width={14}
                        height={14}
                        className="w-3.5 h-3.5"
                      />
                      View Full Alert
                    </Link>
                  )}

                  {submittedResponses[item.id || index] && (
                    <div className="text-xs text-[#707B8A]">
                      Responded:{" "}
                      {new Date(
                        submittedResponses[item.id || index].submittedAt
                      ).toLocaleDateString("en-GB")}
                    </div>
                  )}
                </div>

                {!submittedResponses[item.id || index] && (
                  <div className="mt-4 p-3 bg-[#F8F9FA] rounded-[6px] border border-[#E5E7EB]">
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-[#262262] mb-3">
                      Your Response
                    </h3>

                    <div className="flex gap-4 mb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`response-${item.id || index}`}
                          value="acknowledge"
                          checked={
                            responses[item.id || index]?.action ===
                            "acknowledge"
                          }
                          onChange={(e) =>
                            handleResponseChange(
                              item.id || index,
                              "action",
                              e.target.value
                            )
                          }
                          className="w-3.5 h-3.5 text-[#3B82F6] border-[#D1D5DB] focus:ring-[#3B82F6] focus:ring-1"
                        />
                        <span className="text-[13px] text-[#262262]">
                          Acknowledge
                        </span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name={`response-${item.id || index}`}
                          value="deny"
                          checked={
                            responses[item.id || index]?.action === "deny"
                          }
                          onChange={(e) =>
                            handleResponseChange(
                              item.id || index,
                              "action",
                              e.target.value
                            )
                          }
                          className="w-3.5 h-3.5 text-[#EF4444] border-[#D1D5DB] focus:ring-[#EF4444] focus:ring-1"
                        />
                        <span className="text-[13px] text-[#262262]">Deny</span>
                      </label>
                    </div>

                    <div className="mb-3">
                      <textarea
                        rows={2}
                        placeholder="Add your comments here... (Optional)"
                        value={responses[item.id || index]?.comments || ""}
                        onChange={(e) =>
                          handleResponseChange(
                            item.id || index,
                            "comments",
                            e.target.value
                          )
                        }
                        className="w-full px-3 py-2 border border-[#D1D5DB] rounded-[4px] text-[13px] placeholder-[#9CA3AF] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:border-transparent resize-none"
                      />
                    </div>

                    <button
                      onClick={() => handleSubmitResponse(item.id || index)}
                      className="px-3 py-1.5 bg-[#3B82F6] text-white text-[13px] font-medium rounded-[4px] hover:bg-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#3B82F6] focus:ring-offset-1 transition-colors"
                    >
                      Submit Response
                    </button>
                  </div>
                )}

                {submittedResponses[item.id || index] &&
                  submittedResponses[item.id || index].comments && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-[4px] border-l-2 border-gray-300">
                      <p className="text-xs text-[#707B8A] mb-1">
                        Your comment:
                      </p>
                      <p className="text-[13px] text-[#374151]">
                        {submittedResponses[item.id || index].comments}
                      </p>
                    </div>
                  )}
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default RSS;
