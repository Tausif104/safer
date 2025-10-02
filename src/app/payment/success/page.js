"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCircleCheck } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { paymentAPI } from "@/services/paymentService";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found");
      setLoading(false);
      return;
    }

    const fetchSessionData = async () => {
      try {
        const response = await paymentAPI.getCheckoutSession(sessionId);
        setSessionData(response.data);
      } catch (err) {
        console.error("Error fetching session data:", err);
        setError("Failed to verify payment");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionData();
  }, [searchParams]);

  const handleContinue = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Spinner size="lg" />
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Payment Verification Failed
          </h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button
            onClick={() => router.push("/pricing")}
            className="primary-btn"
          >
            Return to Pricing
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-lg">
        <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
          <FaCircleCheck className="text-green-600 text-2xl" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-6">
          Thank you for your subscription. Your account has been activated and
          you can now access all features.
        </p>

        {sessionData && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-2">
              Payment Details:
            </h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Amount:</strong> $
                {(sessionData.amount_total / 100).toFixed(2)}
              </p>
              <p>
                <strong>Currency:</strong> {sessionData.currency?.toUpperCase()}
              </p>
              <p>
                <strong>Customer:</strong> {sessionData.customer_details?.email}
              </p>
              {sessionData.subscription && (
                <p>
                  <strong>Subscription ID:</strong>{" "}
                  {sessionData.subscription.id}
                </p>
              )}
            </div>
          </div>
        )}

        <Button onClick={handleContinue} className="primary-btn w-full">
          Continue to Dashboard
        </Button>
      </div>
    </div>
  );
}
