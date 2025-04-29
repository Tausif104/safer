"use client";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";

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

  return (
    <section className='mb-[30px] lg:mb-0'>
      <div className='flex md:hidden items-center pt-[25px]'>
        <Link
          href='/'
          className='w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white  top-[27px] -left-4 flex items-center justify-center'
        >
          <ArrowLeft />
        </Link>
        <h4 className='text-[24px] sm:text-[25px]  pl-[30px] flex'>
          Prescribing Intervention
        </h4>
      </div>

      <div className='bg-white rounded-[16px]  mt-[30px] relative'>
        <Link
          href='/'
          className='w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white absolute top-[27px] -left-4 hidden md:flex items-center justify-center'
        >
          <ArrowLeft />
        </Link>
        <div className='flex justify-between flex-wrap gap-4 mb-5'>
          <h4 className='text-[16px] sm:text-[25px] px-0  pt-0 sm:pt-[30px] pl-[30px] hidden md:flex'>
            Prescribing Intervention
          </h4>
        </div>
        <hr className='bg-[#DAECFF] my-[16px] hidden md:flex' />
        <div className='px-[30px] pb-[20px] sm:pb-[30px] pt-0'>
          <form action=''>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6'>
              <div>
                <h5 className='text-[18px]'>Query</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  {queryCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className='flex items-center space-x-3'
                    >
                      <Checkbox
                        id={option.id}
                        className='h-[20px] w-[20px] border-[#374151]'
                      />
                      <label
                        htmlFor={option.id}
                        className='text-[16px] font-normal text-[#374151]'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>Action Taken</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  {actionCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className='flex items-center space-x-3'
                    >
                      <Checkbox
                        id={option.id}
                        className='h-[20px] w-[20px] border-[#374151]'
                      />
                      <label
                        htmlFor={option.id}
                        className='text-[16px] font-normal text-[#374151]'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>Prescription type</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  {prescriptionsCheckbox.map((option) => (
                    <div
                      key={option.id}
                      className='flex items-center space-x-3'
                    >
                      <Checkbox
                        id={option.id}
                        className='h-[20px] w-[20px] border-[#374151]'
                      />
                      <label
                        htmlFor={option.id}
                        className='text-[16px] font-normal text-[#374151]'
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>Patients age</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  <RadioGroup defaultValue='12-18'>
                    {ageOptions.map((option) => (
                      <div
                        key={option.id}
                        className='flex items-center space-x-2'
                      >
                        <RadioGroupItem
                          className='w-[20px] h-[20px] border-[#374151]'
                          style={{ borderRadius: "4px" }}
                          id={option.id}
                          value={option.id}
                        />
                        <label
                          htmlFor={option.id}
                          className='text-sm font-medium leading-none'
                        >
                          {option.label}
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              </div>
              <div className='lg:col-span-2'>
                <div>
                  <h5 className='text-[16px]'>
                    Record Submitted to Patient to
                    LFPSE? https://record.learn-from-patient-safety-events.nhs.uk/
                  </h5>
                  <hr className='bg-[#DAECFF] my-[16px]' />
                  <div className='flex flex-col space-y-4'>
                    <RadioGroup defaultValue='12-18'>
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className='flex items-center space-x-2'
                        >
                          <RadioGroupItem
                            className='w-[20px] h-[20px] border-[#374151]'
                            style={{ borderRadius: "4px" }}
                            id={option.id}
                            value={option.id}
                          />
                          <label
                            htmlFor={option.id}
                            className='text-sm font-medium leading-none'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <div className='mt-[30px]'>
                  <h5 className='text-[18px]'>Recorded on PMR</h5>
                  <hr className='bg-[#DAECFF] my-[16px]' />
                  <div className='flex flex-col space-y-4'>
                    <RadioGroup defaultValue='12-18'>
                      {lfpseCheckbox.map((option) => (
                        <div
                          key={option.id}
                          className='flex items-center space-x-2'
                        >
                          <RadioGroupItem
                            className='w-[20px] h-[20px] border-[#374151]'
                            style={{ borderRadius: "4px" }}
                            id={option.id}
                            value={option.id}
                          />
                          <label
                            htmlFor={option.id}
                            className='text-sm font-medium leading-none'
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex justify-between flex-wrap gap-4 mb-5 mt-[30px] items-end'>
              <div>
                <label
                  htmlFor='answer'
                  className='text-[#262262] text-[18px] mb-[10px] font-semibold'
                >
                  Briefly describe what happened and how it was resolved
                </label>

                <Input
                  type='text'
                  placeholder='Write a short answer here.'
                  id='answer'
                  className='mt-[10px] bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                />
              </div>
              <Button className='flex items-center gap-[16px] text-[#fff] transition-all duration-300  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group max-w-[365px] w-full text-[18px]'>
                Submit Incident
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PrescribingIntervention;