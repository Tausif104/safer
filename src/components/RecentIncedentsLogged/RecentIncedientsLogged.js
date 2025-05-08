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
    date: "07/05/2016",
    time: "02:34 am",
    chacked: "Cameron Williamson (GPHC NO: 23615)",
    dispenser: "Annette Black",
  },
  {
    name: "Drug Interaction Error",
    date: "16/08/2013",
    time: "04:02 am",
    chacked: "Jenny Wilson (GPHC NO: 23615)",
    dispenser: "Darrell Steward",
  },
  {
    name: "Wrong Medication Dispensed",
    date: "18/09/2016",
    time: "02:30 pm",
    chacked: "Darrell Steward (GPHC NO: 23615)",
    dispenser: "Robert Fox",
  },
  {
    name: "Incorrect Dosage Given",
    date: "15/08/2017",
    time: "05:36 pm",
    chacked: "Wade Warren (GPHC NO: 23615)",
    dispenser: "Dianne Russell",
  },
  {
    name: "Drug Interaction Error",
    date: "15/08/2017",
    time: "06:32 pm",
    chacked: "Eleanor Pena (GPHC NO: 23615)",
    dispenser: "Marvin McKinney",
  },
  {
    name: "Wrong Medication Dispensed",
    date: "12/06/2020",
    time: "01:08 pm",
    chacked: "Leslie Alexander (GPHC NO: 23615)",
    dispenser: "Theresa Webb",
  },
];

const RecentIncedientsLogged = () => {
  return (
    <section className='bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]'>
      <div>
        <div className='flex justify-between flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]'>
          <h4 className='text-[16px] sm:text-[25px]'>
            Recent Incidents Logged
          </h4>
          <Link href='/' className='text-[14px] sm:text-[18px] text-[#3B82F6]'>
            See All
          </Link>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className='bg-[#F8F9FB] border-0 text-[16px]'>
                <TableHead className='text-black font-semibold p-[20px] min-w-[250px]'>
                  Incident Type
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  Date
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  Time
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  Checked By
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  Dispenser Name
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmaciest.map((pharmacy, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] whitespace-normal sm:min-w-[300px] min-w-[250px]'>
                      <div className='flex items-center gap-3.5'>
                        <Image
                          src={Icon}
                          alt={`${pharmacy.name} icon`}
                          width={42}
                          height={42}
                          className='rounded-full'
                        />

                        <div className='flex flex-col'>
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
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className='!bg-transparent text-[#707B8A] cursor-pointer focus:outline-0 focus:shadow-none'>
                            <HiDotsVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='end'>
                          <DropdownMenuItem>View</DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
