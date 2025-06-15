import React from "react";
import PharmacistList from "../Pharmacist/PharmacistList";
import { USER_ROLE } from "@/config/constant";

const DispenserList = () => {
  return <PharmacistList type={USER_ROLE.DISPENSER} />;
};

export default DispenserList;
