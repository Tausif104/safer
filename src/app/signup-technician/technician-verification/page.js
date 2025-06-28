import Verification from "@/components/Verification/Verification";
import { USER_ROLE } from "@/config/constant";
import React from "react";

const SignupPremisesVerification = () => {
  return (
    <>
      <Verification queryData={{ userType: USER_ROLE.PHARMACIST }} />
    </>
  );
};

export default SignupPremisesVerification;
