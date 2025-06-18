"use client";
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import { API_BASE_URL, PHARMACY_STATUS } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import AddCircle from "@/assets/images/add-circle.svg";
import PharmaciesModal from "./PharmaciesModal";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PharmaciesList = ({ type }) => {
  const [pharmacies, setPharmacies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { token } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/pharmacies${
            type === "approval-pending"
              ? `?status=${PHARMACY_STATUS.PENDING}&page=${currentPage}&limit=${itemsPerPage}`
              : `?page=${currentPage}&limit=${itemsPerPage}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPharmacies(response.data?.data?.items || []);
        setTotalPages(response.data?.data?.totalPages || 1);
        setTotalItems(response.data?.data?.totalItems || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pharmacies:", error);
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, [token, refetchedAt, type, currentPage]);

  useEffect(() => {
    if (!isModalOpen) {
      document.body.style.pointerEvents = "auto";
    }
  }, [isModalOpen]);

  const handleApprove = async (id) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/pharmacies/${id}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error approving pharmacy:", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.post(
        `${API_BASE_URL}/api/v1/pharmacies/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error rejecting pharmacy:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/v1/pharmacies/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error deleting pharmacy:", error);
    }
  };

  const handleViewEdit = (id) => {
    setSelectedPharmacyId(id);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedPharmacyId(null);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPharmacyId(null);
  };

  const handleModalSuccess = () => {
    setRefetchedAt(Date.now());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    items.push(
      <PaginationItem key="prev">
        <PaginationPrevious
          onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          className={
            currentPage === 1
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            onClick={() => handlePageChange(i)}
            isActive={currentPage === i}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    items.push(
      <PaginationItem key="next">
        <PaginationNext
          onClick={() =>
            handlePageChange(Math.min(totalPages, currentPage + 1))
          }
          className={
            currentPage === totalPages
              ? "pointer-events-none opacity-50"
              : "cursor-pointer"
          }
        />
      </PaginationItem>
    );

    return items;
  };

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex justify-between flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]">
          <h4 className="text-[16px] sm:text-[25px]">
            {type === "approval-pending"
              ? "Pharmacies Pending Approval"
              : "Pharmacies"}
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
              Add Pharmacy
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
                  ODS Code
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Address
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Town
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Postcode
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
              ) : pharmacies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-4">
                    No pharmacies found
                  </TableCell>
                </TableRow>
              ) : (
                pharmacies.map((pharmacy) => (
                  <TableRow
                    key={pharmacy?.id}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF]">
                      <div className="flex items-center gap-3.5">
                        {pharmacy?.logo ? (
                          <Image
                            src={
                              pharmacy?.logo?.startsWith("http")
                                ? pharmacy?.logo
                                : `${API_BASE_URL}/public/img/${pharmacy?.logo}`
                            }
                            alt={pharmacy?.name}
                            width={42}
                            height={42}
                            className="rounded-full h-[42px] w-[42px]"
                          />
                        ) : (
                          <div className="w-[42px] h-[42px] rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-lg">
                              {pharmacy?.name?.charAt(0) || "?"}
                            </span>
                          </div>
                        )}
                        <div className="flex flex-col">
                          <h6 className="text-[14px] font-medium mb-1">
                            {pharmacy?.name}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacy?.odsCode}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacy?.addressLine1}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacy?.town}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {pharmacy?.postCode}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <HiDotsVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewEdit(pharmacy.id)}
                          >
                            View/Edit
                          </DropdownMenuItem>
                          {type === "approval-pending" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => handleApprove(pharmacy.id)}
                              >
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleReject(pharmacy.id)}
                              >
                                Reject
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(pharmacy.id)}
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

        {!loading && pharmacies.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
              entries
            </div>
            <Pagination>
              <PaginationContent>{renderPaginationItems()}</PaginationContent>
            </Pagination>
          </div>
        )}
      </div>

      <PharmaciesModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        pharmacyId={selectedPharmacyId}
        onSuccess={handleModalSuccess}
        setRefetchedAt={setRefetchedAt}
      />
    </section>
  );
};

export default PharmaciesList;
