"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";

const PharmacistModal = ({ isOpen, onClose, pharmacistId, onSuccess, setRefetchedAt: setParentRefetchedAt }) => {
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gphcNumber: "",
    managersName: "",
    managersPhone: "",
    managersGphcNumber: "",
  });

  useEffect(() => {
    const fetchPharmacistDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/users/${pharmacistId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPharmacist(response.data?.data);
        setFormData({
          name: response.data?.data?.name || "",
          email: response.data?.data?.email || "",
          phone: response.data?.data?.phone || "",
          gphcNumber: response.data?.data?.gphcNumber || "",
          managersName: response.data?.data?.managersName || "",
          managersPhone: response.data?.data?.managersPhone || "",
          managersGphcNumber: response.data?.data?.managersGphcNumber || "",
        });
      } catch (error) {
        console.error("Error fetching pharmacist details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (pharmacistId && isOpen) {
      fetchPharmacistDetails();
    }
  }, [pharmacistId, isOpen, token]);

  useEffect(() => {
    setParentRefetchedAt(refetchedAt);
  }, [refetchedAt, setParentRefetchedAt]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.put(
        `${API_BASE_URL}/api/v1/users/${pharmacistId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      onSuccess?.();
      setRefetchedAt(Date.now());
      onClose();
    } catch (error) {
      console.error("Error updating pharmacist:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Pharmacist" : "Pharmacist Details"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            Loading...
          </div>
        ) : (
          <div className="mt-4">
            {!isEditing ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  {pharmacist?.photo ? (
                    <Image
                      src={pharmacist?.photo}
                      alt={pharmacist?.name}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">
                        {pharmacist?.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">
                      {pharmacist?.name}
                    </h3>
                    <p className="text-gray-600">{pharmacist?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Phone
                    </label>
                    <p className="mt-1">{pharmacist?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      GPHC Number
                    </label>
                    <p className="mt-1">{pharmacist?.gphcNumber || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Manager&apos;s Name
                    </label>
                    <p className="mt-1">{pharmacist?.managersName || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Manager&apos;s Phone
                    </label>
                    <p className="mt-1">{pharmacist?.managersPhone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Manager&apos;s GPHC Number
                    </label>
                    <p className="mt-1">
                      {pharmacist?.managersGphcNumber || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={() => setIsEditing(true)}>
                    Edit
                  </Button>
                  <Button variant="outline" onClick={onClose}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData?.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData?.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData?.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="gphcNumber"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      GPHC Number
                    </label>
                    <Input
                      id="gphcNumber"
                      name="gphcNumber"
                      value={formData?.gphcNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="managersName"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Manager&apos;s Name
                    </label>
                    <Input
                      id="managersName"
                      name="managersName"
                      value={formData?.managersName}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="managersPhone"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Manager&apos;s Phone
                    </label>
                    <Input
                      id="managersPhone"
                      name="managersPhone"
                      value={formData?.managersPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="managersGphcNumber"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Manager&apos;s GPHC Number
                    </label>
                    <Input
                      id="managersGphcNumber"
                      name="managersGphcNumber"
                      value={formData?.managersGphcNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PharmacistModal;
