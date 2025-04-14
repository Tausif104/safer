import React from "react";
import Link from "next/link";
import Image from "next/image";
import Icon1 from "@/assets/images/pharmacy-icon1.svg";
import Icon2 from "@/assets/images/pharmacy-icon2.svg";
import Icon3 from "@/assets/images/pharmacy-icon3.svg";
import Icon4 from "@/assets/images/pharmacy-icon4.svg";
import Icon5 from "@/assets/images/pharmacy-icon5.svg";
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

const pharmacies = [
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy1",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy2",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy3",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy4",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy5",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy5",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    date: "15/05/2020",
    address: "3517 W. Gray St. Utica, Pennsylvania 57867",
    town: "Town BO",
    time: "03:48 am",
    iconKey: "pharmacy5",
  },
];

const DashboardNotificationTable = () => {
  return (
    <section className='bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px]'>
      <div>
        <div>
          <Table>
            <TableBody>
              {pharmacies.map((pharmacy, index) => {
                const IconComponent = iconMap[pharmacy.iconKey];
                return (
                  <TableRow key={index}>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF]'>
                      <div className='flex items-center gap-3.5'>
                        {IconComponent && (
                          <Image
                            src={IconComponent}
                            alt={`${pharmacy.name} icon`}
                            width={42}
                            height={42}
                            className='rounded-full'
                          />
                        )}
                        <div className='flex flex-col'>
                          <h6 className='text-[14px] font-medium mb-1'>
                            {pharmacy.name}
                          </h6>
                          <p className='text-[12px] text-[#707B8A]'>
                            {pharmacy.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      Description: {pharmacy.address}
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.date}
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.time}
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      <div>
                        <button className='px-[16px] py-[8px] rounded-full border border-[#F60000] text-[14px] text-[#F60000]'>
                          Reject
                        </button>
                        <button className='px-[16px] py-[8px] rounded-full border border-[#3B8D0B] text-[14px] text-[#3B8D0B] hover:bg-[#3B8D0B]'>
                          Approve
                        </button>
                      </div>
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

export default DashboardNotificationTable;
