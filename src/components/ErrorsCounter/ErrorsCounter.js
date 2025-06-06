"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ReportIcon from "@/assets/images/total-report-icon.svg";
import ErrorDetected from "@/assets/images/error-detected.png";
import MedicationError from "@/assets/images/medication-error.svg";
import ErrorLogged from "@/assets/images/error-logged.svg";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const CounterItem = ({ endValue, label, format, icon, iconBgColor, onClick }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const steps = 60;
    const increment = endValue / steps;
    let currentStep = 0;

    const updateCounter = () => {
      if (currentStep < steps) {
        start += increment;
        setCount(start);
        currentStep++;
        requestAnimationFrame(updateCounter);
      } else {
        setCount(endValue);
      }
    };

    updateCounter();
  }, [endValue]);

  const formatNumber = (num) => {
    if (format === "k" && num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, "") + "k";
    } else if (format === "+") {
      return Math.floor(num);
    }
    return Math.floor(num);
  };

  return (
    <div className="bg-white rounded-[14px] flex justify-between items-center p-[20px] gap-3 hover:cursor-pointer" onClick={onClick}>
      <div>
        <h3 className="counter text-[30px] mb-1 gap-2.5">
          {formatNumber(count)}
        </h3>
        <p className="text-[16px]">{label}</p>
      </div>
      <div
        className="h-[68px] w-[68px] min-w-[68px] flex items-center justify-center rounded-[10px]"
        style={{ backgroundColor: iconBgColor }}
      >
        <Image width={40} height={40} src={icon} alt="report-icon" />
      </div>
    </div>
  );
};

const ErrorsCounter = ({
  nearMissErrorCodeStats = [],
  incidentTypeCount = [],
}) => {
  const router = useRouter();
  const errorCodes = {
    D: "Incorrect Drug (D)",
    Q: "Incorrect Quantity (Q)",
    S: "Incorrect Strength (S)",
    F: "Incorrect Form (F)",
    none: "No Error Code",
    directions: "Incorrect Directions",
    labelling: "Labelling Error",
  };

  const errorPercentages = {};
  nearMissErrorCodeStats.forEach((stat) => {
    errorPercentages[stat.errorCode.toLowerCase() || "none"] = parseInt(stat.percentage) || 0;
  });

  const getPercentage = (code) => errorPercentages[code.toLowerCase()] || 0;

  const incidentCounts = {};
  incidentTypeCount.forEach((item) => {
    incidentCounts[item.incidentType] = parseInt(item.count) || 0;
  });

  const getIncidentCount = (type) => incidentCounts[type] || 0;

  return (
    <section className="grid 2xl:grid-cols-[7fr_6fr] gap-[30px] sm:mb-[30px] py-[25px] sm:py-0 bg-[#F8F9FB] sm:bg-transparent">
      <div className="grid sm:grid-cols-2 sm:gap-6 gap-5">
        <CounterItem
          endValue={getIncidentCount("Near Miss")}
          label="Near Miss"
          format="k"
          icon={ReportIcon}
          iconBgColor="#3B82F6"
          onClick={() => {
            router.push("/incident/near-miss");
          }}
        />
        <CounterItem
          endValue={getIncidentCount("Patient Safety Event")}
          label="Patient Safety Event"
          format="+"
          icon={ErrorDetected}
          iconBgColor="#A855F7"
          onClick={() => {
            router.push("/incident/patient-safety-event");
          }}
        />
        <CounterItem
          endValue={getIncidentCount("Prescribing Intervention")}
          label="Prescribing Intervention"
          format="k"
          icon={MedicationError}
          iconBgColor="#F97316"
          onClick={() => {
            router.push("/incident/prescribing-intervention");
          }}
        />
        <CounterItem
          endValue={getIncidentCount("Faulty Medication")}
          label="Faulty Medication"
          format="+"
          icon={ErrorLogged}
          iconBgColor="#00D0FF"
          onClick={() => {
            router.push("/incident/faulty-medication");
          }}
        />
      </div>

      <div className="p-[16px] sm:p-[20px] rounded-[10px] bg-white">
        <h4 className="text-[16px] sm:text-[20px] mb-4">
          Errors in Medication Dispensing
        </h4>
        <div className="flex flex-col gap-2.5">
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Incorrect Quantity (Q)</p>
            <Progress
              value={getPercentage("Q")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Incorrect Drug (D)</p>
            <Progress
              value={getPercentage("D")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Incorrect Strength (S)</p>
            <Progress
              value={getPercentage("S")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Incorrect Directions</p>
            <Progress
              value={getPercentage("directions")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Labelling Error</p>
            <Progress
              value={getPercentage("labelling")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">Incorrect Form (F)</p>
            <Progress
              value={getPercentage("F")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-2.5 sm:gap-x-5">
            <p className="text-[12px] sm:text-[14px]">No Error Code</p>
            <Progress
              value={getPercentage("none")}
              className="h-[10px] rounded-[0_22px_22px_0] bg-[#EAF2FB] [&>div]:bg-[#3B82F6] [&>div]:rounded-[0_22px_22px_0]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-[5fr_7fr] items-center gap-x-5">
            <p className="text-[12px] sm:text-[14px]"></p>
            <div className="flex justify-between">
              <p className="text-[12px] text-[#4B5563]">0</p>
              <p className="text-[12px] text-[#4B5563]">25</p>
              <p className="text-[12px] text-[#4B5563]">50</p>
              <p className="text-[12px] text-[#4B5563]">75</p>
              <p className="text-[12px] text-[#4B5563]">100</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorsCounter;
