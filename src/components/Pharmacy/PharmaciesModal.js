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
import api from "@/lib/api-interceptor";
import { API_BASE_URL } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import { Upload, Pencil } from "lucide-react";
import toast from "react-hot-toast";

const PharmaciesModal = ({
  isOpen,
  onClose,
  pharmacyId,
  onSuccess,
  setRefetchedAt: setParentRefetchedAt,
}) => {
  const [pharmacy, setPharmacy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { token } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);
  const isCreating = !pharmacyId;
  const [imagePreview, setImagePreview] = useState(null);
  const [showUploadBox, setShowUploadBox] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    addressLine1: "",
    town: "",
    postCode: "",
    phone: "",
    email: "",
    odsCode: "",
    gphcPremisesNumber: "",
    logo: "",
  });

  useEffect(() => {
    const fetchPharmacyDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${API_BASE_URL}/api/v1/pharmacies/${pharmacyId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPharmacy(response.data?.data);
        setFormData({
          name: response.data?.data?.name || "",
          addressLine1: response.data?.data?.addressLine1 || "",
          town: response.data?.data?.town || "",
          postCode: response.data?.data?.postCode || "",
          phone: response.data?.data?.phone || "",
          email: response.data?.data?.email || "",
          odsCode: response.data?.data?.odsCode || "",
          gphcPremisesNumber: response.data?.data?.gphcPremisesNumber || "",
          logo: response.data?.data?.logo || "",
        });

        // Set image preview
        if (response.data?.data?.logo) {
          setImagePreview(
            response.data.data.logo.startsWith("http")
              ? response.data.data.logo
              : `${API_BASE_URL}/public/img/${response.data.data.logo}`
          );
          setShowUploadBox(false);
        }
      } catch (error) {
        console.error("Error fetching pharmacy details:", error);
      } finally {
        setLoading(false);
      }
    };
    if (pharmacyId && isOpen) {
      fetchPharmacyDetails();
    }
  }, [pharmacyId, isOpen, token]);

  useEffect(() => {
    setParentRefetchedAt(refetchedAt);
  }, [refetchedAt, setParentRefetchedAt]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await api.post(
          `${API_BASE_URL}/api/v1/common/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setFormData((prev) => ({
            ...prev,
            logo: response.data.data.filePath,
          }));
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(error.response?.data?.message || "Failed to upload file");
        setImagePreview(pharmacy?.logo || null);
      }
    }
  };

  React.useEffect(() => {
    return () => {
      if (imagePreview && imagePreview !== pharmacy?.logo) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview, pharmacy?.logo]);

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
      if (isCreating) {
        await api.post(`${API_BASE_URL}/api/v1/pharmacies`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await api.put(
          `${API_BASE_URL}/api/v1/pharmacies/${pharmacyId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
      setIsEditing(false);
      onSuccess?.();
      setRefetchedAt(Date.now());
      onClose();
    } catch (error) {
      console.error("Error saving pharmacy:", error);
      toast.error(error.response?.data?.message || "Failed to save pharmacy");
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
            {isCreating
              ? "Add New Pharmacy"
              : isEditing
              ? "Edit Pharmacy"
              : "Pharmacy Details"}
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            Loading...
          </div>
        ) : (
          <div className="mt-4">
            {!isEditing && !isCreating ? (
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  {pharmacy?.logo ? (
                    <img
                      src={
                        pharmacy?.logo.startsWith("http")
                          ? pharmacy.logo
                          : `${API_BASE_URL}/public/img/${pharmacy.logo}`
                      }
                      alt={pharmacy?.name}
                      width={80}
                      height={80}
                      className="rounded-full h-[80px] w-[80px]"
                    />
                  ) : (
                    <div className="w-[80px] h-[80px] rounded-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500 text-2xl">
                        {pharmacy?.name?.charAt(0) || "?"}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{pharmacy?.name}</h3>
                    <p className="text-gray-600">{pharmacy?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Address
                    </label>
                    <p className="mt-1">
                      {pharmacy?.addressLine1}, {pharmacy?.town},{" "}
                      {pharmacy?.postCode}
                    </p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      Phone
                    </label>
                    <p className="mt-1">{pharmacy?.phone || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      ODS Code
                    </label>
                    <p className="mt-1">{pharmacy?.odsCode || "N/A"}</p>
                  </div>
                  <div>
                    <label className="text-[#262262] text-base font-semibold mb-[14px]">
                      GPHC Premises Number
                    </label>
                    <p className="mt-1">
                      {pharmacy?.gphcPremisesNumber || "N/A"}
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
                      required
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="addressLine1"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Address Line 1
                    </label>
                    <Input
                      id="addressLine1"
                      name="addressLine1"
                      value={formData?.addressLine1}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="town"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Town
                    </label>
                    <Input
                      id="town"
                      name="town"
                      value={formData?.town}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="postCode"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      Post Code
                    </label>
                    <Input
                      id="postCode"
                      name="postCode"
                      value={formData?.postCode}
                      onChange={handleInputChange}
                      required
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="odsCode"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      ODS Code
                    </label>
                    <Input
                      id="odsCode"
                      name="odsCode"
                      value={formData?.odsCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="gphcPremisesNumber"
                      className="text-[#262262] text-base font-semibold mb-[14px]"
                    >
                      GPHC Premises Number
                    </label>
                    <Input
                      id="gphcPremisesNumber"
                      name="gphcPremisesNumber"
                      value={formData?.gphcPremisesNumber}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  {showUploadBox ? (
                    <>
                      <p className="text-[#262262] text-[18px] mb-[10px] font-semibold">
                        Upload picture (optional)
                      </p>
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2.5 text-[#4B5563] rounded-[6px] h-[89px] text-base bg-[#F8F9FB] border-2 border-[#DAECFF] cursor-pointer"
                      >
                        <Upload /> Upload your file
                        <input
                          type="file"
                          id="file-upload"
                          onChange={handleFileUpload}
                          accept="image/*"
                          style={{ display: "none" }}
                        />
                      </label>
                    </>
                  ) : (
                    <div className="relative inline-block">
                      <img
                        src={imagePreview}
                        alt="Pharmacy Logo"
                        width={300}
                        height={300}
                        className="object-contain rounded-lg border border-[#DAECFF]"
                      />
                      <button
                        type="button"
                        onClick={() => setShowUploadBox(true)}
                        className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <Pencil className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  )}
                  {imagePreview && showUploadBox && (
                    <div className="mt-4">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        width={300}
                        height={300}
                        className="object-contain rounded-lg border border-[#DAECFF]"
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? "Saving..." : "Save"}
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

export default PharmaciesModal;
