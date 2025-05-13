"use client";
import React, { useRef } from "react";
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

  const formValues = useRef({
    age: "",
    sex: "",
    issueDescription: "",
    faultyDevice: "",
    hasSideEffects: false,
    isRefunded: false,
    isExchanged: false,
    isInvestigationNeeded: false,
    isItemRequested: false,
    isYellowCardReported: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const payload = {
      type: "faulty-medication",
      fullName: formData.get("fullName") || "",
      contactInfo: formData.get("phoneNumber") || "",
      emailAddress: formData.get("emailAddress") || "",
      age: formValues.current.age ? parseInt(formValues.current.age) : 0,
      sex: formValues.current.sex || "",
      dateOfReturn: formData.get("dateOfReturn") || "",

      productName: formData.get("productName") || "",
      batchNumber: formData.get("batchNumber") || "",
      expiryDate: formData.get("expiryDate") || "",
      issuedAt: formData.get("issuedAt") || "",
      quantityReturned: parseInt(formData.get("quantityReturned")) || 0,

      issueDescription:
        formValues.current.issueDescription ||
        formValues.current.faultyDevice ||
        formData.get("otherIssue") ||
        "",
      issueDescriptionDetailed: formData.get("issueDescriptionDetailed") || "",

      hasSideEffects: formValues.current.hasSideEffects,
      sideEffectsDescription: formData.get("sideEffectsDescription") || "",

      isRefunded: formValues.current.isRefunded,
      isExchanged: formValues.current.isExchanged,
      isInvestigationNeeded: formValues.current.isInvestigationNeeded,
      isItemRequested: formValues.current.isItemRequested,
      isYellowCardReported: formValues.current.isYellowCardReported,
      actionDetails: formData.get("actionDetails") || "",

      additionalComments: formData.get("additionalComments") || "",
      receivedBy: formData.get("receivedBy") || "",
      receivedDate: formData.get("receivedDate") || "",
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
      });

      if (response.ok) {
        alert("Form submitted successfully!");
        e.target.reset();
        formValues.current = {
          age: "",
          sex: "",
          issueDescription: "",
          faultyDevice: "",
          hasSideEffects: false,
          isRefunded: false,
          isExchanged: false,
          isInvestigationNeeded: false,
          isItemRequested: false,
          isYellowCardReported: false,
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
        this need to be reported on ProScript under 'Incident Report'.
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
            errors, this need to be reported on ProScript under 'Incident
            Report'.
          </p>
        </div>
        <hr className="bg-[#DAECFF] my-[16px] hidden md:flex" />
        <div className="px-[30px] pb-[20px] sm:pb-[30px] pt-0">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8">
              <div>
                <h5 className="text-[18px]">Customer Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="date"
                    name="dateOfReturn"
                    placeholder="Date of Return"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Medication/Device Information:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Input
                    type="text"
                    name="productName"
                    placeholder="Product Name (Medication/Device)"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="text"
                    name="batchNumber"
                    placeholder="Batch/Lot Number (if available)"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="date"
                    name="expiryDate"
                    placeholder="Expiry Date"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="date"
                    name="issuedAt"
                    placeholder="Date issued to patient"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="number"
                    name="quantityReturned"
                    placeholder="Quantity Returned"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Select
                    onValueChange={(value) => (formValues.current.age = value)}
                    className=""
                  >
                    <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
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
                  <Select
                    onValueChange={(value) => (formValues.current.sex = value)}
                    className=""
                  >
                    <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                      <SelectValue placeholder="Sex" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Issue Description:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Select
                    onValueChange={(value) =>
                      (formValues.current.issueDescription = value)
                    }
                    className=""
                  >
                    <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                      <SelectValue placeholder="Faulty Medication" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faulty_medication_1">
                        Faulty Medication
                      </SelectItem>
                      <SelectItem value="faulty_medication_2">
                        Faulty Medication
                      </SelectItem>
                      <SelectItem value="faulty_medication_3">
                        Faulty Medication
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    onValueChange={(value) =>
                      (formValues.current.faultyDevice = value)
                    }
                    className=""
                  >
                    <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                      <SelectValue placeholder="Faulty Device" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="faulty_device_1">
                        Faulty Device
                      </SelectItem>
                      <SelectItem value="faulty_device_2">
                        Faulty Device
                      </SelectItem>
                      <SelectItem value="faulty_device_3">
                        Faulty Device
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="text"
                    name="otherIssue"
                    placeholder="Other"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">
                  Detailed Description of the Issue:
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <Input
                    type="text"
                    name="issueDescriptionDetailed"
                    placeholder="Detailed description of the issue"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>
              <div className="flex flex-col space-y-4 ">
                <label
                  htmlFor=""
                  className="text-[#262262] text-base font-semibold mb-[14px]"
                >
                  Did you experience any side effects or adverse reactions?
                </label>
                {lfpseCheckbox.map((option) => (
                  <div key={option.id} className="flex items-center space-x-3">
                    <Checkbox
                      id={`sideEffects-${option.id}`}
                      onCheckedChange={(checked) =>
                        (formValues.current.hasSideEffects =
                          option.id === "yes" ? checked : !checked)
                      }
                      className="h-[20px] w-[20px] border-[#374151]"
                    />
                    <label
                      htmlFor={`sideEffects-${option.id}`}
                      className="text-[16px] font-normal text-[#374151]"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
                <Input
                  type="text"
                  name="sideEffectsDescription"
                  placeholder="If yes, please describe"
                  className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                />
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
                      defaultValue=""
                      onValueChange={(value) =>
                        (formValues.current.isRefunded = value === "yes")
                      }
                      className="flex flex-wrap"
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
                  </div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Exchange:
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        (formValues.current.isExchanged = value === "yes")
                      }
                      className="flex flex-wrap"
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
                  </div>
                  <div className="flex items-center space-x-3">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Investigation needed:
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        (formValues.current.isInvestigationNeeded =
                          value === "yes")
                      }
                      className="flex "
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
                  </div>
                  <div className="flex flex-wrap items-center space-x-3 space-y-2">
                    <label htmlFor="" className="text-base text-[#262262]">
                      Replacement Script / Item requested from Surgery:
                    </label>
                    <RadioGroup
                      defaultValue=""
                      onValueChange={(value) =>
                        (formValues.current.isItemRequested = value === "yes")
                      }
                      className="flex flex-col md:flex-row"
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
                      defaultValue=""
                      onValueChange={(value) =>
                        (formValues.current.isYellowCardReported =
                          value === "yes")
                      }
                      className="flex flex-col md:flex-row"
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
                  </div>
                  <Input
                    type="text"
                    name="actionDetails"
                    placeholder="please specify details from report"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>

                <h5 className="text-[18px] mt-[20px]">
                  Any Additional Notes/Comments:
                </h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col space-y-4">
                  <Input
                    type="text"
                    name="additionalComments"
                    placeholder="Enter your notes/comments"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>

              <div>
                <h5 className="text-[18px]">Pharmacy Staff Use Only:</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <div className="flex flex-col md:flex-row  space-x-6 space-y-4">
                  <Input
                    type="text"
                    name="receivedBy"
                    placeholder="Received By"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                  <Input
                    type="date"
                    name="receivedDate"
                    placeholder="Date"
                    className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end flex-wrap gap-4 mb-5 mt-[30px] items-end">
              <Button className="primary-btn !bg-transparent !border-[#262262] !text-[#262262] !py-[24px] max-w-[365px] w-full sm:!text-[18px] !text-[16px] cursor-pointer capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]">
                save draft
              </Button>
              <Button className="flex items-center gap-[16px] text-[#fff] transition-all duration-300  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group max-w-[365px] w-full text-[18px] cursor-pointer">
                Submit Incident
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default FaultyMedication;
