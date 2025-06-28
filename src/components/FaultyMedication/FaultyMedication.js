"use client";
import React, { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE_URL, PHARMACIST_STATUS } from "@/config/constant";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IncidentSavedDialog from "@/components/Incident/incident-saved-dialog";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/useAuthStore";

const FaultyMedication = () => {
  const lfpseCheckbox = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
  ];

  const ageOptions = [
    { id: "12-18", label: "12-18 years old" },
    { id: "0-5", label: "0-5 years old" },
    { id: "5-12", label: "5-12 years old" },
    { id: "19-64", label: "19-64 years old" },
    { id: "65+", label: "Over 65 years old" },
  ];

  const schema = yup.object().shape({
    fullName: yup.string().required("Please enter your full name"),
    contactInfo: yup
      .string()
      .required("Please enter your phone number")
      .matches(/^[0-9+\-\s()]*$/, "Please enter a valid phone number"),
    emailAddress: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email address"),
    dateOfReturn: yup
      .string()
      .required("Please select date of return")
      .transform((value) => {
        if (!value) return value;
        const [year, month, day] = value.split("-");
        const date = new Date();
        date.setUTCDate(parseInt(day, 10));
        date.setUTCMonth(parseInt(month, 10) - 1);
        date.setUTCFullYear(parseInt(year, 10));
        return date.toISOString();
      }),
    productName: yup.string().required("Please enter the product name"),
    batchNumber: yup.string().required("Please enter the batch number"),
    expiryDate: yup
      .string()
      .required("Please select expiry date")
      .transform((value) => {
        if (!value) return value;
        const [year, month, day] = value.split("-");
        const date = new Date();
        date.setUTCDate(parseInt(day, 10));
        date.setUTCMonth(parseInt(month, 10) - 1);
        date.setUTCFullYear(parseInt(year, 10));
        return date.toISOString();
      }),
    issuedAt: yup
      .string()
      .required("Please select date issued")
      .transform((value) => {
        if (!value) return value;
        const [year, month, day] = value.split("-");
        const date = new Date();
        date.setUTCDate(parseInt(day, 10));
        date.setUTCMonth(parseInt(month, 10) - 1);
        date.setUTCFullYear(parseInt(year, 10));
        return date.toISOString();
      }),
    quantityReturned: yup
      .number()
      .required("Please enter quantity returned")
      .min(1, "Quantity must be at least 1"),
    age: yup.string().required("Please select age"),
    sex: yup.string().required("Please select sex"),
    typeOfIncident: yup.string().required("Please select type of incident"),
    issueDescriptionDetailed: yup
      .string()
      .required("Please provide a detailed description of the issue"),
    hasSideEffects: yup
      .boolean()
      .required("Please indicate if you experienced side effects"),
    sideEffectsDescription: yup.string().when("hasSideEffects", {
      is: true,
      then: (schema) => schema.required("Please describe the side effects"),
      otherwise: (schema) => schema.nullable(),
    }),
    isRefunded: yup.boolean().required("Please indicate if refunded"),
    isExchanged: yup.boolean().required("Please indicate if exchanged"),
    isInvestigationNeeded: yup
      .boolean()
      .required("Please indicate if investigation is needed"),
    isItemRequested: yup
      .boolean()
      .required("Please indicate if item was requested"),
    isYellowCardReported: yup
      .boolean()
      .required("Please indicate if yellow card was reported"),
    actionDetails: yup.string().required("Please provide action details"),
    receivedBy: yup.number().nullable(),
    receivedByName: yup.string().nullable(),
    receivedDate: yup
      .string()
      .required("Please select received date")
      .transform((value) => {
        if (!value) return value;
        const [year, month, day] = value.split("-");
        const date = new Date();
        date.setUTCDate(parseInt(day, 10));
        date.setUTCMonth(parseInt(month, 10) - 1);
        date.setUTCFullYear(parseInt(year, 10));
        return date.toISOString();
      }),
    picture: yup.mixed().nullable(),
    additionalComments: yup.string().nullable(),
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
  });

  const { user, pharmacy } = useAuthStore();

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
      fullName: "",
      contactInfo: "",
      emailAddress: "",
      dateOfReturn: new Date().toISOString().split("T")[0],
      productName: "",
      batchNumber: "",
      expiryDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        .toISOString()
        .split("T")[0],
      issuedAt: new Date().toISOString().split("T")[0],
      quantityReturned: 0,
      age: "",
      sex: "",
      typeOfIncident: "",
      issueDescriptionDetailed: "",
      hasSideEffects: false,
      sideEffectsDescription: "",
      isRefunded: false,
      isExchanged: false,
      isInvestigationNeeded: false,
      isItemRequested: false,
      isYellowCardReported: false,
      actionDetails: "",
      receivedBy: null,
      receivedDate: new Date().toISOString().split("T")[0],
      picture: null,
      additionalComments: "",
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: new Date().toTimeString().slice(0, 5),
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [incidentReference, setIncidentReference] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        type: "faulty-medication",
        ...data,
        isDraft: false,
        isDeleted: false,
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

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
          Faulty Medication
        </h4>
      </div>
      <p className="text-base text-[#4B5563]   md:hidden mt-[20px]">
        Please use this form to record any near misses. For dispensing errors,
        this need to be reported on ProScript under &apos;Incident Report&apos;.
      </p>

      <div className="bg-white rounded-[16px]  mt-[30px] relative">
        <Link
          href="/"
          className="w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white absolute top-[27px] -left-4 hidden md:flex items-center justify-center"
        >
          <ArrowLeft />
        </Link>
        <div className="flex justify-between flex-col gap-4 mb-5 pl-[30px]">
          <h4 className="text-[16px] sm:text-[25px] px-0  pt-0 sm:pt-[30px]  hidden md:flex">
            Faulty Medication
          </h4>
          <p className="text-base text-[#4B5563] hidden md:block">
            Please use this form to record any near misses. For dispensing
            errors, this need to be reported on ProScript under &apos;Incident
            Report&apos;.
          </p>
        </div>
        <hr className="bg-[#DAECFF] my-[16px] hidden md:flex" />
        <div className="px-[30px] pb-[20px] sm:pb-[30px] pt-0">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h5 className="text-[18px]">Customer Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Input
                      {...register("fullName")}
                      type="text"
                      placeholder="Enter your full name"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.fullName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.fullName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("contactInfo")}
                      type="tel"
                      placeholder="Phone Number"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.contactInfo ? "border-red-500" : ""
                      }`}
                    />
                    {errors.contactInfo && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.contactInfo.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("emailAddress")}
                      type="email"
                      placeholder="Email Address"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.emailAddress ? "border-red-500" : ""
                      }`}
                    />
                    {errors.emailAddress && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.emailAddress.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Select
                      onValueChange={(value) => setValue("age", value)}
                      className={`${errors.age ? "border-red-500" : ""}`}
                    >
                      <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                        <SelectValue placeholder="Age" />
                      </SelectTrigger>
                      <SelectContent>
                        {ageOptions.map((option) => (
                          <SelectItem key={option.id} value={option.id}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.age && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Select
                      onValueChange={(value) => setValue("sex", value)}
                      className={`${errors.sex ? "border-red-500" : ""}`}
                    >
                      <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                        <SelectValue placeholder="Sex" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="others">Others</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.sex && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sex.message}
                      </p>
                    )}
                  </div>
                  <div className="lg:col-span-2">
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Date of Return
                    </label>
                    <Input
                      {...register("dateOfReturn")}
                      type="date"
                      placeholder="Date of Return"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.dateOfReturn ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dateOfReturn && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dateOfReturn.message}
                      </p>
                    )}
                  </div>
                </div>
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
              <div>
                <h5 className="text-[18px]">Medication/Device Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <Input
                      {...register("productName")}
                      type="text"
                      placeholder="Product Name (Medication/Device)"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.productName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.productName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.productName.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <Input
                      {...register("batchNumber")}
                      type="text"
                      placeholder="Batch/Lot Number (if available)"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.batchNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.batchNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.batchNumber.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Expiry Date
                    </label>
                    <Input
                      {...register("expiryDate")}
                      type="date"
                      placeholder="Expiry Date"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.expiryDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Date Issued to Patient
                    </label>
                    <Input
                      {...register("issuedAt")}
                      type="date"
                      placeholder="Date issued to patient"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.issuedAt ? "border-red-500" : ""
                      }`}
                    />
                    {errors.issuedAt && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.issuedAt.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Quantity Returned
                    </label>
                    <Input
                      {...register("quantityReturned")}
                      type="number"
                      placeholder="Quantity Returned"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.quantityReturned ? "border-red-500" : ""
                      }`}
                    />
                    {errors.quantityReturned && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.quantityReturned.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Issue Description:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Type of Incident
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setValue("typeOfIncident", value)
                      }
                      className={`${
                        errors.typeOfIncident ? "border-red-500" : ""
                      }`}
                    >
                      <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                        <SelectValue placeholder="Select Type of Incident" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="faulty_medication">
                          Faulty Medication
                        </SelectItem>
                        <SelectItem value="faulty_device">
                          Faulty Device
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.typeOfIncident && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.typeOfIncident.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">
                  Detailed Description of the Issue:
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      {...register("issueDescriptionDetailed")}
                      type="text"
                      placeholder="Detailed description of the issue"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.issueDescriptionDetailed ? "border-red-500" : ""
                      }`}
                    />
                    {errors.issueDescriptionDetailed && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.issueDescriptionDetailed.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4">
                <label className="text-[#262262] text-base font-semibold mb-[14px]">
                  Did you experience any side effects or adverse reactions?
                </label>
                <div className="flex flex-col space-y-4">
                  {lfpseCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={`sideEffects-${option.id}`}
                        checked={
                          watch("hasSideEffects") === (option.id === "yes")
                        }
                        onCheckedChange={(checked) => {
                          setValue(
                            "hasSideEffects",
                            option.id === "yes" ? checked : !checked
                          );
                          if (!checked && option.id === "yes") {
                            setValue("sideEffectsDescription", "");
                          }
                        }}
                        className={`h-[20px] w-[20px] border-[#374151] ${
                          errors.hasSideEffects ? "border-red-500" : ""
                        }`}
                      />
                      <label
                        htmlFor={`sideEffects-${option.id}`}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                  {errors.hasSideEffects && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.hasSideEffects.message}
                    </p>
                  )}
                </div>
                {watch("hasSideEffects") && (
                  <div>
                    <Input
                      {...register("sideEffectsDescription")}
                      type="text"
                      placeholder="If yes, please describe"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.sideEffectsDescription ? "border-red-500" : ""
                      }`}
                    />
                    {errors.sideEffectsDescription && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sideEffectsDescription.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h5 className="text-[18px]">Action Taken:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-5">
                  <div className="flex flex-wrap items-center space-x-3">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Refund:
                    </label>
                    <RadioGroup
                      value={watch("isRefunded") ? "yes" : "no"}
                      onValueChange={(value) =>
                        setValue("isRefunded", value === "yes")
                      }
                      className={`flex flex-wrap ${
                        errors.isRefunded ? "border-red-500" : ""
                      }`}
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={`refund-${option.id}`}
                            value={option.id}
                          />
                          <label
                            htmlFor={`refund-${option.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isRefunded && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isRefunded.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Exchange:
                    </label>
                    <RadioGroup
                      value={watch("isExchanged") ? "yes" : "no"}
                      onValueChange={(value) =>
                        setValue("isExchanged", value === "yes")
                      }
                      className={`flex flex-wrap ${
                        errors.isExchanged ? "border-red-500" : ""
                      }`}
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={`exchange-${option.id}`}
                            value={option.id}
                          />
                          <label
                            htmlFor={`exchange-${option.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isExchanged && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isExchanged.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Investigation needed:
                    </label>
                    <RadioGroup
                      value={watch("isInvestigationNeeded") ? "yes" : "no"}
                      onValueChange={(value) =>
                        setValue("isInvestigationNeeded", value === "yes")
                      }
                      className={`flex ${
                        errors.isInvestigationNeeded ? "border-red-500" : ""
                      }`}
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={`investigation-${option.id}`}
                            value={option.id}
                          />
                          <label
                            htmlFor={`investigation-${option.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isInvestigationNeeded && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isInvestigationNeeded.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center space-x-3 space-y-2">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Replacement Script / Item requested from Surgery:
                    </label>
                    <RadioGroup
                      value={watch("isItemRequested") ? "yes" : "no"}
                      onValueChange={(value) =>
                        setValue("isItemRequested", value === "yes")
                      }
                      className={`flex flex-col md:flex-row ${
                        errors.isItemRequested ? "border-red-500" : ""
                      }`}
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={`itemRequested-${option.id}`}
                            value={option.id}
                          />
                          <label
                            htmlFor={`itemRequested-${option.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isItemRequested && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isItemRequested.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center space-x-3 space-y-2">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Yellow card Reported{" "}
                      <Link
                        href="https://yellowcard.mhra.gov.uk/"
                        className="text-[#3B82F6] underline"
                      >
                        https://yellowcard.mhra.gov.uk/
                      </Link>
                      :
                    </label>
                    <RadioGroup
                      value={watch("isYellowCardReported") ? "yes" : "no"}
                      onValueChange={(value) =>
                        setValue("isYellowCardReported", value === "yes")
                      }
                      className={`flex flex-col md:flex-row ${
                        errors.isYellowCardReported ? "border-red-500" : ""
                      }`}
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={`yellowCard-${option.id}`}
                            value={option.id}
                          />
                          <label
                            htmlFor={`yellowCard-${option.id}`}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isYellowCardReported && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isYellowCardReported.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      {...register("actionDetails")}
                      type="text"
                      placeholder="please specify details from report"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.actionDetails ? "border-red-500" : ""
                      }`}
                    />
                    {errors.actionDetails && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.actionDetails.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[18px] mt-[20px]">
                  Any Additional Notes/Comments:
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <div>
                    <Input
                      {...register("additionalComments")}
                      type="text"
                      placeholder="Enter your notes/comments"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.additionalComments ? "border-red-500" : ""
                      }`}
                    />
                    {errors.additionalComments && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.additionalComments.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <h5 className="text-[18px]">Pharmacy Staff Use Only</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <div className="w-full">
                    <Input
                      {...register("receivedByName")}
                      type="text"
                      placeholder="Received By"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.receivedByName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.receivedByName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.receivedByName.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full">
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Date Received
                    </label>
                    <Input
                      {...register("receivedDate")}
                      type="date"
                      placeholder="Date"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.receivedDate ? "border-red-500" : ""
                      }`}
                    />
                    {errors.receivedDate && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.receivedDate.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[30px]">
              <h5 className="text-[18px]">Upload picture (optional)</h5>
              <hr className="bg-[#DAECFF] my-[16px]" />
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
            <div className="flex justify-end flex-wrap gap-4 mb-5 mt-[30px] items-end">
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
          </form>
        </div>
      </div>

      <IncidentSavedDialog
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        reference={incidentReference}
      />
    </section>
  );
};

export default FaultyMedication;
