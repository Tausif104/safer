import React, { Suspense } from "react";
import PatientSafetyReport from "@/components/Report/PatientSafetyReport";

const PatientSafetyReportPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PatientSafetyReport />
    </Suspense>
  );
};

export default PatientSafetyReportPage;
