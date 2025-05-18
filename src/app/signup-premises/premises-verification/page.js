"use client";
import Verification from "@/components/Verification/Verification";
import React from "react";
import { useSearchParams } from "next/navigation";

const SignupPremisesVerification = () => {
  const searchParams = useSearchParams();
  const queryData = Object.fromEntries(searchParams.entries());

  return (
    <>
      <Verification queryData={queryData} />
    </>
  );
};

export default SignupPremisesVerification;
