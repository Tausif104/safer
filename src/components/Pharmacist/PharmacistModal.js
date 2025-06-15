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
import { API_BASE_URL, PHARMACIST_STATUS, USER_ROLE } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import generateRandomPassword from "@/utils/generateRandomPassword";
import UserCreatedWithPasswordDialog from "../User/UserCreatedWithPasswordDialog";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    gphcNumber: yup.string().required("GPHC Number is required"),
    managersName: yup.string(),
    managersPhone: yup.string(),
    managersGphcNumber: yup.string(),
  })
  .required();

const PharmacistModal = ({
  isOpen,
  onClose,
  pharmacistId,
  onSuccess,
  setRefetchedAt: setParentRefetchedAt,
  type,
}) => {
  const [pharmacist, setPharmacist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { token, pharmacy } = useAuthStore();
  const [refetchedAt, setRefetchedAt] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const isCreating = !pharmacistId;
  const role =
    type === USER_ROLE.DISPENSER ? USER_ROLE.DISPENSER : USER_ROLE.PHARMACIST;
  const roleUi =
    role.toLowerCase().charAt(0).toUpperCase() +
    role.toLowerCase().slice(1);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      gphcNumber: "",
      managersName: "",
      managersPhone: "",
      managersGphcNumber: "",
    },
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
        reset({
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
  }, [pharmacistId, isOpen, token, reset]);

  useEffect(() => {
    setParentRefetchedAt(refetchedAt);
  }, [refetchedAt, setParentRefetchedAt]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      if (isCreating) {
        const password = generateRandomPassword();
        setGeneratedPassword(password);
        await axios.post(
          `${API_BASE_URL}/api/v1/users?pharmacyId=${pharmacy?.id}`,
          {
            ...data,
            role,
            password: password,
            status: PHARMACIST_STATUS.APPROVED,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setShowPasswordModal(true);
      } else {
        await axios.put(`${API_BASE_URL}/api/v1/users/${pharmacistId}`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      setIsEditing(false);
      onSuccess?.();
      setRefetchedAt(Date.now());
    } catch (error) {
      console.error("Error saving pharmacist:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordModalClose = () => {
    reset();
  };

  if (!isOpen) return null;

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isCreating
                ? `Add New ${roleUi}`
                : isEditing
                ? `Edit ${roleUi}`
                : `${roleUi} Details`}
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
                      <p className="mt-1">
                        {pharmacist?.managersName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <label className="text-[#262262] text-base font-semibold mb-[14px]">
                        Manager&apos;s Phone
                      </label>
                      <p className="mt-1">
                        {pharmacist?.managersPhone || "N/A"}
                      </p>
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
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </Button>
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
                        {...register("name")}
                        error={errors.name?.message}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm">
                          {errors.name.message}
                        </p>
                      )}
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
                        type="email"
                        {...register("email")}
                        error={errors.email?.message}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
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
                        {...register("phone")}
                        error={errors.phone?.message}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
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
                        {...register("gphcNumber")}
                        error={errors.gphcNumber?.message}
                      />
                      {errors.gphcNumber && (
                        <p className="text-red-500 text-sm">
                          {errors.gphcNumber.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="managersName"
                        className="text-[#262262] text-base font-semibold mb-[14px]"
                      >
                        Manager&apos;s Name
                      </label>
                      <Input id="managersName" {...register("managersName")} />
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
                        {...register("managersPhone")}
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
                        {...register("managersGphcNumber")}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={onClose}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={loading}>
                      {isCreating ? "Create" : "Save Changes"}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      <UserCreatedWithPasswordDialog
        showPasswordModal={showPasswordModal}
        setShowPasswordModal={setShowPasswordModal}
        generatedPassword={generatedPassword}
        onClose={handlePasswordModalClose}
      />
    </>
  );
};

export default PharmacistModal;
