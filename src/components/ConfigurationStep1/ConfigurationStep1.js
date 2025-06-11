"use client";
import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import useAuthStore from "../../store/useAuthStore";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";

const ConfigurationStep1Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const { token: storeToken, pharmacy, setPharmacy } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const routeToken = searchParams.get("token");
      const token = routeToken || storeToken;

      if (!token) {
        setIsVerifying(false);
        setIsVerified(false);
        return;
      }

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/api/v1/auth/verify-token`,
          { token }
        );

        if (data) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (error) {
        setIsVerified(false);
      } finally {
        setIsVerifying(false);
      }
    };

    verifyToken();
  }, [router, searchParams, storeToken]);

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Verifying...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.target);

    const pharmacyData = {
      name: formData.get("name"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      odsCode: formData.get("ods"),
      gphcPremisesNumber: formData.get("gphc"),
    };

    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/v1/pharmacies/${pharmacy.id}`,
        pharmacyData,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      );

      setPharmacy(res.data?.data);

      router.push("/configuration-step2");
    } catch (error) {
      console.error("Failed to update pharmacy details:", error);
      alert("Failed to update pharmacy details");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVerifying && !isVerified) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h1 className="text-[24px] font-semibold text-[#262262]">
          Access Denied
        </h1>
        <p className="text-[16px] text-[#707B8A] text-center max-w-[400px]">
          Your session has expired or you don&apos;t have permission to access
          this page. Please try again or contact support.
        </p>
        <Link href="/login" className="primary-btn mt-4">
          Back to Login
        </Link>
      </div>
    );
  }

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
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item">
            2
          </div>
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item">
            3
          </div>
        </div>
      </div>
      <div className="bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]">
        <h4 className="text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]">
          1. Pharmacy Information
        </h4>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Pharmacy name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={pharmacy?.name}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Phone number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              defaultValue={pharmacy?.phone}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Address Line 1
            </label>
            <input
              type="text"
              name="addressLine1"
              id="addressLine1"
              defaultValue={pharmacy?.addressLine1}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Town
            </label>
            <input
              type="text"
              name="town"
              id="town"
              defaultValue={pharmacy?.town}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Post Code
            </label>
            <input
              type="text"
              name="postCode"
              id="postCode"
              defaultValue={pharmacy?.postCode}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              ODS code
            </label>
            <input
              type="text"
              name="ods"
              id="ods"
              defaultValue={pharmacy?.odsCode}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              GPhc premise number (optional)
            </label>
            <input
              type="text"
              name="gphc"
              id="gphc"
              defaultValue={pharmacy?.gphcPremisesNumber}
              className="bg-[#F8F9FB] text-[#262262] placeholder:text-[#262262]"
            />
          </div>
          <div className="flex justify-between gap-3 items-center">
            <Button
              type="button"
              onClick={() => router.push("/configuration-step2")}
              className="!bg-transparent !border !border-[#262262] !text-[#262262] hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729] cursor-pointer whitespace-nowrap"
            >
              Skip
            </Button>
            <Button
              type="submit"
              className="primary-btn w-full sm:w-[390px] cursor-pointer"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" className="text-white" />
                  <span>Updating...</span>
                </div>
              ) : (
                "Next"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

const ConfigurationStep1 = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          Loading...
        </div>
      }
    >
      <ConfigurationStep1Content />
    </Suspense>
  );
};

export default ConfigurationStep1;
