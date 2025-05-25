"use client";
import React, { useState, useRef } from "react";
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
import { API_BASE_URL } from "@/config/constant";
import axios from "axios";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import IncidentSavedDialog from "@/components/Incident/incident-saved-dialog";
import { Spinner } from "@/components/ui/spinner";

const PatientSafetyEvent = () => {
  const accidentCheckbox = [
    { id: "shop-floor", label: "Shop Floor" },
    {
      id: "dispensary",
      label: "Dispensary",
    },
    {
      id: "staff-room",
      label: "Staff Room",
    },
    {
      id: "consultation-room",
      label: "Consultation Room",
    },
    { id: "other", label: "Other" },
  ];
  const injuryCheckbox = [
    { id: "minor", label: "Minor (Bruise, Scrape)" },
    { id: "fmodarate", label: "Moderate (Sprain, Strain)" },
    { id: "severe", label: "Severe (Fracture, Concussion)" },
    { id: "unknown", label: "Unknown" },
  ];
  const lfpseCheckbox = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
  ];
  const medicationCheckbox = [
    { id: "yes", label: "Yes" },
    { id: "no", label: "No" },
    { id: "not-sure", label: "Not Sure" },
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
    contactInfo: yup.string().required("Please enter contact information"),
    age: yup.string().required("Please select age"),
    sex: yup.string().required("Please select sex"),
    dateOfAccident: yup.string().required("Please select date of accident"),
    timeOfAccident: yup.string().required("Please select time of accident"),
    accidentLocation: yup
      .array()
      .min(1, "Please select at least one location")
      .required(),
    accidentLocationOther: yup.string().when("accidentLocation", {
      is: (locations) => locations?.includes("other"),
      then: (schema) => schema.required("Please specify other location"),
      otherwise: (schema) => schema.nullable(),
    }),
    isReceivingPharmacyService: yup
      .boolean()
      .required("Please indicate if receiving pharmacy service"),
    pharmacyServiceType: yup.string().when("isReceivingPharmacyService", {
      is: true,
      then: (schema) => schema.required("Please specify pharmacy service type"),
      otherwise: (schema) => schema.nullable(),
    }),
    accidentDescription: yup.string().required("Please describe what happened"),
    isInjured: yup.boolean().required("Please indicate if injured"),
    injuryBodyPart: yup.string().when("isInjured", {
      is: true,
      then: (schema) => schema.required("Please specify injured body part"),
      otherwise: (schema) => schema.nullable(),
    }),
    injurySeverity: yup.array().when("isInjured", {
      is: true,
      then: (schema) =>
        schema.min(1, "Please select injury severity").required(),
      otherwise: (schema) => schema.nullable(),
    }),
    isMedicalTreatmentGiven: yup
      .boolean()
      .required("Please indicate if medical treatment was given"),
    medicalTreatmentDetails: yup.string().when("isMedicalTreatmentGiven", {
      is: true,
      then: (schema) =>
        schema.required("Please specify medical treatment details"),
      otherwise: (schema) => schema.nullable(),
    }),
    isRefusedFurtherCare: yup
      .boolean()
      .required("Please indicate if refused further care"),
    refusalReason: yup.string().when("isRefusedFurtherCare", {
      is: true,
      then: (schema) => schema.required("Please specify reason for refusal"),
      otherwise: (schema) => schema.nullable(),
    }),
    isEmergencyCalled: yup
      .boolean()
      .required("Please indicate if emergency was called"),
    emergencyDetails: yup.string().when("isEmergencyCalled", {
      is: true,
      then: (schema) => schema.required("Please specify emergency details"),
      otherwise: (schema) => schema.nullable(),
    }),
    isStaffInvolved: yup
      .boolean()
      .required("Please indicate if staff was involved"),
    staffNames: yup.string().when("isStaffInvolved", {
      is: true,
      then: (schema) => schema.required("Please specify staff names"),
      otherwise: (schema) => schema.nullable(),
    }),
    isLoggedOnPmr: yup.boolean().required("Please indicate if logged on PMR"),
    yellowCardFiled: yup
      .string()
      .required("Please indicate if yellow card was filed"),
    isReportedToManager: yup
      .boolean()
      .required("Please indicate if reported to manager"),
    supervisorName: yup.string().when("isReportedToManager", {
      is: true,
      then: (schema) => schema.required("Please specify supervisor name"),
      otherwise: (schema) => schema.nullable(),
    }),
    isFollowUpScheduled: yup
      .boolean()
      .required("Please indicate if follow-up was scheduled"),
    followUpDetails: yup.string().when("isFollowUpScheduled", {
      is: true,
      then: (schema) => schema.required("Please specify follow-up details"),
      otherwise: (schema) => schema.nullable(),
    }),
    additionalComments: yup.string().nullable(),
    picture: yup.mixed().nullable(),
    recordedBy: yup.string().nullable(),
    recordedByName: yup.string().nullable(),
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
      fullName: "",
      contactInfo: "",
      age: "",
      sex: "",
      dateOfAccident: new Date().toISOString().split("T")[0],
      timeOfAccident: new Date().toTimeString().slice(0, 5),
      accidentLocation: [],
      accidentLocationOther: "",
      isReceivingPharmacyService: undefined,
      pharmacyServiceType: "",
      accidentDescription: "",
      isInjured: undefined,
      injuryBodyPart: "",
      injurySeverity: [],
      isMedicalTreatmentGiven: undefined,
      medicalTreatmentDetails: "",
      isRefusedFurtherCare: undefined,
      refusalReason: "",
      isEmergencyCalled: undefined,
      emergencyDetails: "",
      isStaffInvolved: undefined,
      staffNames: "",
      isLoggedOnPmr: undefined,
      yellowCardFiled: "",
      isReportedToManager: undefined,
      supervisorName: "",
      isFollowUpScheduled: undefined,
      followUpDetails: "",
      additionalComments: "",
      picture: null,
      recordedBy: null,
      recordedByName: null,
    },
  });

  const [selectedAccidentLocations, setSelectedAccidentLocations] = useState(
    []
  );
  const [selectedInjurySeverities, setSelectedInjurySeverities] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [incidentReference, setIncidentReference] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        type: "patient-safety-event",
        ...data,
        isDraft: false,
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
        setSelectedAccidentLocations([]);
        setSelectedInjurySeverities([]);
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

  const handleRadioChange = (group, value) => {
    if (group === "isReceivingPharmacyService") {
      setValue("isReceivingPharmacyService", value === "yes");
    } else if (group === "isInjured") {
      setValue("isInjured", value === "yes");
    } else if (group === "isMedicalTreatmentGiven") {
      setValue("isMedicalTreatmentGiven", value === "yes");
    } else if (group === "isRefusedFurtherCare") {
      setValue("isRefusedFurtherCare", value === "yes");
    } else if (group === "isEmergencyCalled") {
      setValue("isEmergencyCalled", value === "yes");
    } else if (group === "isStaffInvolved") {
      setValue("isStaffInvolved", value === "yes");
    } else if (group === "isLoggedOnPmr") {
      setValue("isLoggedOnPmr", value === "yes");
    } else if (group === "yellowCardFiled") {
      setValue("yellowCardFiled", value);
    } else if (group === "isReportedToManager") {
      setValue("isReportedToManager", value === "yes");
    } else if (group === "isFollowUpScheduled") {
      setValue("isFollowUpScheduled", value === "yes");
    }
  };

  const handleCheckboxChange = (group, id, checked) => {
    if (group === "accidentLocation") {
      setSelectedAccidentLocations((prev) =>
        checked ? [...prev, id] : prev.filter((item) => item !== id)
      );
    } else if (group === "injurySeverity") {
      setSelectedInjurySeverities((prev) =>
        checked ? [...prev, id] : prev.filter((item) => item !== id)
      );
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
          setValue("picture", response.data.data.fileName);
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

  React.useEffect(() => {
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
          Patient Safety Event
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
            Patient Safety Event
          </h4>
        </div>
        <hr className="bg-[#DAECFF] my-[16px] hidden md:flex" />
        <div className="px-[30px] pb-[20px] sm:pb-[30px] pt-0">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid grid-cols-1 gap-7">
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
                      type="text"
                      placeholder="Contact Information"
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
                    <Select onValueChange={(value) => setValue("age", value)}>
                      <SelectTrigger
                        className={`w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                          errors.age ? "border-red-500" : ""
                        }`}
                      >
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
                    <Select onValueChange={(value) => setValue("sex", value)}>
                      <SelectTrigger
                        className={`w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                          errors.sex ? "border-red-500" : ""
                        }`}
                      >
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
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Date of Accident
                    </label>
                    <Input
                      {...register("dateOfAccident")}
                      type="date"
                      placeholder="Date of Accident"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.dateOfAccident ? "border-red-500" : ""
                      }`}
                    />
                    {errors.dateOfAccident && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.dateOfAccident.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="text-[#262262] block text-base font-semibold mb-2">
                      Time of Accident
                    </label>
                    <Input
                      {...register("timeOfAccident")}
                      type="time"
                      placeholder="Time of Accident"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.timeOfAccident ? "border-red-500" : ""
                      }`}
                    />
                    {errors.timeOfAccident && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.timeOfAccident.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Incident Details:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <label className="text-[#262262] text-base font-semibold mb-[14px]">
                  Location of Accident (specific area of the store):
                </label>
                <div className="flex flex-col space-y-4 mt-[14px]">
                  {accidentCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center space-x-3"
                    >
                      <Checkbox
                        id={option.id}
                        className="h-[20px] w-[20px] border-[#374151]"
                        checked={watch("accidentLocation")?.includes(option.id)}
                        onCheckedChange={(checked) => {
                          const currentValues = watch("accidentLocation") || [];
                          if (checked) {
                            setValue("accidentLocation", [
                              ...currentValues,
                              option.id,
                            ]);
                          } else {
                            setValue(
                              "accidentLocation",
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
                  {watch("accidentLocation")?.includes("other") && (
                    <div>
                      <Input
                        {...register("accidentLocationOther")}
                        type="text"
                        placeholder="Please state."
                        className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                          errors.accidentLocationOther ? "border-red-500" : ""
                        }`}
                      />
                      {errors.accidentLocationOther && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.accidentLocationOther.message}
                        </p>
                      )}
                    </div>
                  )}
                  {errors.accidentLocation && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.accidentLocation.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">
                  Was the patient receiving a pharmacy service?
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) =>
                      setValue("isReceivingPharmacyService", value === "yes")
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
                  {errors.isReceivingPharmacyService && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.isReceivingPharmacyService.message}
                    </p>
                  )}
                  {watch("isReceivingPharmacyService") && (
                    <div>
                      <Input
                        {...register("pharmacyServiceType")}
                        type="text"
                        placeholder="If yes, please state what one:"
                        className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                          errors.pharmacyServiceType ? "border-red-500" : ""
                        }`}
                      />
                      {errors.pharmacyServiceType && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.pharmacyServiceType.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">What exactly happened?</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Input
                  {...register("accidentDescription")}
                  type="text"
                  placeholder="Please describe the incident step-by-step"
                  className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                    errors.accidentDescription ? "border-red-500" : ""
                  }`}
                />
                {errors.accidentDescription && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.accidentDescription.message}
                  </p>
                )}
              </div>
              <div>
                <h5 className="text-[18px]">Injury Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <label className="text-[#262262] text-base font-semibold mb-[14px]">
                  Was the patient injured in the accident?
                </label>
                <div className="flex flex-col space-y-4 mt-[14px]">
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) =>
                      setValue("isInjured", value === "yes")
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
                  {errors.isInjured && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.isInjured.message}
                    </p>
                  )}

                  {watch("isInjured") && (
                    <>
                      <label className="text-[#262262] text-base font-semibold mb-[14px]">
                        If yes, what part of your body was injured?
                      </label>
                      <Input
                        {...register("injuryBodyPart")}
                        type="text"
                        placeholder="(e.g., arm, leg, back, head)"
                        className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                          errors.injuryBodyPart ? "border-red-500" : ""
                        }`}
                      />
                      {errors.injuryBodyPart && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.injuryBodyPart.message}
                        </p>
                      )}

                      <label className="text-[#262262] text-base font-semibold mb-[14px]">
                        How severe is your injury?
                      </label>
                      {injuryCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-3"
                        >
                          <Checkbox
                            id={option.id}
                            className="h-[20px] w-[20px] border-[#374151]"
                            checked={watch("injurySeverity")?.includes(
                              option.id
                            )}
                            onCheckedChange={(checked) => {
                              const currentValues =
                                watch("injurySeverity") || [];
                              if (checked) {
                                setValue("injurySeverity", [
                                  ...currentValues,
                                  option.id,
                                ]);
                              } else {
                                setValue(
                                  "injurySeverity",
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
                      {errors.injurySeverity && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.injurySeverity.message}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Was medical treatment given?</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <RadioGroup
                  defaultValue=""
                  onValueChange={(value) =>
                    setValue("isMedicalTreatmentGiven", value === "yes")
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
                {errors.isMedicalTreatmentGiven && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isMedicalTreatmentGiven.message}
                  </p>
                )}
                {watch("isMedicalTreatmentGiven") && (
                  <div className="mt-4">
                    <Input
                      {...register("medicalTreatmentDetails")}
                      type="text"
                      placeholder="If yes, what treatment was given"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.medicalTreatmentDetails ? "border-red-500" : ""
                      }`}
                    />
                    {errors.medicalTreatmentDetails && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.medicalTreatmentDetails.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h5 className="text-[18px]">
                  Did the patient refuse further medical care or intervention?
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <RadioGroup
                  defaultValue=""
                  onValueChange={(value) =>
                    setValue("isRefusedFurtherCare", value === "yes")
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
                {errors.isRefusedFurtherCare && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isRefusedFurtherCare.message}
                  </p>
                )}
                {watch("isRefusedFurtherCare") && (
                  <div className="mt-4">
                    <Input
                      {...register("refusalReason")}
                      type="text"
                      placeholder="If yes, describe any reasons given"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.refusalReason ? "border-red-500" : ""
                      }`}
                    />
                    {errors.refusalReason && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.refusalReason.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div>
                <h5 className="text-[18px]">
                  Was Emergency medical attention Called (999)?
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <RadioGroup
                  defaultValue=""
                  onValueChange={(value) =>
                    setValue("isEmergencyCalled", value === "yes")
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
                {errors.isEmergencyCalled && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.isEmergencyCalled.message}
                  </p>
                )}
                {watch("isEmergencyCalled") && (
                  <div className="mt-4">
                    <Input
                      {...register("emergencyDetails")}
                      type="text"
                      placeholder="If yes, please describe:"
                      className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                        errors.emergencyDetails ? "border-red-500" : ""
                      }`}
                    />
                    {errors.emergencyDetails && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.emergencyDetails.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
              <div className="">
                <div>
                  <h5 className="text-[18px]">Staff Involvement:</h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Were there any staff involved with the accident?
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isStaffInvolved", value === "yes")
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
                    {errors.isStaffInvolved && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isStaffInvolved.message}
                      </p>
                    )}
                    {watch("isStaffInvolved") && (
                      <div className="mt-4">
                        <Input
                          {...register("staffNames")}
                          type="text"
                          placeholder="If yes, please provide their names"
                          className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                            errors.staffNames ? "border-red-500" : ""
                          }`}
                        />
                        {errors.staffNames && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.staffNames.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-[30px]">
                  <h5 className="text-[18px]">Admin:</h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Has the event been logged on patients PMR?
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isLoggedOnPmr", value === "yes")
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
                    {errors.isLoggedOnPmr && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isLoggedOnPmr.message}
                      </p>
                    )}
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      If the event is medication related has a{" "}
                      <Link href="" className="text-[#3B82F6] underline">
                        yellow card
                      </Link>{" "}
                      been filled?
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("yellowCardFiled", value)
                      }
                    >
                      {medicationCheckbox.map((option) => (
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
                    {errors.yellowCardFiled && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.yellowCardFiled.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-[30px]">
                  <h5 className="text-[18px]">
                    Was the incident reported to a supervisor or manager?
                  </h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isReportedToManager", value === "yes")
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
                    {errors.isReportedToManager && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isReportedToManager.message}
                      </p>
                    )}
                    {watch("isReportedToManager") && (
                      <div className="mt-4">
                        <Input
                          {...register("supervisorName")}
                          type="text"
                          placeholder="If yes, name of supervisor/manager"
                          className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                            errors.supervisorName ? "border-red-500" : ""
                          }`}
                        />
                        {errors.supervisorName && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.supervisorName.message}
                          </p>
                        )}
                      </div>
                    )}
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Was a follow-up scheduled with the patient?
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        setValue("isFollowUpScheduled", value === "yes")
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
                    {errors.isFollowUpScheduled && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.isFollowUpScheduled.message}
                      </p>
                    )}
                    {watch("isFollowUpScheduled") && (
                      <div className="mt-4">
                        <Input
                          {...register("followUpDetails")}
                          type="text"
                          placeholder="If yes, please provide details:"
                          className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                            errors.followUpDetails ? "border-red-500" : ""
                          }`}
                        />
                        {errors.followUpDetails && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.followUpDetails.message}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-[30px]">
                  <h5 className="text-[18px]">Additional Comments:</h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <div className="flex flex-col space-y-4">
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Is there anything else you would like to add regarding the
                      event or your experience?
                    </label>
                    <Input
                      {...register("additionalComments")}
                      type="text"
                      placeholder="Is there anything you would like to add about your experience?"
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
                <div className="mt-5">
                  <h5 className="text-[18px]">Recorded by (optional)</h5>
                  <hr className="bg-[#DAECFF] my-[16px]" />
                  <Input
                    {...register("recordedByName")}
                    type="text"
                    placeholder="Name of the person recording the incident"
                    className={`bg-[#F8F9FB] p-[16px] h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px] ${
                      errors.recordedByName ? "border-red-500" : ""
                    }`}
                  />
                  {errors.recordedByName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.recordedByName.message}
                    </p>
                  )}
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
                disabled={isSubmitting}
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

export default PatientSafetyEvent;
