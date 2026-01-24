"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/api-interceptor";
import { API_BASE_URL } from "@/config/constant";
import useAuthStore from "@/store/useAuthStore";
import toast from "react-hot-toast";

const defaultForm = {
  drugName: "",
  quantity: "",
  basicPrice: "",
  category: "",
  extraInfo: "",
};

const DrugModal = ({
  isOpen,
  onClose,
  drugId,
  onSuccess,
  setRefetchedAt: setParentRefetchedAt,
}) => {
  const { token } = useAuthStore();
  const [formData, setFormData] = useState(defaultForm);
  const [loading, setLoading] = useState(false);
  const isCreating = !drugId;

  useEffect(() => {
    const fetchDrug = async () => {
      try {
        setLoading(true);
        const response = await api.get(`${API_BASE_URL}/api/v1/drugs/${drugId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data?.data;
        setFormData({
          drugName: data?.drugName || "",
          quantity: data?.quantity ?? "",
          basicPrice: data?.basicPrice ?? "",
          category: data?.category || "",
          extraInfo: data?.extraInfo || "",
        });
      } catch (error) {
        console.error("Error fetching drug:", error);
        toast.error(error.response?.data?.message || "Failed to load drug");
      } finally {
        setLoading(false);
      }
    };

    if (drugId && isOpen) {
      fetchDrug();
    } else if (isOpen && !drugId) {
      setFormData(defaultForm);
    }
  }, [drugId, isOpen, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      drugName: formData.drugName,
      quantity: formData.quantity === "" ? undefined : Number(formData.quantity),
      basicPrice:
        formData.basicPrice === "" ? undefined : Number(formData.basicPrice),
      category: formData.category || undefined,
      extraInfo: formData.extraInfo || undefined,
    };

    try {
      setLoading(true);
      if (isCreating) {
        await api.post(`${API_BASE_URL}/api/v1/drugs`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await api.put(`${API_BASE_URL}/api/v1/drugs/${drugId}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      toast.success(`Drug ${isCreating ? "created" : "updated"} successfully`);
      onSuccess?.();
      setParentRefetchedAt?.(Date.now());
      onClose?.();
    } catch (error) {
      console.error("Error saving drug:", error);
      toast.error(error.response?.data?.message || "Failed to save drug");
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
            {isCreating ? "Add Drug" : "Edit Drug"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Name</label>
            <Input
              name="drugName"
              value={formData.drugName}
              onChange={handleInputChange}
              placeholder="Drug name"
              required
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleInputChange}
                placeholder="Quantity"
                min={0}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">
                Basic Price
              </label>
              <Input
                type="number"
                step="0.01"
                name="basicPrice"
                value={formData.basicPrice}
                onChange={handleInputChange}
                placeholder="Basic price"
                min={0}
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Category</label>
            <Input
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="Category"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Extra Info
            </label>
            <Textarea
              name="extraInfo"
              value={formData.extraInfo}
              onChange={handleInputChange}
              placeholder="Notes or extra details"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DrugModal;





