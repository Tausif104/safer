import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API_BASE_URL, PHARMACIST_STATUS } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";

const iconMap = {
  pharmacy1: Icon1,
  pharmacy2: Icon2,
  pharmacy3: Icon3,
  pharmacy4: Icon4,
  pharmacy5: Icon5,
};

const ListOfPharmacist = ({ status = PHARMACIST_STATUS.APPROVED }) => {
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);

  useEffect(() => {
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users?role=pharmacist&status=${status}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPharmacists(response.data?.data?.users || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
        setLoading(false);
      }
    };
    fetchPharmacists();
  }, [token, refetchedAt, status]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error deleting pharmacist:", error);
    }
  };

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex justify-between flex-wrap gap-4 mb-5">
          <h4 className="text-[16px] sm:text-[25px]">
            List of Pharmacists{" "}
            {status === PHARMACIST_STATUS.APPROVED
              ? "Joined (last 7 days)"
              : status === PHARMACIST_STATUS.PENDING
              ? "Pending Approval"
              : "Rejected"}
          </h4>
          <Link
            href={
              status === PHARMACIST_STATUS.PENDING
                ? "/pharmacists-approval-pending"
                : "/pharmacists"
            }
            className="text-[14px] sm:text-[18px] text-[#3B82F6]"
          >
            See All
          </Link>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F9FB] border-0 text-[16px]">
                <TableHead className="text-black font-semibold p-[20px] min-w-[250px]">
                  Name
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Email
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  GPHC Code
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : pharmacists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-4">
                    No pharmacists found
                  </TableCell>
                </TableRow>
              ) : (
                pharmacists.map((pharmacist, index) => {
                  const IconComponent = iconMap[`pharmacy${(index % 5) + 1}`];
                  return (
                    <TableRow key={pharmacist.id}>
                      <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF]">
                        <div className="flex items-center gap-3.5">
                          {pharmacist.photo ? (
                            <Image
                              src={pharmacist.photo}
                              alt={pharmacist.name}
                              width={42}
                              height={42}
                              className="rounded-full"
                            />
                          ) : (
                            IconComponent && (
                              <Image
                                src={IconComponent}
                                alt={`${pharmacist.name} icon`}
                                width={42}
                                height={42}
                                className="rounded-full"
                              />
                            )
                          )}
                          <div className="flex flex-col">
                            <h6 className="text-[14px] font-medium mb-1">
                              {pharmacist.name}
                            </h6>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                        {pharmacist.email}
                      </TableCell>
                      <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                        {pharmacist.gphcNumber}
                      </TableCell>
                      <TableCell className="text-right py-[8px] px-[20px] border-b border-[#DAECFF]">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button className="!bg-transparent text-[#707B8A] cursor-pointer focus:outline-0 focus:shadow-none">
                              <HiDotsVertical />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleDelete(pharmacist.id)}
                              className="text-red-600 cursor-pointer"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default ListOfPharmacist;
