"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_BASE_URL, USER_ROLE } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import useAuthStore from "../../store/useAuthStore";
import { Upload, Pencil } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const nameLabel = {
  [USER_ROLE.PHARMACIST]: "Pharmacist's Name",
  [USER_ROLE.PHARMACY]: "Superintendent/Manager's Name",
  [USER_ROLE.DISPENSER]: "Dispenser's Name",
  [USER_ROLE.ADMIN]: "Admin's Name",
};

const schema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  email: yup.string().email("Invalid email"),
  gphcNumber: yup.string(),
});

const UserSettings = () => {
  const { token: storeToken, user, setUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showUploadBox, setShowUploadBox] = useState(!user?.photo);

  useEffect(() => {
    if (!user?.photo) {
      setImagePreview(null);
    } else if (user?.photo.startsWith("http")) {
      setImagePreview(user?.photo);
    } else {
      setImagePreview(`${API_BASE_URL}/public/img/${user?.photo}`);
    }
  }, [user?.photo]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          `${API_BASE_URL}/api/v1/common/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${storeToken}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setValue("photo", response.data.data.fileName, { shouldDirty: true });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(error.response?.data?.message || "Failed to upload file");
        setImagePreview(user?.photo || null);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== user?.photo) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, user?.photo]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      email: user?.email || "",
      gphcNumber: user?.gphcNumber || "",
      photo: user?.photo || "",
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
        Your Profile
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            {nameLabel[user?.role]}
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
            Phone Number
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
            GPHC code
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
        <div className="">
          {showUploadBox ? (
            <>
              <p
                htmlFor="answer"
                className="text-[#707B8A] text-[14px] mb-[10px]"
              >
                Upload profile picture (optional)
              </p>
              <label
                htmlFor="file-upload"
                className="flex items-center justify-center gap-2.5 text-[#4B5563] rounded-[6px] h-[89px] text-base bg-[#F8F9FB] border-2 border-[#DAECFF] cursor-pointer"
              >
                <Upload /> Upload your file
                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileUpload}
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </label>
            </>
          ) : (
            <div className="relative inline-block">
              <Image
                src={imagePreview}
                alt="Profile Picture"
                width={300}
                height={300}
                className="object-contain rounded-lg border border-[#DAECFF]"
              />
              <button
                type="button"
                onClick={() => setShowUploadBox(true)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Pencil className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          )}
          {imagePreview && showUploadBox && (
            <div className="mt-4">
              <Image
                src={imagePreview}
                alt="Preview"
                width={300}
                height={300}
                className="object-contain rounded-lg border border-[#DAECFF]"
              />
            </div>
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
