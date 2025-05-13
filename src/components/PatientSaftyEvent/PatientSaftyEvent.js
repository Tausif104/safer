"use client";
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE_URL } from "@/config/constant";
const PatientSaftyEvent = () => {
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

  const formValues = useRef({
    accidentLocation: "",
    isReceivingPharmacyService: false,
    isInjured: false,
    injurySeverity: "",
    isMedicalTreatmentGiven: false,
    isRefusedFurtherCare: false,
    isEmergencyCalled: false,
    isStaffInvolved: false,
    isLoggedOnPmr: false,
    yellowCardFiled: "",
    isReportedToManager: false,
    isFollowUpScheduled: false,
  });

  // Add state to track checkbox selections
  const [selectedAccidentLocations, setSelectedAccidentLocations] = useState(
    []
  );
  const [selectedInjurySeverities, setSelectedInjurySeverities] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const accidentLocation = selectedAccidentLocations.join(", ");
    const injurySeverity = selectedInjurySeverities.join(", ");

    const payload = {
      type: "patient-safety-event",
      fullName: formData.get("fullName") || "",
      contactInfo: formData.get("contactInfo") || "",
      // age: formData.get("age") || "",
      age: 22, //TODO: change in the backend
      sex: formData.get("sex") || "",
      dateOfAccident: formData.get("dateOfAccident") || "",
      timeOfAccident: formData.get("timeOfAccident") || "",

      accidentLocation: accidentLocation || "",
      accidentLocationOther: formData.get("accidentLocationOther") || "",

      isReceivingPharmacyService: formValues.current.isReceivingPharmacyService,
      pharmacyServiceType: formData.get("pharmacyServiceType") || "",

      accidentDescription: formData.get("accidentDescription") || "",

      isInjured: formValues.current.isInjured,
      injuryType: formData.get("injuryType") || "",
      injuryBodyPart: formData.get("injuryBodyPart") || "",
      injurySeverity: injurySeverity || "",

      isMedicalTreatmentGiven: formValues.current.isMedicalTreatmentGiven,
      medicalTreatmentDetails: formData.get("medicalTreatmentDetails") || "",

      isRefusedFurtherCare: formValues.current.isRefusedFurtherCare,
      refusalReason: formData.get("refusalReason") || "",

      isEmergencyCalled: formValues.current.isEmergencyCalled,
      emergencyDetails: formData.get("emergencyDetails") || "",

      isStaffInvolved: formValues.current.isStaffInvolved,
      staffNames: formData.get("staffNames") || "",

      isLoggedOnPmr: formValues.current.isLoggedOnPmr,
      yellowCardFiled: formValues.current.yellowCardFiled,

      isReportedToManager: formValues.current.isReportedToManager,
      supervisorName: formData.get("supervisorName") || "",

      isFollowUpScheduled: formValues.current.isFollowUpScheduled,
      followUpDetails: formData.get("followUpDetails") || "",

      additionalComments: formData.get("additionalComments") || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/incidents`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Patient safety event submitted successfully!");
        e.target.reset();
        formValues.current = {
          accidentLocation: "",
          isReceivingPharmacyService: false,
          isInjured: false,
          injurySeverity: "",
          isMedicalTreatmentGiven: false,
          isRefusedFurtherCare: false,
          isEmergencyCalled: false,
          isStaffInvolved: false,
          isLoggedOnPmr: false,
          yellowCardFiled: "",
          isReportedToManager: false,
          isFollowUpScheduled: false,
        };
      } else {
        const error = await response.json();
        alert(`Error: ${error.message || "Failed to submit form"}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const handleRadioChange = (group, value) => {
    if (group === "isReceivingPharmacyService") {
      formValues.current.isReceivingPharmacyService = value === "yes";
    } else if (group === "isInjured") {
      formValues.current.isInjured = value === "yes";
    } else if (group === "isMedicalTreatmentGiven") {
      formValues.current.isMedicalTreatmentGiven = value === "yes";
    } else if (group === "isRefusedFurtherCare") {
      formValues.current.isRefusedFurtherCare = value === "yes";
    } else if (group === "isEmergencyCalled") {
      formValues.current.isEmergencyCalled = value === "yes";
    } else if (group === "isStaffInvolved") {
      formValues.current.isStaffInvolved = value === "yes";
    } else if (group === "isLoggedOnPmr") {
      formValues.current.isLoggedOnPmr = value === "yes";
    } else if (group === "yellowCardFiled") {
      formValues.current.yellowCardFiled = value;
    } else if (group === "isReportedToManager") {
      formValues.current.isReportedToManager = value === "yes";
    } else if (group === "isFollowUpScheduled") {
      formValues.current.isFollowUpScheduled = value === "yes";
    }
  };

  // Add a handler for checkbox changes
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

  return (
    <section className='mb-[50px] lg:mb-0'>
      <div className='flex md:hidden items-center pt-[25px]'>
        <Link
          href="/"
          className="w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white  top-[27px] -left-4 flex items-center justify-center"
        >
          <ArrowLeft />
        </Link>
        <h4 className='text-[22px] sm:text-[25px] sm:pl-[30px] pl-[15px] flex'>
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
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-7">
              <div>
                <h5 className="text-[18px]">Customer Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="fullName"
                  />
                  <Input
                    type="text"
                    placeholder="Contact Information"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="contactInfo"
                  />
                  <Select name="age">
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
                  <Select name="sex">
                    <SelectTrigger className="w-full bg-[#F8F9FB] p-[16px] !h-[56px] border rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>

                  <Input
                    type="date"
                    name="dateOfAccident"
                    placeholder="Date of Accident"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="time"
                    name="timeOfAccident"
                    placeholder="Time of Accident"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Incident Details:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <label
                  htmlFor=""
                  className="text-[#262262] text-base font-semibold mb-[14px]"
                >
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
                        checked={selectedAccidentLocations.includes(option.id)}
                        onCheckedChange={(value) => {
                          handleCheckboxChange(
                            "accidentLocation",
                            option.id,
                            value
                          );
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
                  <Input
                    type="text"
                    placeholder="Please state."
                    id="accidentLocationOther"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="accidentLocationOther"
                  />
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
                      handleRadioChange("isReceivingPharmacyService", value)
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
                  <Input
                    type="text"
                    placeholder="If yes, please state what one:"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="pharmacyServiceType"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">What exactly happened?</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Input
                  type='text'
                  placeholder='Please describe the incident step-by-step'
                  className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                />
              </div>
              <div>
                <h5 className="text-[18px]">Injury Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <label
                  htmlFor=""
                  className="text-[#262262] text-base font-semibold mb-[14px]"
                >
                  Was the patient injured in the accident?
                </label>
                <div className="flex flex-col space-y-4 mt-[14px]">
                  <RadioGroup
                    defaultValue="12-18"
                    onValueChange={(value) =>
                      handleRadioChange("isInjured", value)
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
                  <label
                    htmlFor=""
                    className="text-[#262262] text-base font-semibold mb-[14px]"
                  >
                    If yes, what part of your body was injured?
                  </label>
                  <Input
                    type="text"
                    placeholder="(e.g., arm, leg, back, head)"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="injuryBodyPart"
                  />
                  <label
                    htmlFor=""
                    className="text-[#262262] text-base font-semibold mb-[14px]"
                  >
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
                        checked={selectedInjurySeverities.includes(option.id)}
                        onCheckedChange={(value) => {
                          handleCheckboxChange(
                            "injurySeverity",
                            option.id,
                            value
                          );
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
                  <label
                    htmlFor=""
                    className="text-[#262262] text-base font-semibold mb-[14px]"
                  >
                    Was medical treatment given?
                  </label>
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) =>
                      handleRadioChange("isMedicalTreatmentGiven", value)
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
                  <Input
                    type="text"
                    placeholder="If yes, what treatment was given "
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="medicalTreatmentDetails"
                  />
                  <label
                    htmlFor=""
                    className="text-[#262262] text-base font-semibold mb-[14px]"
                  >
                    Did the patient refuse further medical care or intervention?
                  </label>
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) =>
                      handleRadioChange("isRefusedFurtherCare", value)
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
                  <Input
                    type="text"
                    placeholder="If yes, describe any reasons given"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="refusalReason"
                  />
                  <label
                    htmlFor=""
                    className="text-[#262262] text-base font-semibold mb-[14px]"
                  >
                    Was Emergency medical attention Called (999)?
                  </label>
                  <RadioGroup
                    defaultValue=""
                    onValueChange={(value) =>
                      handleRadioChange("isEmergencyCalled", value)
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
                  <Input
                    type="text"
                    placeholder="If yes, please describe:"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    name="emergencyDetails"
                  />
                </div>
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
                        handleRadioChange("isStaffInvolved", value)
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
                    <Input
                      type="text"
                      placeholder="If yes, please provide their names"
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                      name="staffNames"
                    />
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
                        handleRadioChange("isLoggedOnPmr", value)
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
                        handleRadioChange("yellowCardFiled", value)
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
                        handleRadioChange("isReportedToManager", value)
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
                    <Input
                      type="text"
                      placeholder="If yes, name of supervisor/manager"
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                      name="supervisorName"
                    />
                    <label
                      htmlFor=""
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Was a follow-up scheduled with the patient?
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        handleRadioChange("isFollowUpScheduled", value)
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
                    <Input
                      type="text"
                      placeholder="If yes, please provide details:"
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                      name="followUpDetails"
                    />
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
                      type="text"
                      placeholder="Is there anything you would like to add about your experience?"
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                      name="additionalComments"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-end flex-wrap gap-4 mb-5 mt-[30px] items-end'>
              <Button className="primary-btn !bg-transparent !border-[#262262] !text-[#262262] !py-[24px] max-w-[365px] w-full sm:!text-[18px] !text-[16px] cursor-pointer capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]">save draft</Button>
              <Button className='flex items-center gap-[16px] text-[#fff] transition-all duration-300  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group max-w-[365px] w-full text-[18px] cursor-pointer'>
                Submit Incident
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PatientSaftyEvent;