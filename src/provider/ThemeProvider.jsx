"use client";
import React, { useEffect, useState } from "react";
import context from "./context";
import { usePathname } from "next/navigation";

const ThemeProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);

  const pathname = usePathname();

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const value = {
    handleToggle,
    isExpanded,
    setIsExpanded,
    isGlobalLoading,
    setIsGlobalLoading,
  };

  return (
    <context.Provider value={value}>
      {children}
      {isGlobalLoading && (
        <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-[9999]">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4 max-w-sm mx-4 shadow-2xl border border-gray-200">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#99C729]"></div>
            <p className="text-gray-600 text-center">
              Switching pharmacy, please wait...
            </p>
          </div>
        </div>
      )}
    </context.Provider>
  );
};

export default ThemeProvider;
