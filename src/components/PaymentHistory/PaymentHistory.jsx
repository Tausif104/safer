"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FaCreditCard, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";
import useAuthStore from "@/store/useAuthStore";
import { paymentAPI } from "@/services/paymentService";

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token, user } = useAuthStore();

  useEffect(() => {
    const fetchPayments = async () => {
      if (!token) {
        setError("Please log in to view payment history");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await paymentAPI.getUserPaymentHistory(token);
        setPayments(response.data || []);
      } catch (error) {
        console.error("Error fetching payment history:", error);
        setError("Failed to load payment history");
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [token]);

  const formatAmount = (amount, currency = "usd") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "SUCCEEDED":
        return <FaCheckCircle className="text-green-600" />;
      case "PENDING":
        return <FaCalendarAlt className="text-yellow-600" />;
      case "FAILED":
        return <FaCreditCard className="text-red-600" />;
      default:
        return <FaCreditCard className="text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "SUCCEEDED":
        return "text-green-600 bg-green-50";
      case "PENDING":
        return "text-yellow-600 bg-yellow-50";
      case "FAILED":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Spinner size="lg" />
        <span className="ml-2">Loading payment history...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-600 mb-4">{error}</p>
        <Button
          onClick={() => window.location.reload()}
          className="primary-btn"
        >
          Try Again
        </Button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center p-8">
        <FaCreditCard className="mx-auto text-4xl text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No Payment History
        </h3>
        <p className="text-gray-600">
          You haven't made any payments yet. Your payment history will appear
          here once you subscribe to a plan.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment History</h2>
        <span className="text-sm text-gray-500">
          {payments.length} payment{payments.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  {getStatusIcon(payment.status)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {payment.description || "Subscription Payment"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {formatDate(payment.createdAt)}
                  </p>
                  {payment.subscription?.pricingPlan && (
                    <p className="text-xs text-gray-500">
                      Plan: {payment.subscription.pricingPlan.name}
                    </p>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {formatAmount(payment.amount, payment.currency)}
                </p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    payment.status
                  )}`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
