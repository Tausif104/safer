"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HiDotsVertical } from "react-icons/hi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import api from "@/lib/api-interceptor";
import { API_BASE_URL } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import DrugModal from "./DrugModal";
import toast from "react-hot-toast";

const ITEMS_PER_PAGE = 10;

const DrugsList = () => {
  const { token, _hasHydrated } = useAuthStore();
  const [drugs, setDrugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [activeQuery, setActiveQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedDrugId, setSelectedDrugId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refetchedAt, setRefetchedAt] = useState(null);

  const isSearching = useMemo(
    () => activeQuery.trim().length > 0,
    [activeQuery]
  );

  useEffect(() => {
    if (!_hasHydrated || !token) return;

    const fetchDrugs = async () => {
      setLoading(true);
      try {
        if (isSearching) {
          const response = await api.get(
            `${API_BASE_URL}/api/v1/drugs/search`,
            {
              params: { query: activeQuery },
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const results = response.data?.data || [];
          setDrugs(results);
          setTotalPages(1);
          setTotalItems(results.length);
        } else {
          const response = await api.get(`${API_BASE_URL}/api/v1/drugs`, {
            params: { page: currentPage, limit: ITEMS_PER_PAGE },
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response.data?.data;
          setDrugs(data?.items || []);
          setTotalPages(data?.totalPages || 1);
          setTotalItems(data?.total || data?.items?.length || 0);
        }
      } catch (error) {
        console.error("Error fetching drugs:", error);
        toast.error(error.response?.data?.message || "Failed to fetch drugs");
      } finally {
        setLoading(false);
      }
    };

    fetchDrugs();
  }, [
    token,
    _hasHydrated,
    currentPage,
    refetchedAt,
    activeQuery,
    isSearching,
  ]);

  const handleAddNew = () => {
    setSelectedDrugId(null);
    setIsModalOpen(true);
  };

  const handleEdit = (id) => {
    setSelectedDrugId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this drug?");
    if (!confirmDelete) return;
    try {
      await api.delete(`${API_BASE_URL}/api/v1/drugs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Drug deleted successfully");
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error deleting drug:", error);
      toast.error(error.response?.data?.message || "Failed to delete drug");
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDrugId(null);
  };

  const handleModalSuccess = () => {
    setRefetchedAt(Date.now());
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    setActiveQuery(searchValue.trim());
  };

  const handleClearSearch = () => {
    setSearchValue("");
    setActiveQuery("");
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
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
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
            onClick={() => setCurrentPage(1)}
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
            onClick={() => setCurrentPage(i)}
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
            onClick={() => setCurrentPage(totalPages)}
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
            setCurrentPage(Math.min(totalPages, currentPage + 1))
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
      <div className="flex justify-between flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]">
        <h4 className="text-[16px] sm:text-[25px]">Drugs</h4>
        <div className="flex flex-wrap gap-2">
          <form className="flex gap-2" onSubmit={handleSearchSubmit}>
            <Input
              placeholder="Search drugs"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="w-[220px]"
            />
            <Button type="submit" variant="outline">
              Search
            </Button>
            {activeQuery && (
              <Button type="button" variant="ghost" onClick={handleClearSearch}>
                Clear
              </Button>
            )}
          </form>
          <Button onClick={handleAddNew}>Add Drug</Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Basic Price</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Extra Info</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {drugs.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    No drugs found
                  </TableCell>
                </TableRow>
              ) : (
                drugs.map((drug) => (
                  <TableRow key={drug.id}>
                    <TableCell className="font-medium">
                      {drug.drugName}
                    </TableCell>
                    <TableCell>{drug.quantity ?? "—"}</TableCell>
                    <TableCell>
                      {drug.basicPrice !== null && drug.basicPrice !== undefined
                        ? `£${Number(drug.basicPrice).toFixed(2)}`
                        : "—"}
                    </TableCell>
                    <TableCell>{drug.category || "—"}</TableCell>
                    <TableCell className="max-w-[240px]">
                      <span className="line-clamp-2">
                        {drug.extraInfo || "—"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger className="p-2 rounded-full hover:bg-gray-100">
                          <HiDotsVertical />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(drug.id)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(drug.id)}
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
      )}

      {!isSearching && drugs.length > 0 && (
        <div className="flex justify-between items-center mt-6 px-[15px]">
          <div className="text-sm text-gray-600">
            Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
            {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems}
          </div>
          <Pagination>
            <PaginationContent>{renderPaginationItems()}</PaginationContent>
          </Pagination>
        </div>
      )}

      <DrugModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        drugId={selectedDrugId}
        onSuccess={handleModalSuccess}
        setRefetchedAt={setRefetchedAt}
      />
    </section>
  );
};

export default DrugsList;

