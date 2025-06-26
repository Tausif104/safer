"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import useAuthStore from "../../store/useAuthStore";
import { Upload, Pencil } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";

const schema = yup.object().shape({
  name: yup.string(),
  phone: yup.string(),
  addressLine1: yup.string(),
  town: yup.string(),
  postCode: yup.string(),
  odsCode: yup.string(),
  gphcPremisesNumber: yup.string(),
});

const PharmacySettings = () => {
  const { token: storeToken, pharmacy, setPharmacy } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [showUploadBox, setShowUploadBox] = useState(!pharmacy?.logo);

  useEffect(() => {
    if (!pharmacy?.logo) {
      setImagePreview(null);
    } else if (pharmacy?.logo.startsWith("http")) {
      setImagePreview(pharmacy?.logo);
    } else {
      setImagePreview(
        pharmacy?.logo.startsWith("http")
          ? pharmacy?.logo
          : `${API_BASE_URL}/public/img/${pharmacy?.logo}`
      );
    }
  }, [pharmacy?.logo]);

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
          setValue(
            "logo",
            response.data.data.filePath,
            { shouldDirty: true }
          );
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(error.response?.data?.message || "Failed to upload file");
        setImagePreview(pharmacy?.logo || null);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== pharmacy?.logo) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, pharmacy?.logo]);

  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: pharmacy?.name || "",
      phone: pharmacy?.phone || "",
      addressLine1: pharmacy?.addressLine1 || "",
      town: pharmacy?.town || "",
      postCode: pharmacy?.postCode || "",
      odsCode: pharmacy?.odsCode || "",
      gphcPremisesNumber: pharmacy?.gphcPremisesNumber || "",
      logo: pharmacy?.logo || "",
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
        toast.error("No changes to save");
        setIsSubmitting(false);
        return;
      }

      await axios.put(
        `${API_BASE_URL}/api/v1/pharmacies/${pharmacy?.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${storeToken}`,
          },
        }
      );

      setPharmacy({ ...pharmacy, ...updatedData });
      toast.success("Pharmacy settings updated successfully");
    } catch (error) {
      console.error("Failed to update pharmacy settings:", error);
      toast.error("Failed to update pharmacy settings");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h4 className="text-[16px] md:text-[18px] xl:text-[24px] mb-[30px]">
        Pharmacy Settings
      </h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            Pharmacy name
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder="Enter pharmacy name"
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
            Address Line 1
          </label>
          <input
            type="text"
            {...register("addressLine1")}
            placeholder="Enter address line 1"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.addressLine1 && (
            <p className="text-red-500 text-sm mt-1">
              {errors.addressLine1.message}
            </p>
          )}
        </div>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            Town
          </label>
          <input
            type="text"
            {...register("town")}
            placeholder="Enter town"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.town && (
            <p className="text-red-500 text-sm mt-1">{errors.town.message}</p>
          )}
        </div>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            Post Code
          </label>
          <input
            type="text"
            {...register("postCode")}
            placeholder="Enter post code"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.postCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.postCode.message}
            </p>
          )}
        </div>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            ODS code
          </label>
          <input
            type="text"
            {...register("odsCode")}
            placeholder="Enter ODS code"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.odsCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.odsCode.message}
            </p>
          )}
        </div>
        <div className="relative mb-[16px] sm:mb-[20px]">
          <label className="text-[14px] text-[#707B8A] mb-2.5 block">
            GPHC premise number (optional)
          </label>
          <input
            type="text"
            {...register("gphcPremisesNumber")}
            placeholder="Enter GPhC premise number"
            className="bg-[#F8F9FB] text-[#262262]"
          />
          {errors.gphcPremisesNumber && (
            <p className="text-red-500 text-sm mt-1">
              {errors.gphcPremisesNumber.message}
            </p>
          )}
        </div>
        <div className="">
          {showUploadBox ? (
            <>
              <p
                htmlFor="answer"
                className="text-[#262262] text-[18px] mb-[10px] font-semibold"
              >
                Upload picture (optional)
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
              <img
                src={imagePreview}
                alt="Pharmacy Logo"
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
              {console.log("img preview", imagePreview)}
              <img
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

export default PharmacySettings;
