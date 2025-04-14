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

const pharmaciest = [
  {
    name: "Priti Pharmacy",
    email: "felicia.reid@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy1",
  },
  {
    name: "Priti Pharmacy",
    email: "alma.lawson@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy2",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy3",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy4",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy5",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy5",
  },
  {
    name: "Priti Pharmacy",
    email: "jitu@example.com",
    ods_code: "487441",
    address: "8502 Preston Rd. Inglewood, Maine 98380",
    town: "Town BO",
    gphc_code: "3002",
    iconKey: "pharmacy5",
  },
];

const ListOfPharmacist = () => {
  return (
    <section className='bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]'>
      <div>
        <div className='flex justify-between flex-wrap gap-4 mb-5'>
          <h4 className='text-[16px] sm:text-[25px]'>
            List of Pharmacists Joined (last 7 days)
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
                  Name
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  Email
                </TableHead>
                <TableHead className='text-black font-semibold p-[20px]'>
                  GPHC Code
                </TableHead>

                <TableHead className='text-black font-semibold p-[20px]'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pharmaciest.map((pharmacy, index) => {
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
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.email}
                    </TableCell>

                    <TableCell className='py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]'>
                      {pharmacy.gphc_code}
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

export default ListOfPharmacist;
