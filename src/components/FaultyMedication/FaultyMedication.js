"use client";
import React from "react";
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
      <p className='text-base text-[#4B5563]   md:hidden mt-[20px]'>
        Please use this form to record any near misses. For dispensing errors,
        this need to be reported on ProScript under 'Incident Report'.
      </p>

      <div className='bg-white rounded-[16px]  mt-[30px] relative'>
        <Link
          href='/'
          className='w-[38px] h-[38px] rounded-full border border-[#E7FBBD] bg-white absolute top-[27px] -left-4 hidden md:flex items-center justify-center'
        >
          <ArrowLeft />
        </Link>
        <div className='flex justify-between flex-col gap-4 mb-5 pl-[30px]'>
          <h4 className='text-[16px] sm:text-[25px] px-0  pt-0 sm:pt-[30px]  hidden md:flex'>
            Near Miss Log
          </h4>
          <p className='text-base text-[#4B5563] hidden md:block'>
            Please use this form to record any near misses. For dispensing
            errors, this need to be reported on ProScript under 'Incident
            Report'.
          </p>
        </div>
        <hr className='bg-[#DAECFF] my-[16px] hidden md:flex' />
        <div className='px-[30px] pb-[20px] sm:pb-[30px] pt-0'>
          <form action=''>
            <div className='grid grid-cols-1 gap-8'>
              <div>
                <h5 className='text-[18px]'>Customer Information:</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <Input
                    type='text'
                    placeholder='Enter your full name'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='number'
                    placeholder='Phone Number'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='email'
                    placeholder='Email Address'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Date of Return'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>Medication/Device Information:</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <Input
                    type='text'
                    placeholder='Product Name (Medication/Device)'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Batch/Lot Number (if available)'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Expiry Date'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Date issued to patient'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Quantity Returned'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Date of Return'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Select className=''>
                    <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                      <SelectValue placeholder='Age' />
                    </SelectTrigger>
                    <SelectContent>
                      {ageOptions.map((option) => (
                        <SelectItem key={option.id} value={option.id}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select className=''>
                    <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                      <SelectValue placeholder='Sex' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='male'>Male</SelectItem>
                      <SelectItem value='female'>Female</SelectItem>
                      <SelectItem value='others'>Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>Issue Description:</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
                  <Select className=''>
                    <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                      <SelectValue placeholder='Faulty Medication' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='one'>Faulty Medication</SelectItem>
                      <SelectItem value='two'>Faulty Medication</SelectItem>
                      <SelectItem value='three'>Faulty Medication</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select className=''>
                    <SelectTrigger className='w-full  bg-[#F8F9FB] p-[16px] !h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'>
                      <SelectValue placeholder='Faulty Device' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='one'>Faulty Device</SelectItem>
                      <SelectItem value='two'>Faulty Device</SelectItem>
                      <SelectItem value='three'>Faulty Device</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type='text'
                    placeholder='Other'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>
              </div>
              <div>
                <h5 className='text-[18px]'>
                  Detailed Description of the Issue:
                </h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  <Input
                    type='text'
                    placeholder='Product Name (Medication/Device)'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>
              </div>
              <div className='flex flex-col space-y-4 '>
                <label
                  htmlFor=''
                  className='text-[#262262] text-base font-semibold mb-[14px]'
                >
                  Did you experience any side effects or adverse reactions?
                </label>
                {lfpseCheckbox.map((option) => (
                  <div key={option.id} className='flex items-center space-x-3'>
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
                <Input
                  type='text'
                  placeholder='If yes, please describe'
                  id='answer'
                  className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                />
              </div>
              <div>
                <h5 className='text-[18px]'>Action Taken:</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-5'>
                  <div className='flex flex-wrap items-center space-x-3'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Refund:
                    </label>
                    <RadioGroup defaultValue='' className='flex flex-wrap'>
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
                  <div className='flex items-center space-x-3'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Refund:
                    </label>
                    <RadioGroup defaultValue='' className='flex flex-wrap'>
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
                  <div className='flex items-center space-x-3'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Exchange:
                    </label>
                    <RadioGroup defaultValue='' className='flex flex-wrap'>
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
                  <div className='flex items-center space-x-3'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Investigation needed:
                    </label>
                    <RadioGroup defaultValue='' className='flex '>
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
                  <div className='flex flex-wrap items-center space-x-3 space-y-2'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Replacement Script / Item requested from Surgery:
                    </label>
                    <RadioGroup
                      defaultValue=''
                      className='flex flex-col md:flex-row'
                    >
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
                  <div className='flex flex-wrap items-center space-x-3 space-y-2'>
                    <label htmlFor='' className='text-base text-[#262262]'>
                      Yellow card Reported{" "}
                      <Link
                        href='https://yellowcard.mhra.gov.uk/'
                        className='text-[#3B82F6] underline'
                      >
                        https://yellowcard.mhra.gov.uk/
                      </Link>
                      :
                    </label>
                    <RadioGroup
                      defaultValue=''
                      className='flex flex-col md:flex-row'
                    >
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
                  <Input
                    type='text'
                    placeholder='please specify details from report'
                    id='answer'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>

                <h5 className='text-[18px] mt-[20px]'>
                  Any Additional Notes/Comments:
                </h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col space-y-4'>
                  <Input
                    type='text'
                    placeholder='Enter your notes/comments'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>
              </div>

              <div>
                <h5 className='text-[18px]'>Pharmacy Staff Use Only:</h5>
                <hr className='bg-[#DAECFF] my-[16px]' />
                <div className='flex flex-col md:flex-row  space-x-6 space-y-4'>
                  <Input
                    type='text'
                    placeholder='Received By'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                  <Input
                    type='text'
                    placeholder='Date'
                    className=' bg-[#F8F9FB] p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
                  />
                </div>
              </div>
            </div>
            <div className=' mt-[30px ] flex justify-end'>
              <div className='flex items-end'>
                <Button className='flex items-center gap-[16px] text-[#fff] transition-all duration-300 min-w-[350px]  hover:opacity-[1] py-[26px] px-[15px] lg:px-[20px] rounded-full group  w-full text-[18px]'>
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

export default FaultyMedication;
