"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FaCheck } from "react-icons/fa";
import { FaCopy } from "react-icons/fa";

const UserCreatedWithPasswordDialog = ({
  showPasswordModal,
  setShowPasswordModal,
  generatedPassword,
  onClose,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleClose = () => {
    setShowPasswordModal(false);
    onClose?.();
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(generatedPassword);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };
  return (
    <Dialog open={showPasswordModal} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[24px] font-semibold text-[#262262]">
            User Created Successfully!
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-600 mb-4">
            Please save this password securely. It will not be shown again.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg flex items-center justify-between">
            <code className="text-lg font-mono">{generatedPassword}</code>
            <button
              onClick={handleCopyPassword}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer"
              title="Copy password"
            >
              {isCopied ? (
                <FaCheck className="text-green-600" />
              ) : (
                <FaCopy className="text-gray-600" />
              )}
            </button>
          </div>
          <button
            onClick={handleClose}
            className="mt-6 w-full bg-[#99C729] text-white py-3 rounded-full hover:bg-[#8ab324] transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreatedWithPasswordDialog;
