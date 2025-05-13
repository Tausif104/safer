"use client";
import React, { useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { API_BASE_URL } from "@/config/constant";

const NearMiss = () => {
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

  const formValues = useRef({
    errorType: "",
    highRisk: "",
    dispensedBy: "",
    checkedBy: "",
    errorCode: "",
    picture: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const errorType = errorCheckbox
      .filter((option) => document.getElementById(option.id).checked)
      .map((option) => option.id)
      .join(", ");

    const highRisk = riskCheckbox
      .filter((option) => document.getElementById(option.id).checked)
      .map((option) => option.id)
      .join(", ");

    const errorCode = typeErrorCheckbox
      .filter((option) => document.getElementById(option.id).checked)
      .map((option) => option.id)
      .join(", ");

    const payload = {
      type: "near-miss",
      errorType: errorType || "none",
      highRisk: highRisk || "none",
      dispensedBy: formValues.current.dispensedBy || "",
      checkedBy: formValues.current.checkedBy || "",
      errorCode: errorCode || "none",
      drugName: formData.get("drugName") || "",
      possibleCause: formData.get("possibleCause") || "",
      actionTaken: formData.get("actionTaken") || "",
      picture: formValues.current.picture ? formValues.current.picture : "",
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
        alert("Near miss incident submitted successfully!");
        e.target.reset();
        formValues.current = {
          errorType: "",
          highRisk: "",
          dispensedBy: "",
          checkedBy: "",
          errorCode: "",
          picture: null,
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      formValues.current.picture = file.name;
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
          Near Miss
        </h4>
      </div>

      <div className="bg-white rounded-[16px]  mt-[30px] relative">
        <Link
          href="/"
          className="w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white absolute top-[27px] -left-4 hidden md:flex items-center justify-center"
        >
          <ArrowLeft />
        </Link>
        <div className='flex justify-between flex-wrap gap-4 mb-5'>
          <h4 className='text-[16px] sm:text-[25px] px-0  pt-0 sm:pt-[30px] pl-[30px] hidden md:flex'>
            Near Miss
          </h4>
        </div>
        <hr className='bg-[#DAECFF] my-[16px] hidden md:flex' />
        <div className='px-[30px] pb-[20px] sm:pb-[30px] pt-0'>
          <form action=''>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8'>
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
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
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
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-[18px]">Dispensed by (optional)</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Select
                  onValueChange={(value) =>
                    (formValues.current.dispensedBy = value)
                  }
                  className=""
                >
                  <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Select Two</SelectItem>
                    <SelectItem value="cst">Select Three</SelectItem>
                    <SelectItem value="mst">Select Four</SelectItem>
                  </SelectContent>
                </Select>
                <h5 className="text-[18px] mt-[20px]">Checked by (optional)</h5>
                <hr className="bg-[#DAECFF] my-[16px]" />
                <Select
                  onValueChange={(value) =>
                    (formValues.current.checkedBy = value)
                  }
                  className=""
                >
                  <SelectTrigger className="w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]">
                    <SelectValue placeholder="Select One" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="est">Select Two</SelectItem>
                    <SelectItem value="cst">Select Three</SelectItem>
                    <SelectItem value="mst">Select Four</SelectItem>
                  </SelectContent>
                </Select>
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
                      />
                      <label
                        htmlFor={option.id}
                        className="text-[16px] font-normal text-[#374151]"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-[30px]'>
                  <div className='space-y-3 flex flex-col justify-between'>
                    <label
                      htmlFor="drugName"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Name and Brand or Drug (supposed to be)
                    </label>
                    <Input
                      type="text"
                      name="drugName"
                      id="drugName"
                      placeholder="Write a short answer here."
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    />
                  </div>
                  <div className='space-y-3 flex flex-col justify-between'>
                    <label
                      htmlFor="possibleCause"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Possible cause / other information
                    </label>
                    <Input
                      type="text"
                      name="possibleCause"
                      id="possibleCause"
                      placeholder="Write a short answer here."
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    />
                  </div>
                  <div className='space-y-3 flex flex-col justify-between'>
                    <label
                      htmlFor="actionTaken"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Action Taken
                    </label>
                    <Input
                      type="text"
                      name="actionTaken"
                      id="actionTaken"
                      placeholder="Write a short answer here."
                      className=" bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid gap-8 mt-[30px]'>
              <div className=''>
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
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className='flex justify-end flex-wrap gap-4 mb-5 items-end'>
                <Button className="primary-btn !bg-transparent !border-[#262262] !text-[#262262] !py-[24px] max-w-[365px] w-full sm:!text-[18px] !text-[16px] cursor-pointer capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]">save draft</Button>
                <Button className='flex items-center gap-[16px] text-[#fff] transition-all duration-300  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group max-w-[365px] w-full text-[18px] cursor-pointer'>
                  Submit Incident
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NearMiss;