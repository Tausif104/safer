import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon1 from "@/assets/images/pharmacy-icon1.svg";
import Icon2 from "@/assets/images/pharmacy-icon2.svg";
import Icon3 from "@/assets/images/pharmacy-icon3.svg";
import Icon4 from "@/assets/images/pharmacy-icon4.svg";
import Icon5 from "@/assets/images/pharmacy-icon5.svg";
import Icon from "@/assets/images/logged.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { MdOutlineFileDownload } from "react-icons/md";


const iconMap = {
  pharmacy1: Icon1,
  pharmacy2: Icon2,
  pharmacy3: Icon3,
  pharmacy4: Icon4,
  pharmacy5: Icon5,
};

const pharmaciest = [
  {
    name: "Wrong Medication Dispensed",
    date: "28/10/2012",
    time: "11:23 pm",
    chacked: "Jerome Bell (GPHC NO: 23615)",
    dispenser: "Guy Hawkins",
  },
  {
    name: "Incorrect Dosage Given",
    date: "28/10/2012",
    time: "02:34 am",
    chacked: "Cameron Williamson (GPHC NO: 23615)",
    dispenser: "Annette Black",
  },
  {
    name: "Drug Interaction Error",
    date: "28/10/2012",
    time: "04:02 am",
    chacked: "Jenny Wilson (GPHC NO: 23615)",
    dispenser: "Darrell Steward",
  },
  {
    name: "Drug Interaction Error",
    date: "28/10/2012",
    time: "02:30 pm",
    chacked: "Darrell Steward (GPHC NO: 23615)",
    dispenser: "Robert Fox",
  },
  {
    name: "Incorrect Dosage Given",
    date: "28/10/2012",
    time: "05:36 pm",
    chacked: "Wade Warren (GPHC NO: 23615)",
    dispenser: "Dianne Russell",
  },
  {
    name: "Drug Interaction Error",
    date: "28/10/2012",
    time: "06:32 pm",
    chacked: "Eleanor Pena (GPHC NO: 23615)",
    dispenser: "Marvin McKinney",
  },
  {
    name: "Wrong Medication Dispensed",
    date: "28/10/2012",
    time: "01:08 pm",
    chacked: "Leslie Alexander (GPHC NO: 23615)",
    dispenser: "Theresa Webb",
  },
  {
    name: "Incorrect Dosage Given",
    date: "28/10/2012",
    time: "05:36 pm",
    chacked: "Wade Warren (GPHC NO: 23615)",
    dispenser: "Dianne Russell",
  },
  {
    name: "Drug Interaction Error",
    date: "28/10/2012",
    time: "06:32 pm",
    chacked: "Eleanor Pena (GPHC NO: 23615)",
    dispenser: "Marvin McKinney",
  },
  {
    name: "Incorrect Dosage Given",
    date: "28/10/2012",
    time: "05:36 pm",
    chacked: "Wade Warren (GPHC NO: 23615)",
    dispenser: "Dianne Russell",
  },
];

const RecentIncedientsLogged = () => {
  return (
    <section className='bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]'>
      <div>
        <div className='flex justify-between items-center flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]'>
          <h4 className='text-[16px] sm:text-[25px]'>
            Incidents Logged Report
          </h4>
          <div className="flex items-center gap-[8px]">
            <span className="h-[38px] w-[38px] min-w-[38px] border border-[#DAECFF] rounded-full flex items-center justify-center"><IoPrintOutline /></span>
            <Select className=''>
                <SelectTrigger className='w-full bg-white p-[16px] !h-[36px] border rounded-[1000px] flex items-center gap-[10px] text-[14px] font-normal leading-[160%] text-[#262262] placeholder:text-[#262262] placeholder:font-normal placeholder:text-[16px] focus:outline-0 focus:shadow-none'>
                    <SelectValue placeholder='Monthly Report' />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value='mr1'>Yearly Report</SelectItem>
                    <SelectItem value='mr2'>Weekly Report</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <Table>
            <TableBody>
              {pharmaciest.map((pharmacy, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF]'>
                      <div className='flex items-center gap-3.5'>
                        <Image
                          src={Icon}
                          alt={`${pharmacy.name} icon`}
                          className='w-[32px] sm:w-[42px] h-[32px] sm:h-[42px] rounded-full'
                        />

                        <div className=''>
                          <h6 className='text-[14px] font-medium mb-1'>
                            {pharmacy.name}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.date}
                    </TableCell>

                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.time}
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.chacked}
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.dispenser}
                    </TableCell>
                    <TableCell className='text-right py-[8px] px-[20px] border-b border-[#DAECFF]'>
                        <button type="submit" className="primary-btn w-full cursor-pointer !border-[#99C729] !bg-transparent !text-[#99C729] !px-[20px]"><MdOutlineFileDownload /> Download</button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default RecentIncedientsLogged;
