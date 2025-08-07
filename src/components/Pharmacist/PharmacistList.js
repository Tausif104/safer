"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import axios from "axios";
import { API_BASE_URL, USER_ROLE, PHARMACIST_STATUS } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import AddCircle from "@/assets/images/add-circle.svg";
import PharmacistModal from "./PharmacistModal";

const PharmacistList = ({ type }) => {
  const [pharmacists, setPharmacists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacistId, setSelectedPharmacistId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { token, pharmacy, user } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);

  useEffect(() => {
    let query = "";
    const pharmacyId = pharmacy?.id ? `pharmacyId=${pharmacy.id}&` : "";
    if (type === "approval-pending") {
      query = `${pharmacyId}role=${USER_ROLE.PHARMACIST}&status=${PHARMACIST_STATUS.PENDING}`;
    } else if (type === USER_ROLE.DISPENSER) {
      query = `${pharmacyId}role=${USER_ROLE.DISPENSER}`;
    } else {
      query = `${pharmacyId}role=${USER_ROLE.PHARMACIST}${
        [
          USER_ROLE.PHARMACIST,
          USER_ROLE.DISPENSER,
          USER_ROLE.PHARMACY,
        ].includes(user?.role)
          ? ""
          : `&status=${PHARMACIST_STATUS.APPROVED}`
      }`;
    }
    const fetchPharmacists = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users?${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPharmacists(response.data?.data?.users || response.data?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacists:", error);
        setLoading(false);
      }
    };
    fetchPharmacists();
  }, [pharmacy?.id, token, refetchedAt, type]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.pointerEvents = "auto";
    }
  }, [isModalOpen]);

  const handleApprove = async (user) => {
    try {
      if (user?.pharmacyUserId) {
        await axios.post(
          `${API_BASE_URL}/api/v1/pharmacies/approve-user`,
          { pharmacyUserId: user?.pharmacyUserId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (user?.userId) {
        await axios.put(`${API_BASE_URL}/api/v1/users/${user?.userId}`, {
          status: PHARMACIST_STATUS.APPROVED,
        });
      }
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error approving pharmacist:", error);
    }
  };

  const handleReject = async (user) => {
    try {
      if (user?.pharmacyUserId) {
        await axios.post(
          `${API_BASE_URL}/api/v1/pharmacies/reject-user`,
          { pharmacyUserId: user?.pharmacyUserId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else if (user?.userId) {
        await axios.put(`${API_BASE_URL}/api/v1/users/${user?.userId}`, {
          status: PHARMACIST_STATUS.REJECTED,
        });
      }
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error rejecting pharmacist:", error);
    }
  };

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

  const handleViewEdit = (id) => {
    setSelectedPharmacistId(id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPharmacistId(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPharmacistId(null);
  };

  const handleModalSuccess = () => {
    setRefetchedAt(Date.now());
  };

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex justify-between flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]">
          <h4 className="text-[16px] sm:text-[25px]">
            {(() => {
              if (type === "approval-pending") {
                return "Pharmacists Pending Approval";
              } else if (type === USER_ROLE.DISPENSER) {
                return "Dispensers";
              } else {
                return "Pharmacists";
              }
            })()}
          </h4>
          {type !== "approval-pending" && (
            <Button
              onClick={handleAddNew}
              className="bg-[#3B82F6] text-white px-4 py-2 rounded-md hover:bg-[#2563EB] cursor-pointer transition-colors flex items-center gap-2"
            >
              <Image
                className="brightness-0 invert-100 group-hover:brightness-100 group-hover:invert-0"
                width={26}
                src={AddCircle}
                alt=""
              />
              Add {type === USER_ROLE.DISPENSER ? "Dispenser" : "Pharmacist"}
            </Button>
          )}
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F9FB] border-0 text-[16px]">
                <TableHead className="text-black font-semibold p-[20px]">
                  Name
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Email
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Phone
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  GPHC Number
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Status
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : pharmacists.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No
                    {type === USER_ROLE.DISPENSER
                      ? " dispensers "
                      : " pharmacists "}
                    found
                  </TableCell>
                </TableRow>
              ) : (
                pharmacists.map((pharmacist) => (
                  <TableRow
                    key={pharmacist?.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF]">
                      <div className="flex items-center gap-3.5">
                        {pharmacist?.photo ? (
                          <img
                            src={
                              pharmacist?.photo.startsWith("http")
                                ? pharmacist?.photo
                                : `${API_BASE_URL}/public/img/${pharmacist?.photo}`
                            }
                            alt={pharmacist?.name}
                            width={42}
                            height={42}
                            className="rounded-full"
                          />
                        ) : (
                          <div className="w-[42px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-lg">
                              {pharmacist?.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h6 className="text-[14px] font-medium mb-1">
                            {pharmacist?.name}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacist?.email}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacist?.phone}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacist?.gphcNumber}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          pharmacist?.pharmacyUserStatus?.toLowerCase() ===
                            PHARMACIST_STATUS.APPROVED.toLowerCase() ||
                          pharmacist?.status?.toLowerCase() ===
                            PHARMACIST_STATUS.APPROVED.toLowerCase()
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {pharmacist?.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-[8px] px-[20px] border-b border-[#DAECFF]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="!bg-transparent text-[#707B8A] cursor-pointer focus:outline-0 focus:shadow-none">
                            <HiDotsVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewEdit(pharmacist?.id)}
                            className="cursor-pointer"
                          >
                            View/Edit
                          </DropdownMenuItem>
                          {type === "approval-pending" &&
                            !pharmacist?.isApproved && (
                              <>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleApprove({
                                      ...(pharmacist?.pharmacyUserId && {
                                        pharmacyUserId:
                                          pharmacist?.pharmacyUserId,
                                      }),
                                      ...(pharmacist?.id && {
                                        userId: pharmacist?.id,
                                      }),
                                    })
                                  }
                                  className="cursor-pointer"
                                >
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    handleReject({
                                      ...(pharmacist?.pharmacyUserId && {
                                        pharmacyUserId:
                                          pharmacist?.pharmacyUserId,
                                      }),
                                      ...(pharmacist?.id && {
                                        userId: pharmacist?.id,
                                      }),
                                    })
                                  }
                                  className="cursor-pointer"
                                >
                                  Reject
                                </DropdownMenuItem>
                              </>
                            )}
                          <DropdownMenuItem
                            onClick={() => handleDelete(pharmacist?.id)}
                            className="text-red-600 cursor-pointer"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <PharmacistModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        pharmacistId={selectedPharmacistId}
        onSuccess={handleModalSuccess}
        setRefetchedAt={setRefetchedAt}
        type={type}
      />
    </section>
  );
};

export default PharmacistList;
