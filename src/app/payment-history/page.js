"use client";
import React from "react";
import PaymentHistory from "@/components/PaymentHistory/PaymentHistory";
import { GoArrowLeft } from "react-icons/go";
import Link from "next/link";

export default function PaymentHistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/dashboard"
            className="h-[48px] w-[48px] min-w-[48px] bg-white flex items-center justify-center rounded-full border border-[#E7FBBD] hover:bg-gray-50 transition-colors"
          >
            <GoArrowLeft />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Payment History
            </h1>
            <p className="text-gray-600">
              View your subscription payments and billing history
            </p>
          </div>
        </div>

        {/* Payment History Component */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <PaymentHistory />
        </div>
      </div>
    </div>
  );
}
