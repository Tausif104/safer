"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function PaymentCancel() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full flex items-center justify-center">
          <span className="text-yellow-600 text-2xl">⚠️</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Canceled
        </h1>

        <p className="text-gray-600 mb-6">
          Your payment was canceled. No charges were made to your account. You
          can try again or choose a different plan.
        </p>

        <div className="space-y-3">
          <Button
            onClick={() => router.push("/pricing")}
            className="primary-btn w-full"
          >
            Return to Pricing
          </Button>

          <Button
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="w-full border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
