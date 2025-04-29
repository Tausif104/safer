"use client";
import React, { useState } from "react";
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
    {
      id: "e",
      label: "E = out of date",
    },

    { id: "n", label: "N = incorrect patient name" },
    { id: "f", label: "F = incorrect Form" },
    { id: "x", label: "X = transposed labels" },
    { id: "m", label: "M = Missing item" },
    { id: "q", label: "Q = incorrect Quantity" },
    { id: "p", label: "P = misread prescription" },
    { id: "s", label: "S = incorrect strength" },
    { id: "mds", label: "MDS = monitored dosage system" },
    { id: "other", label: "Other" },
  ];
  const riskCheckbox = [
    { id: "controlled-drug", label: "Controlled Drug" },
    {
      id: "mds-nomad",
      label: "MDS - NOMAD",
    },
    { id: "lasa", label: "LASA" },
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
          Near Miss Log
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
            Near Miss Log
          </h4>
        </div>
        <hr className='bg-[#DAECFF] my-[16px] hidden md:flex' />
        <div className='px-[30px] pb-[20px] sm:pb-[30px] pt-0'>
          <form action=''>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
              <div>
                <h5 className='text-[18px]'>Type of Error</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  {errorCheckbox.map((option) => (
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
                <h5 className='text-[18px]'>High Risk</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  {riskCheckbox.map((option) => (
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
                <h5 className='text-[18px]'>Dispensed by (optional)</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <Select className=''>
                  <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                    <SelectValue placeholder='Select One' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='est'>Select Two</SelectItem>
                    <SelectItem value='cst'>Select Three</SelectItem>
                    <SelectItem value='mst'>Select Four</SelectItem>
                  </SelectContent>
                </Select>
                <h5 className='text-[18px] mt-[20px]'>Checked by (optional)</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <Select className=''>
                  <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                    <SelectValue placeholder='Select One' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='est'>Select Two</SelectItem>
                    <SelectItem value='cst'>Select Three</SelectItem>
                    <SelectItem value='mst'>Select Four</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className='lg:col-span-3'>
                <h5 className='text-[18px]'>Type Of Error</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]'>
                  {typeErrorCheckbox.map((option) => (
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] mt-[30px]'>
                  <div className='space-y-3 flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-[#262262] text-base font-semibold mb-[14px]'
                    >
                      Name and Brand or Drug (supposed to be)
                    </label>
                    <Input
                      type='text'
                      placeholder='Write a short answer here.'
                      className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                    />
                  </div>
                  <div className='space-y-3 flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-[#262262] text-base font-semibold mb-[14px]'
                    >
                      Possible cause / other information
                    </label>
                    <Input
                      type='text'
                      placeholder='Write a short answer here.'
                      className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                    />
                  </div>
                  <div className='space-y-3 flex flex-col'>
                    <label
                      htmlFor=''
                      className='text-[#262262] text-base font-semibold mb-[14px]'
                    >
                      Action Taken 
                    </label>
                    <Input
                      type='text'
                      placeholder='Write a short answer here.'
                      className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-[30px]'>
              <div className='lg:col-span-2 '>
                <p
                  htmlFor='answer'
                  className='text-[#262262] text-[18px] mb-[10px] font-semibold'
                >
                  Upload picture (optional)
                </p>
                <label
                  htmlFor='file-upload'
                  className='flex items-center justify-center gap-2.5 text-[#4B5563] rounded-[6px] h-[89px] text-base bg-[#F8F9FB] border-2 border-[#DAECFF] cursor-pointer'
                >
                  <Upload /> Upload your file
                  <input
                    type='file'
                    id='file-upload'
                    style={{ display: "none" }}
                  />
                </label>
              </div>
              <div className='flex items-end'>
                <Button className='flex items-center gap-[16px] text-[#fff] transition-all duration-300  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group  w-full text-[18px]'>
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
