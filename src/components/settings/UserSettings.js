"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import useAuthStore from "../../store/useAuthStore";

const schema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  email: yup.string().email("Invalid email"),
  gphcNumber: yup.string(),
});

const UserSettings = () => {
  const { token: storeToken, user, setUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      gphcNumber: user?.gphcNumber || "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const updatedData = Object.keys(dirtyFields).reduce((acc, key) => {
        acc[key] = data[key];
        return acc;
      }, {});

      if (Object.keys(updatedData).length === 0) {
        alert("No changes to save");
        setIsSubmitting(false);
        return;
      }

      await axios.put(`${API_BASE_URL}/api/v1/users/${user.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${storeToken}`,
        },
      });
      setUser({ ...user, ...updatedData });
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Failed to update settings:", error);
      alert("Failed to update settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]">
        User Settings
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter your name"
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
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
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
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            GPhC code
          </label>
          <input
            type="text"
            {...register("gphcNumber")}
            placeholder="Enter GPhC code"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.gphcNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gphcNumber.message}
            </p>
          )}
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="primary-btn w-full sm:w-[200px] cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Spinner size="sm" className="text-white" />
                <span>Saving...</span>
              </div>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserSettings;
