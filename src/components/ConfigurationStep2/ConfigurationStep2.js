"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoArrowLeft } from "react-icons/go";
import { FaCircleCheck } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API_BASE_URL, DEFAULT_PASSWORD, USER_ROLE } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAuthStore from "../../store/useAuthStore";

const schema = yup.object().shape({
  name: yup.string().required("Employee name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  gphc: yup.string().required("GPhC code is required"),
  role: yup.string().required("Role is required"),
});

const ConfigurationStep2 = () => {
  const router = useRouter();
  const { token: storeToken, pharmacy } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const createUser = async (data) => {
    setIsSubmitting(true);
    const userData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      role: data.role,
      gphcNumber: data.gphc,
      password: DEFAULT_PASSWORD,
    };

    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/users?pharmacyId=${pharmacy.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      );
      return true;
    } catch (error) {
      console.error("Failed to create user:", error);
      alert("Failed to create user");
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const onSubmit = async (data) => {
    const success = await createUser(data);
    if (success) {
      router.push("/configuration-step3");
    }
  };

  const handleAddEmployee = async (data) => {
    const success = await createUser(data);
    if (success) {
      reset();
    }
  };

  const handleSkip = () => {
    router.push("/configuration-step3");
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
          <div className="cursor-pointer font-medium border text-[#262262] border-[#D7EEA9] bg-[#F3FDD6] h-[40px] md:h-[48px] w-[40px] md:w-[48px] min-wi-[40px] md:min-w-[48px] text-[14px] md:text-[18px] rounded-full flex items-center justify-center step-item">
            3
          </div>
        </div>
      </div>
      <div className="bg-white p-[16px] sm:p-[30px] sm:pb-[75px] rounded-[14px] sm:rounded-[16px]">
        <h4 className="text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]">
          2. Employee Information
        </h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Employee name
            </label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter employee name"
              className="bg-[#F8F9FB] text-[#262262]"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Phone number
            </label>
            <input
              type="text"
              {...register("phone")}
              placeholder="Enter phone number"
              className="bg-[#F8F9FB] text-[#262262]"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Email Address
            </label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter email address"
              className="bg-[#F8F9FB] text-[#262262]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              GPhC code
            </label>
            <input
              type="text"
              {...register("gphc")}
              placeholder="Enter GPhC code"
              className="bg-[#F8F9FB] text-[#262262]"
            />
            {errors.gphc && (
              <p className="text-red-500 text-sm mt-1">{errors.gphc.message}</p>
            )}
          </div>
          <div className="relative mb-[16px] sm:mb-[20px]">
            <label className="text-[14px] text-[#707B8A] mb-2.5 block">
              Role
            </label>
            <Select
              onValueChange={(value) => setValue("role", value)}
              className={`${errors.role ? "border-red-500" : ""}`}
            >
              <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={USER_ROLE.PHARMACIST}>Pharmacist</SelectItem>
                <SelectItem value={USER_ROLE.DISPENSER}>Dispenser</SelectItem>
                <SelectItem value={USER_ROLE.STAFF}>Staff</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex-1 grid grid-cols-2 gap-3">
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleSubmit(handleAddEmployee)}
                  className="primary-btn w-full !bg-transparent !border-[#262262] !text-[#262262] hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729] cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <Spinner size="sm" className="text-[#262262]" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <FaPlus /> Add Employee
                    </>
                  )}
                </Button>
              </div>
              <div className="text-center">
                <Button
                  type="button"
                  onClick={handleSkip}
                  className="primary-btn w-full cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <Spinner size="sm" className="text-white" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ConfigurationStep2;
