"use client";
import { useEffect, useState } from "react";
import { FaExclamationTriangle, FaInfoCircle } from "react-icons/fa";

const SubscriptionAlert = () => {
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const message = localStorage.getItem("subscription_redirect_message");
      const type = localStorage.getItem("subscription_redirect_type");

      if (message) {
        setAlert({ message, type: type || "info" });
        localStorage.removeItem("subscription_redirect_message");
        localStorage.removeItem("subscription_redirect_type");
      }
    }
  }, []);

  if (!alert) return null;

  const isError =
    alert.type === "trial_expired" || alert.type === "subscription_expired";

  return (
    <div
      className={`mb-6 p-4 rounded-lg border ${
        isError
          ? "bg-red-50 border-red-200 text-red-800"
          : "bg-blue-50 border-blue-200 text-blue-800"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {isError ? (
            <FaExclamationTriangle className="text-red-600 text-xl" />
          ) : (
            <FaInfoCircle className="text-blue-600 text-xl" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-1">
            {alert.type === "trial_expired" && "Trial Period Ended"}
            {alert.type === "subscription_expired" && "Subscription Expired"}
            {!alert.type && "Subscription Required"}
          </h3>
          <p className="text-sm">{alert.message}</p>
        </div>
        <button
          onClick={() => setAlert(null)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SubscriptionAlert;
