"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const PharmacyConfirmationModal = ({
  isOpen,
  onClose,
  pharmacy,
  onConfirm,
  isSubmitting,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Pharmacy Login</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-600 mb-6">
            Do you want to login to {pharmacy?.name}?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              No, Cancel
            </Button>
            <Button
              onClick={onConfirm}
              disabled={isSubmitting}
              className="cursor-pointer"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Spinner size="sm" className="text-white" />
                  <span>Logging in...</span>
                </div>
              ) : (
                "Yes, Proceed"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PharmacyConfirmationModal;
