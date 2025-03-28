"use client";
import React, { useEffect, useState } from "react";
import context from "./context";
import { usePathname } from "next/navigation";

const ThemeProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
  };
  return <context.Provider value={value}>{children}</context.Provider>;
};

export default ThemeProvider;
