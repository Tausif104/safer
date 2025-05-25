"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

const IncidentSavedDialog = ({
  isOpen,
  onClose,
  reference,
  title = "Success!",
  message = "Your incident has been successfully submitted.",
  referenceLabel = "Incident Reference",
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(reference);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[24px] font-semibold text-[#262262]">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-6 text-center">
          <p className="text-[16px] text-[#374151] mb-4">{message}</p>
          <div className="bg-[#F8F9FB] p-4 rounded-lg">
            <p className="text-[14px] text-[#707B8A] mb-2">{referenceLabel}</p>
            <div className="flex items-center justify-between gap-2">
              <p className="text-[18px] font-semibold text-[#262262] break-all">
                {reference}
              </p>
              <button
                onClick={handleCopy}
                className="p-2 hover:bg-[#E5E7EB] rounded-full transition-colors cursor-pointer"
                title={isCopied ? "Copied!" : "Copy to clipboard"}
              >
                {isCopied ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#99C729]"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#707B8A]"
                  >
                    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="mt-6 w-full bg-[#99C729] text-white py-3 rounded-full hover:bg-[#8ab324] transition-colors"
          >
            Close
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default IncidentSavedDialog;
