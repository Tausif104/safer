"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import AddCircle from "@/assets/images/add-circle.svg";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { API_BASE_URL, PHARMACIST_STATUS, USER_ROLE } from "@/config/constant";
import axios from "axios";
import Image from "next/image";
import IncidentSavedDialog from "@/components/Incident/incident-saved-dialog";
import { Spinner } from "@/components/ui/spinner";
import useAuthStore from "@/store/useAuthStore";
import PharmacistModal from "../Pharmacist/PharmacistModal";

const PrescribingIntervention = () => {
  const queryCheckbox = [
    { id: "dose-direction", label: "Dose direction" },
    { id: "quantity", label: "Quantity" },
    { id: "legal-issues", label: "Legal issues" },
    { id: "strength", label: "Strength" },
    { id: "other", label: "Other" },
  ];
  const actionCheckbox = [
    { id: "prescriber-contacted", label: "Prescriber contacted" },
    {
      id: "discussed-with-patient",
      label: "Discussed with Patient",
    },
    { id: "other", label: "Other" },
  ];
  const prescriptionsCheckbox = [
    { id: "eps", label: "EPS" },
    { id: "fp10-dental", label: "FP 10 Dental" },
    { id: "fp10-hospital", label: "FP 10 Hospital" },
    { id: "private", label: "Private" },
    { id: "veterinary", label: "Veterinary" },
    { id: "other", label: "Other" },
  ];
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
    query: yup.array().min(1, "Please select at least one query").required(),
    action: yup.array().min(1, "Please select at least one action").required(),
    prescriptionType: yup
      .array()
      .min(1, "Please select at least one prescription type")
      .required(),
    patientAge: yup.string().required("Please select patient age"),
    isSubmittedToLfpse: yup
      .boolean()
      .required("Please indicate if submitted to LFPSE"),
    isRecordedOnPmr: yup
      .boolean()
      .required("Please indicate if recorded on PMR"),
    description: yup.string().required("Please provide a description"),
    picture: yup.mixed().nullable(),
    dispensedBy: yup.string().nullable(),
    checkedBy: yup.string().nullable(),
    dispensedByName: yup.string().nullable(),
    checkedByName: yup.string().nullable(),
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
      query: [],
      action: [],
      prescriptionType: [],
      patientAge: "",
      isSubmittedToLfpse: undefined,
      isRecordedOnPmr: undefined,
      description: "",
      picture: null,
      dispensedBy: null,
      checkedBy: null,
      dispensedByName: null,
      checkedByName: null,
      dateOfIncident: new Date().toISOString().split("T")[0],
      timeOfIncident: new Date().toTimeString().slice(0, 5),
    },
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [incidentReference, setIncidentReference] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState([]);
  const [showDispenserModal, setShowDispenserModal] = useState(false);
  const [showPharmacistModal, setShowPharmacistModal] = useState(false);
  const [refetchedAt, setRefetchedAt] = useState(null);

  const handleRefetch = (value) => {
    setRefetchedAt(value);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const isValid = await schema
        .validate(data, { abortEarly: false })
        .catch((err) => {
          const validationErrors = {};
          err.inner.forEach((error) => {
            validationErrors[error.path] = error;
          });
          return false;
        });

      if (!isValid) {
        setIsSubmitting(false);
        return;
      }

      const payload = {
        type: "prescribing-intervention",
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

      if (response.status === 200) {
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

  // Cleanup preview URL when component unmounts
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

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
          Prescribing Intervention
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
            Prescribing Intervention
          </h4>
        </div>
        <hr className="bg-[#DAECFF] my-[16px] hidden md:flex" />
        <div className="px-[30px] pb-[20px] sm:pb-[30px] pt-0">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <div>
                <h5 className="text-[18px]">Query</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  {queryCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        onCheckedChange={(checked) => {
                          const currentValues = watch("query") || [];
                          if (checked) {
                            setValue("query", [...currentValues, option.id]);
                          } else {
                            setValue(
                              "query",
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
                  {errors.query && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.query.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Action Taken</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  {actionCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        onCheckedChange={(checked) => {
                          const currentValues = watch("action") || [];
                          if (checked) {
                            setValue("action", [...currentValues, option.id]);
                          } else {
                            setValue(
                              "action",
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
                  {errors.action && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.action.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Prescription type</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  {prescriptionsCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        onCheckedChange={(checked) => {
                          const currentValues = watch("prescriptionType") || [];
                          if (checked) {
                            setValue("prescriptionType", [
                              ...currentValues,
                              option.id,
                            ]);
                          } else {
                            setValue(
                              "prescriptionType",
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
                  {errors.prescriptionType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.prescriptionType.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Patients age</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) => setValue("patientAge", value)}
                  >
                    {ageOptions.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          className="w-[20px] h-[20px] border-[#374151]"
                          style={{ borderRadius: "4px" }}
                          id={option.id}
                          value={option.id}
                        />
                        <label
                          htmlFor={option.id}
                          className="text-sm font-medium leading-none"
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                  {errors.patientAge && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.patientAge.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="lg:col-span-2">
                <div>
                  <h5 className="text-[16px]">
                    Record Submitted to Patient to LFPSE?
                    https://record.learn-from-patient-safety-events.nhs.uk/
                  </h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isSubmittedToLfpse", value === "yes")
                      }
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={option.id}
                            value={option.id}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isSubmittedToLfpse && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isSubmittedToLfpse.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-[30px]">
                  <h5 className="text-[18px]">Recorded on PMR</h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isRecordedOnPmr", value === "yes")
                      }
                    >
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            className="w-[20px] h-[20px] border-[#374151]"
                            style={{ borderRadius: "4px" }}
                            id={option.id}
                            value={option.id}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                    {errors.isRecordedOnPmr && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isRecordedOnPmr.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[30px]">
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
            <div className="mt-[30px]">
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
            <div className="mt-7">
              <h5 className="text-[18px] flex items-center gap-2">
                Dispensed by (optional)
                {[USER_ROLE.PHARMACIST, USER_ROLE.PHARMACY].includes(
                  user?.role
                ) && (
                  <span
                    className="text-[#707B8A] text-[14px] cursor-pointer"
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
                  </span>
                )}
              </h5>
              <hr className="bg-[#DAECFF] my-[16px]" />
              <Select
                onValueChange={(value) => {
                  setValue("dispensedBy", Number(value.split(";;")[0]));
                  setValue("dispensedByName", value.split(";;")[1]);
                }}
              >
                <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
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
                Checked by (optional)
                {[USER_ROLE.PHARMACIST, USER_ROLE.PHARMACY].includes(
                  user?.role
                ) && (
                  <span
                    className="text-[#707B8A] text-[14px] cursor-pointer"
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
                  </span>
                )}
              </h5>
              <hr className="bg-[#DAECFF] my-[16px]" />
              <Select
                onValueChange={(value) => {
                  setValue("checkedBy", value.split(";;")[0]);
                  setValue("checkedByName", value.split(";;")[1]);
                }}
              >
                <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
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
            <div className="flex justify-between flex-wrap gap-4 mb-5 mt-[30px] items-end">
              <div className="w-full md:w-[48%]">
                <label
                  htmlFor="description"
                  className="text-[#262262] text-[18px] mb-[10px] font-semibold"
                >
                  Briefly describe what happened and how it was resolved
                </label>

                <Input
                  {...register("description")}
                  type="text"
                  placeholder="Write a short answer here."
                  id="description"
                  className={`mt-[10px] bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                    errors.description ? "border-red-500" : ""
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description.message}
                  </p>
                )}
              </div>
              <div className="w-full md:w-[48%]">
                <p className="text-[#262262] text-[18px] mb-[10px] font-semibold">
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
            </div>
            <div className="flex items-center justify-end flex-wrap gap-[15px] sm:w-auto w-full">
              <Button
                type="button"
                className="primary-btn !bg-transparent !border-[#262262] !text-[#262262] !py-[24px] max-w-[365px] w-full sm:w-auto sm:!text-[18px] !text-[16px] cursor-pointer capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]"
              >
                save draft
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting || user?.status !== PHARMACIST_STATUS.APPROVED
                }
                className="flex items-center gap-[16px] text-[#fff] transition-all duration-300 hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group w-full sm:w-auto sm:!text-[18px] !text-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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

export default PrescribingIntervention;
