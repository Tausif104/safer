"use client";
import React, { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE_URL, PHARMACIST_STATUS, USER_ROLE } from "@/config/constant";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IncidentSavedDialog from "@/components/Incident/incident-saved-dialog";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/useAuthStore";
import PharmacistModal from "../Pharmacist/PharmacistModal";
import AddCircle from "@/assets/images/add-circle.svg";

const NearMiss = () => {
  const { pharmacy, user } = useAuthStore();
  const [selectedErrorTypes, setSelectedErrorTypes] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [incidentReference, setIncidentReference] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dispenser, setDispenser] = useState([]);
  const [users, setUsers] = useState([]);
  const [showDispenserModal, setShowDispenserModal] = useState(false);
  const [showPharmacistModal, setShowPharmacistModal] = useState(false);
  const [refetchedAt, setRefetchedAt] = useState(null);

  const errorCheckbox = [
    { id: "near-miss", label: "Near Miss" },
    {
      id: "dispensing-error",
      label: "Dispensing Error (handed out to patient)",
    },
    { id: "other", label: "Other" },
  ];

  const typeErrorCheckbox = [
    { id: "d", label: "D = incorrect Drug" },
    { id: "e", label: "E = out of date" },
    { id: "n", label: "N = incorrect patient name" },
    { id: "f", label: "F = incorrect Form" },
    { id: "x", label: "X = transposed labels" },
    { id: "m", label: "M = Missing item" },
    { id: "q", label: "Q = incorrect Quantity" },
    { id: "p", label: "P = misread prescription" },
    { id: "other", label: "other" },
    { id: "s", label: "S = incorrect strength" },
    { id: "msd", label: "MSD = monitored dosage system" },
  ];

  const riskCheckbox = [
    { id: "controlled-drug", label: "Controlled Drug" },
    { id: "mds-nomad", label: "MDS - NOMAD" },
    { id: "lasa", label: "LASA" },
  ];

  const schema = yup.object().shape({
    errorType: yup
      .array()
      .min(1, "Please select at least one error type")
      .required(),
    highRisk: yup.array(),
    errorCode: yup
      .array()
      .min(1, "Please select at least one error code")
      .required(),
    drugName: yup.string().required("Please enter the drug name"),
    possibleCause: yup.string().required("Please enter the possible cause"),
    actionTaken: yup.string().required("Please enter the action taken"),
    dispensedBy: yup.string().nullable(),
    checkedBy: yup.string().nullable(),
    dateOfIncident: yup
      .string()
      .required("Please enter the date of incident")
      .transform((value) => {
        if (!value) return value;
        const [year, month, day] = value.split("-");
        const date = new Date();
        date.setUTCDate(parseInt(day, 10));
        date.setUTCMonth(parseInt(month, 10) - 1);
        date.setUTCFullYear(parseInt(year, 10));
        return date.toISOString();
      }),
    timeOfIncident: yup
      .string()
      .required("Please enter the time of incident")
      .transform((value) => {
        if (!value) return value;
        const [hours, minutes] = value.split(":");
        const date = new Date();
        date.setHours(parseInt(hours, 10));
        date.setMinutes(parseInt(minutes, 10));
        return date.toISOString();
      }),
    dispensedByName: yup.string().nullable(),
    checkedByName: yup.string().nullable(),
    picture: yup.mixed().nullable(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      errorType: [],
      highRisk: [],
      errorCode: [],
      drugName: "",
      possibleCause: "",
      actionTaken: "",
      dispensedBy: null,
      checkedBy: null,
      dispensedByName: null,
      checkedByName: null,
      picture: null,
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: new Date().toTimeString().slice(0, 5),
    },
  });

  const handleErrorTypeChange = (id) => {
    setSelectedErrorTypes((prev) => {
      if (prev.includes(id)) {
        return prev.filter((type) => type !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isOptional = selectedErrorTypes.some((type) => type === "other");

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        type: "near-miss",
        ...data,
        isDraft: false,
        createdBy: user?.id,
        ownerOdsCode: pharmacy?.odsCode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/incidents`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        setIncidentReference(response.data.data.referenceNumber);
        setShowSuccessModal(true);
        setImagePreview(null);
        reset();
        setSelectedErrorTypes([]);
      } else {
        alert(`Error: ${response.data.message || "Failed to submit form"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        error.response?.data?.message ||
          "Failed to submit form. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setValue("picture", response.data.data.filePath);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        alert(
          `Error: ${error.response?.data?.message || "Failed to upload file"}`
        );
        setImagePreview(null);
      }
    }
  };

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const handleRefetch = (value) => {
    setRefetchedAt(value);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get(
        `${API_BASE_URL}/api/v1/users?pharmacyId=${pharmacy.id}`
      );
      setUsers(response.data.data);
    };
    fetchUsers();
  }, [pharmacy, refetchedAt]);

  return (
    <section className="mb-[50px] lg:mb-0">
      <div className="flex md:hidden items-center pt-[25px]">
        <Link
          href="/"
          className="w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white  top-[27px] -left-4 flex items-center justify-center"
        >
          <ArrowLeft />
        </Link>
        <h4 className="text-[22px] sm:text-[25px] sm:pl-[30px] pl-[15px] flex">
          Near Miss (Dispensing Error)
        </h4>
      </div>

      <div className="bg-white rounded-[16px]  mt-[30px] relative">
        <Link
          href="/"
          className="w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white absolute top-[27px] -left-4 hidden md:flex items-center justify-center"
        >
          <ArrowLeft />
        </Link>
        <div className="flex justify-between flex-wrap gap-4 mb-5">
          <h4 className="text-[16px] sm:text-[25px] px-0  pt-0 sm:pt-[30px] pl-[30px] hidden md:flex">
            Near Miss (Dispensing Error)
          </h4>
        </div>
        <hr className="bg-[#DAECFF] my-[16px] hidden md:flex" />
        <div className="px-[30px] pb-[20px] sm:pb-[30px] pt-0">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              <div>
                <h5 className="text-[18px]">Type of Error</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  {errorCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        checked={watch("errorType")?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = watch("errorType") || [];
                          if (checked) {
                            setValue("errorType", [
                              ...currentValues,
                              option.id,
                            ]);
                          } else {
                            setValue(
                              "errorType",
                              currentValues.filter((id) => id !== option.id)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {errors.errorType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.errorType.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">High Risk</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  {riskCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        checked={watch("highRisk")?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = watch("highRisk") || [];
                          if (checked) {
                            setValue("highRisk", [...currentValues, option.id]);
                          } else {
                            setValue(
                              "highRisk",
                              currentValues.filter((id) => id !== option.id)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {errors.highRisk && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.highRisk.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px] flex items-center gap-2">
                  Dispensed by{" "}
                  {isOptional && (
                    <span className="text-gray-500">(Optional)</span>
                  )}
                  {[USER_ROLE.PHARMACIST, USER_ROLE.PHARMACY].includes(
                    user?.role
                  ) && (
                    <span
                      className="text-[#707B8A] text-[14px] cursor-pointer flex items-center gap-2"
                      onClick={() => setShowDispenserModal(true)}
                    >
                      <Image
                        src={AddCircle}
                        alt="Add"
                        width={24}
                        height={24}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(1012%) hue-rotate(182deg) brightness(92%) contrast(87%)",
                        }}
                      />
                      Add new
                    </span>
                  )}
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Select
                  onValueChange={(value) => {
                    setValue("dispensedBy", Number(value.split(";;")[0]));
                    setValue("dispensedByName", value.split(";;")[1]);
                  }}
                  className=""
                >
                  <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem
                        key={user.id}
                        value={`${user.id};;${user.name}`}
                      >
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <h5 className="text-[18px] mt-[20px] flex items-center gap-2">
                  Checked by{" "}
                  {isOptional && (
                    <span className="text-gray-500">(Optional)</span>
                  )}
                  {[USER_ROLE.PHARMACIST, USER_ROLE.PHARMACY].includes(
                    user?.role
                  ) && (
                    <span
                      className="text-[#707B8A] text-[14px] cursor-pointer flex items-center gap-2"
                      onClick={() => setShowPharmacistModal(true)}
                    >
                      <Image
                        src={AddCircle}
                        alt="Add"
                        width={24}
                        height={24}
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(45%) sepia(8%) saturate(1012%) hue-rotate(182deg) brightness(92%) contrast(87%)",
                        }}
                      />
                      Add new
                    </span>
                  )}
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Select
                  onValueChange={(value) => {
                    setValue("checkedBy", Number(value.split(";;")[0]));
                    setValue("checkedByName", value.split(";;")[1]);
                  }}
                  className=""
                >
                  <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem
                        key={user.id}
                        value={`${user.id};;${user.name}`}
                      >
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-[#262262] block text-base font-semibold mb-2">
                  Date of Incident
                </label>
                <Input
                  {...register("dateOfIncident")}
                  type="date"
                  placeholder="Date of Incident"
                  className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                    errors.dateOfIncident ? "border-red-500" : ""
                  }`}
                />
                {errors.dateOfIncident && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dateOfIncident.message}
                  </p>
                )}
              </div>
              <div>
                <label className="text-[#262262] block text-base font-semibold mb-2">
                  Time of Incident
                </label>
                <Input
                  {...register("timeOfIncident")}
                  type="time"
                  placeholder="Time of Incident"
                  className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                    errors.timeOfIncident ? "border-red-500" : ""
                  }`}
                />
                {errors.timeOfIncident && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.timeOfIncident.message}
                  </p>
                )}
              </div>
              <div className="lg:col-span-3">
                <h5 className="text-[18px]">Type Of Error</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
                  {typeErrorCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        checked={watch("errorCode")?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = watch("errorCode") || [];
                          if (checked) {
                            setValue("errorCode", [
                              ...currentValues,
                              option.id,
                            ]);
                          } else {
                            setValue(
                              "errorCode",
                              currentValues.filter((id) => id !== option.id)
                            );
                          }
                        }}
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {errors.errorCode && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.errorCode.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-[30px]">
                  <div className="space-y-3 flex flex-col justify-between">
                    <label
                      htmlFor="drugName"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Name and Brand or Drug (supposed to be)
                    </label>
                    <Input
                      {...register("drugName")}
                      type="text"
                      name="drugName"
                      id="drugName"
                      placeholder="Write a short answer here."
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.drugName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.drugName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.drugName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <label
                      htmlFor="possibleCause"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Possible cause / other information
                    </label>
                    <Input
                      {...register("possibleCause")}
                      type="text"
                      name="possibleCause"
                      id="possibleCause"
                      placeholder="Write a short answer here."
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.possibleCause ? "border-red-500" : ""
                      }`}
                    />
                    {errors.possibleCause && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.possibleCause.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-3 flex flex-col justify-between">
                    <label
                      htmlFor="actionTaken"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Action Taken
                    </label>
                    <Input
                      {...register("actionTaken")}
                      type="text"
                      name="actionTaken"
                      id="actionTaken"
                      placeholder="Write a short answer here."
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.actionTaken ? "border-red-500" : ""
                      }`}
                    />
                    {errors.actionTaken && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.actionTaken.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-8 mt-[30px]">
              <div className="">
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
                    capture
                    style={{ display: "none" }}
                  />
                </label>
                {imagePreview && (
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
              <div className="flex justify-end flex-wrap gap-4 mb-5 items-end">
                <Button
                  type="button"
                  className="primary-btn !bg-transparent !border-[#262262] !text-[#262262] !py-[24px] max-w-[365px] w-full sm:!text-[18px] !text-[16px] cursor-pointer capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]"
                >
                  save draft
                </Button>
                <Button
                  type="submit"
                  disabled={
                    isSubmitting || user?.status !== PHARMACIST_STATUS.APPROVED
                  }
                  className="flex items-center gap-[16px] text-[#fff] transition-all duration-300 hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group max-w-[365px] w-full text-[18px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Spinner className="text-white" size="sm" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Incident"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <PharmacistModal
        isOpen={showPharmacistModal}
        onClose={() => setShowPharmacistModal(false)}
        setRefetchedAt={handleRefetch}
        type={USER_ROLE.PHARMACIST}
        from="incident"
      />

      <PharmacistModal
        isOpen={showDispenserModal}
        onClose={() => setShowDispenserModal(false)}
        setRefetchedAt={handleRefetch}
        type={USER_ROLE.DISPENSER}
        from="incident"
      />

      <IncidentSavedDialog
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        reference={incidentReference}
      />
    </section>
  );
};

export default NearMiss;
