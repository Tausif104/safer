"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import useAuthStore from "../../store/useAuthStore";

const ConfigurationStep3 = () => {
  const router = useRouter();
  const { token: storeToken, pharmacy } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("Please agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(
        `${API_BASE_URL}/api/v1/pharmacies/${pharmacy.id}`,
        { hasAgreedTnc: true },
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      );

      router.push("/dashboard");
    } catch (error) {
      console.error("Failed to update pharmacy:", error);
      alert("Failed to update pharmacy details");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pt-[20px] sm:pt0">
      <div className="flex justify-center sm:justify-between items-center flex-wrap sm:flex-nowrap gap-4 mb-[30px]">
        <div className="flex items-center gap-4">
          <Link
            href=""
            className="h-[48px] w-[48px] min-w-[48px] bg-white flex items-center justify-center rounded-full border border-[#E7FBBD]"
          >
            <GoArrowLeft />
          </Link>
          <h3 className="text-[18px] md:text-[24px] 2xl:text-[32px]">
            Company Configuration
          </h3>
        </div>
        <div className="flex justify-between w-[250px] md:w-[380px] relative z-10 before:absolute before:left-0 before:top-[50%] before:h-0.5 before:w-full before:content-null before:bg-[#E2F3B2] before:-z-10">
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item active">
            1
          </div>
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item active">
            2
          </div>
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item active">
            3
          </div>
        </div>
      </div>
      <div className="bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]">
        <h4 className="text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]">
          3. Legal Information
        </h4>
        <form onSubmit={handleSubmit}>
          <div>
            <h5 className="text-[#262262] text-[14px] xl:text-[18px] mb-3">
              Legal Information & Terms & Conditions for SafeRX
            </h5>
            <h5 className="text-[#262262] text-[14px] xl:text-[18px] mb-[15px] xl:mb-[50px]">
              By using SafeRX, you agree to our Terms & Conditions:
            </h5>
            <ol className="list-decimal pl-[25px] flex flex-col gap-3 mb-[15px] xl:mb-[50px] text-[14px] xl:text-[18px]">
              <li>
                User Responsibilities: Pharmacies and employees must ensure
                accurate prescription handling.
              </li>
              <li>
                Data Privacy: We collect and store user data securely, following
                GDPR compliance.
              </li>
              <li>
                Incident Reporting: Pharmacy owners can log discrepancies, which
                employees acknowledge.
              </li>
              <li>
                Liability: SafeRX is not responsible for errors in prescription
                fulfillment.
              </li>
              <li>
                Employment Flexibility: Employees can work across multiple
                pharmacies without restrictions.
              </li>
              <li>
                Modifications: Terms may change, and users must stay updated.
              </li>
              <li>Disputes: Governed under UK law.</li>
            </ol>
            <h5 className="text-[#262262] mb-[40px]  text-[14px] xl:text-[18px]">
              For full details, visit our Privacy Policy & Terms of Service
              pages.
            </h5>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 items-center">
            <label className="relative flex items-center gap-[10px] text-[#374151] text-[16px] sm:text-[18px]">
              <input
                className="h-[15px] sm:h-[20px] w-[15px] sm:w-[20px]"
                type="checkbox"
                name="agree"
                id="agree"
                checked={isAgreed}
                onChange={(e) => setIsAgreed(e.target.checked)}
              />
              Agree terms & conditions
            </label>
            <div className="text-center">
              <Button
                type="submit"
                className="primary-btn w-full cursor-pointer"
                disabled={isSubmitting || !isAgreed}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Spinner size="sm" className="text-white" />
                    <span>Updating...</span>
                  </div>
                ) : (
                  "Agree & Continue"
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfigurationStep3;
