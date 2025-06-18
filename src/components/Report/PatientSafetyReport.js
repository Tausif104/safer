"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";
import html2pdf from "html2pdf.js";

const reportType = {
  MONTHLY: "MONTHLY",
  YEARLY: "YEARLY",
  WEEKLY: "WEEKLY",
};

const schema = yup.object().shape({
  type: yup.string().required("Type is required"),
  pharmacyId: yup.number().required("Pharmacy ID is required"),
  pharmacyName: yup.string().required("Pharmacy name is required"),
  monthYearWeek: yup.string().required("Month and year is required"),
  recordCompletedBy: yup.string(),
  recordCompletedById: yup.number(),
  dateOfReport: yup.string(),
  teamMembers: yup.string(),
  prescribingInterventions: yup.string(),
  nearMisses: yup.string(),
  nearMissesLASA: yup.string(),
  dispensingIncidents: yup.string(),
  dispensingIncidentsLASA: yup.string(),
  nationalSafetyAlerts: yup.string(),
  otherPatientSafetyActivity: yup.string(),
  previousPrioritiesActions: yup.string(),
  cppeKeyLearnings: yup.string(),
  lasaActionsImplemented: yup.string(),
  lasaReductionQuantify: yup.string(),
  additionalActions: yup.string(),
  safetyLearningPoint: yup.string(),
  safetyActionsPharmacy: yup.string(),
  safetyImprovementResult: yup.string(),
  alertsLearningPoint: yup.string(),
  alertsActionsPharmacy: yup.string(),
  alertsImprovementResult: yup.string(),
  sharingLearnings: yup.string(),
  priority1: yup.string(),
  priority2: yup.string(),
  priority3: yup.string(),
});

export default function PatientSafetyReport() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isLoadingPrefill, setIsLoadingPrefill] = React.useState(false);
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "MONTHLY";
  const { user, pharmacy } = useAuthStore();
  const printRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type,
      pharmacyId: pharmacy?.id,
      pharmacyName: pharmacy?.name,
      monthYearWeek: "",
      recordCompletedBy: user?.name,
      recordCompletedById: user?.id,
      dateOfReport: new Date().toISOString().split("T")[0],
      teamMembers: "",
      prescribingInterventions: "",
      nearMisses: "",
      nearMissesLASA: "",
      dispensingIncidents: "",
      dispensingIncidentsLASA: "",
      nationalSafetyAlerts: "",
      otherPatientSafetyActivity: "",
      previousPrioritiesActions: "",
      cppeKeyLearnings: "",
      lasaActionsImplemented: "",
      lasaReductionQuantify: "",
      additionalActions: "",
      safetyLearningPoint: "",
      safetyActionsPharmacy: "",
      safetyImprovementResult: "",
      alertsLearningPoint: "",
      alertsActionsPharmacy: "",
      alertsImprovementResult: "",
      sharingLearnings: "",
      priority1: "",
      priority2: "",
      priority3: "",
    },
  });

  const handleDownloadPDF = async () => {
    console.log("inside handleDownloadPDF");

    try {
      setIsSubmitting(true); // Add loading state

      const element = printRef.current;

      if (!element) {
        toast.error("Content not found for PDF generation");
        return;
      }

      const opt = {
        margin: 0.5,
        filename: `patient-safety-report-${pharmacy?.name}-${type}-${
          new Date().toISOString().split("T")[0]
        }.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      await html2pdf().set(opt).from(element).save();
      toast.success("PDF generated successfully");
    } catch (error) {
      console.error("PDF Error:", error);
      toast.error("Failed to generate PDF");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (pharmacy) {
      setValue("pharmacyName", pharmacy.name);
      setValue("pharmacyId", pharmacy.id);
    }
    if (user) {
      setValue("recordCompletedBy", user.name);
      setValue("recordCompletedById", user.id);
    }
  }, [pharmacy, setValue, user]);

  const handleDateChange = (date) => {
    let formattedDate = "";

    if (type === "MONTHLY") {
      formattedDate = date.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (type === "YEARLY") {
      formattedDate = date.getFullYear().toString();
    } else if (type === "WEEKLY") {
      const weekNumber = getWeekNumber(date);
      formattedDate = `Week::${weekNumber}, ${date.getFullYear()}`;
    }

    setValue("monthYearWeek", formattedDate);

    // Fetch prefill data after setting monthYearWeek
    const fetchPrefillData = async () => {
      setIsLoadingPrefill(true);
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/reports/prefill-report?odsCode=${pharmacy?.odsCode}`
        );

        if (response.data?.data) {
          const { data } = response.data;
          setValue("prescribingInterventions", data.prescribing_interventions);
          setValue("nearMisses", data.near_misses);
          setValue("nearMissesLASA", data.near_misses_lasa);
          setValue("dispensingIncidents", data.dispensing_incidents);
          setValue("dispensingIncidentsLASA", data.dispensing_incidents_lasa);
          setValue("nationalSafetyAlerts", data.national_safety_alerts);
          setValue(
            "otherPatientSafetyActivity",
            data.other_patient_safety_activity
          );
        }
      } catch (error) {
        console.error("Error fetching prefill data:", error);
        toast.error("Failed to fetch prefill data");
      } finally {
        setIsLoadingPrefill(false);
      }
    };

    fetchPrefillData();
  };

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  const reportTypeLabel =
    reportType[type].charAt(0).toUpperCase() +
    reportType[type].slice(1).toLowerCase();

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const payload = {
        ...data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/reports/patient-safety-report`,
        payload
      );

      if (response.status === 200 || response.status === 201) {
        handleDownloadPDF();
        toast.success("Report submitted successfully");
      } else {
        toast.error(
          `Error: ${response.data.message || "Failed to submit report"}`
        );
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to submit report. Please try again."
      );
      setIsSubmitting(false);
    } finally {
    }
  };

  return (
    <div
      className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg"
      ref={printRef}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-foreground">
          {reportTypeLabel} Patient Safety Report
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                Pharmacy name (and branch number, if applicable)
              </label>
              <Input
                {...register("pharmacyName")}
                type="text"
                className={errors.pharmacyName ? "border-red-500" : ""}
              />
              {errors.pharmacyName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pharmacyName.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-foreground">
                {type === reportType.MONTHLY
                  ? "Choose month and year"
                  : type === reportType.YEARLY
                  ? "Choose year"
                  : "Choose week"}
              </label>
              <DatePicker
                selected={
                  watch("monthYearWeek")
                    ? new Date(watch("monthYearWeek"))
                    : null
                }
                onChange={handleDateChange}
                dateFormat={
                  type === "MONTHLY"
                    ? "MMMM yyyy"
                    : type === "YEARLY"
                    ? "yyyy"
                    : "yyyy-'W'ww"
                }
                showYearPicker={type === "YEARLY"}
                showMonthYearPicker={type === "MONTHLY"}
                showWeekPicker={type === "WEEKLY"}
                className={`w-full h-9 px-3 text-sm border rounded-md ${
                  errors.monthYearWeek ? "border-red-500" : "border-input"
                }`}
                placeholderText={
                  type === "MONTHLY"
                    ? "Select month and year"
                    : type === "YEARLY"
                    ? "Select year"
                    : "Select week"
                }
              />
              {errors.monthYearWeek && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.monthYearWeek.message}
                </p>
              )}
            </div>
          </div>

          {watch("monthYearWeek") && (
            <>
              {isLoadingPrefill ? (
                <div className="flex justify-center items-center my-8">
                  <Spinner size="lg" className="text-primary" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">
                        Record completed by (name)
                      </label>
                      <Input
                        {...register("recordCompletedBy")}
                        type="text"
                        className={
                          errors.recordCompletedBy ? "border-red-500" : ""
                        }
                      />
                      {errors.recordCompletedBy && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.recordCompletedBy.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-foreground">
                        Date of report
                      </label>
                      <Input
                        {...register("dateOfReport")}
                        type="date"
                        className={errors.dateOfReport ? "border-red-500" : ""}
                      />
                      {errors.dateOfReport && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.dateOfReport.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium mb-1 text-foreground">
                      Pharmacy team members who participated in preparing this
                      report (initials)
                    </label>
                    <Input
                      {...register("teamMembers")}
                      type="text"
                      className={errors.teamMembers ? "border-red-500" : ""}
                    />
                    {errors.teamMembers && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.teamMembers.message}
                      </p>
                    )}
                  </div>

                  {/* Section 1: Monthly Summary Table */}
                  <div className="mt-8 mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      1. {reportTypeLabel} summary of patient safety incidents
                      and activity in the pharmacy (enter numbers in the table
                      below)
                    </h2>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-border">
                        <thead>
                          <tr className="bg-muted">
                            <th className="border border-border p-2 text-left text-foreground">
                              {reportTypeLabel.slice(0, -2)}
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              A. Prescribing interventions
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              B. Near misses
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              C. Near misses involving high-risk LASA* (if
                              known)
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              D. Dispensing incidents
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              E. Dispensing incidents involving high-risk LASA*
                              (if known)
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              F. National safety alerts
                            </th>
                            <th className="border border-border p-2 text-center text-foreground">
                              G. Other patient safety activity†
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-border p-2">
                              <div className="w-full p-1 text-center">
                                {type === reportType.MONTHLY
                                  ? watch("monthYearWeek")?.split(" ")[0]
                                  : type === reportType.YEARLY
                                  ? watch("monthYearWeek")?.split(" ")[1]
                                  : `Week ${
                                      watch("monthYearWeek")
                                        ?.split("::")[1]
                                        ?.split(",")[0]
                                    }`}
                              </div>
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("prescribingInterventions")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("nearMisses")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("nearMissesLASA")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("dispensingIncidents")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("dispensingIncidentsLASA")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("nationalSafetyAlerts")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                            <td className="border border-border p-2">
                              <Input
                                {...register("otherPatientSafetyActivity")}
                                type="text"
                                className="w-full p-1 border-0 bg-transparent text-center"
                              />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mt-2 text-sm text-muted-foreground">
                      <p>
                        * &apos;Look-Alike, Sound-Alike&apos; (LASA), [sometimes
                        also referred to as Sound Alike Look Alike Drugs
                        (SALAD).
                      </p>
                      <p>† Including drug recalls.</p>
                    </div>
                  </div>

                  {/* Section 2 */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      2. How have the patient safety priorities that were agreed
                      in the last month&apos;s patient safety report been acted
                      upon?
                    </h2>
                    <Textarea
                      {...register("previousPrioritiesActions")}
                      className={
                        errors.previousPrioritiesActions ? "border-red-500" : ""
                      }
                    />
                    {errors.previousPrioritiesActions && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.previousPrioritiesActions.message}
                      </p>
                    )}
                  </div>

                  {/* Section 3 */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      3. Outline your learnings and actions, if you have had a
                      LASA medicines incident or near miss in the last month
                      (refer to columns C and E in the monthly summary table
                      above).
                    </h2>

                    <div className="grid grid-cols-2 gap-0 border border-border rounded overflow-hidden">
                      <div className="border border-border p-0 flex flex-col h-full">
                        <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                          What were the key learning points for the pharmacy
                          team following the completion of the CPPE reducing
                          look-alike, sound, alike errors e-learning and
                          e-assessment? (Fill in this box in the month you
                          complete the CPPE training and for the following
                          month)
                        </label>
                        <Textarea
                          {...register("cppeKeyLearnings")}
                          className={
                            (errors.cppeKeyLearnings
                              ? "border-red-500 rounded-none "
                              : "rounded-none ") + "min-h-[144px]"
                          }
                        />
                        {errors.cppeKeyLearnings && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.cppeKeyLearnings.message}
                          </p>
                        )}
                      </div>

                      <div className="border border-border p-0 flex flex-col h-full">
                        <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                          What actions have been implemented to minimise LASA
                          incidents and near misses from your last monthly
                          Patient Safety Report?
                        </label>
                        <Textarea
                          {...register("lasaActionsImplemented")}
                          className={
                            (errors.lasaActionsImplemented
                              ? "border-red-500 rounded-none "
                              : "rounded-none ") + "min-h-[144px]"
                          }
                        />
                        {errors.lasaActionsImplemented && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lasaActionsImplemented.message}
                          </p>
                        )}
                      </div>

                      <div className="border border-border p-0 flex flex-col h-full">
                        <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                          How have these learnings and actions helped to reduce
                          the number of LASA incidents occurring in your
                          pharmacy? Quantify where possible.
                        </label>
                        <Textarea
                          {...register("lasaReductionQuantify")}
                          className={
                            (errors.lasaReductionQuantify
                              ? "border-red-500 rounded-none "
                              : "rounded-none ") + "min-h-[144px]"
                          }
                        />
                        {errors.lasaReductionQuantify && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.lasaReductionQuantify.message}
                          </p>
                        )}
                      </div>

                      <div className="border border-border p-0 flex flex-col h-full">
                        <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                          If these learnings have not helped to reduce the
                          number of LASA incidents, why is this the case and
                          what additional actions will you now take?
                        </label>
                        <Textarea
                          {...register("additionalActions")}
                          className={
                            (errors.additionalActions
                              ? "border-red-500 rounded-none "
                              : "rounded-none ") + "min-h-[144px]"
                          }
                        />
                        {errors.additionalActions && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.additionalActions.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      4.{" "}
                      <span className="underline">
                        Outline key patient safety improvements
                      </span>{" "}
                      that have occurred within your pharmacy during the month
                      in relation to:
                    </h2>

                    {/* Section 4.1 */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-3 text-foreground">
                        4.1. Improvement 1: Pharmacy safety – patient safety
                        incidents (refer to columns A, B and D in the monthly
                        summary table above).
                      </h3>

                      <div className="grid grid-cols-3 gap-0 border border-border rounded overflow-hidden">
                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            Reviewing patient safety incidents, what was the key
                            learning point and how was it identified?
                          </label>
                          <Textarea
                            {...register("safetyLearningPoint")}
                            className={
                              (errors.safetyLearningPoint
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.safetyLearningPoint && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.safetyLearningPoint.message}
                            </p>
                          )}
                        </div>

                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            What actions have been taken at the pharmacy as a
                            result?
                          </label>
                          <Textarea
                            {...register("safetyActionsPharmacy")}
                            className={
                              (errors.safetyActionsPharmacy
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.safetyActionsPharmacy && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.safetyActionsPharmacy.message}
                            </p>
                          )}
                        </div>

                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            How has patient safety improved as a result?
                          </label>
                          <Textarea
                            {...register("safetyImprovementResult")}
                            className={
                              (errors.safetyImprovementResult
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.safetyImprovementResult && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.safetyImprovementResult.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Section 4.2 */}
                    <div className="mb-6">
                      <h3 className="text-md font-medium mb-3 text-foreground">
                        4.2. Improvement 2: National patient safety alerts
                        (refer to column F in the monthly summary table above).
                      </h3>

                      <div className="grid grid-cols-3 gap-0 border border-border rounded overflow-hidden">
                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            Reviewing patient safety alerts, what was the key
                            learning point and how was it identified?
                          </label>
                          <Textarea
                            {...register("alertsLearningPoint")}
                            className={
                              (errors.alertsLearningPoint
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.alertsLearningPoint && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.alertsLearningPoint.message}
                            </p>
                          )}
                        </div>

                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            What actions have been taken at the pharmacy as a
                            result?
                          </label>
                          <Textarea
                            {...register("alertsActionsPharmacy")}
                            className={
                              (errors.alertsActionsPharmacy
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.alertsActionsPharmacy && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.alertsActionsPharmacy.message}
                            </p>
                          )}
                        </div>

                        <div className="border border-border p-0 flex flex-col h-full">
                          <label className="block text-sm font-medium bg-muted p-3 border-b border-border text-foreground flex-1 flex items-center w-full h-full">
                            How has patient safety improved as a result?
                          </label>
                          <Textarea
                            {...register("alertsImprovementResult")}
                            className={
                              (errors.alertsImprovementResult
                                ? "border-red-500 rounded-none "
                                : "rounded-none ") + "min-h-[192px]"
                            }
                          />
                          {errors.alertsImprovementResult && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.alertsImprovementResult.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 5 */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      5. How have you shared what you have learned above (in
                      relation to section 3, 4.1 and 4.2) both with your team
                      and externally?
                    </h2>
                    <Textarea
                      {...register("sharingLearnings")}
                      className={
                        errors.sharingLearnings ? "border-red-500" : ""
                      }
                    />
                    {errors.sharingLearnings && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.sharingLearnings.message}
                      </p>
                    )}
                  </div>

                  {/* Section 6 */}
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-foreground">
                      6. What will be the team&apos;s patient safety priorities
                      for the next month?
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Priority 1:
                        </label>
                        <Textarea
                          {...register("priority1")}
                          className={errors.priority1 ? "border-red-500" : ""}
                        />
                        {errors.priority1 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.priority1.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Priority 2:
                        </label>
                        <Textarea
                          {...register("priority2")}
                          className={errors.priority2 ? "border-red-500" : ""}
                        />
                        {errors.priority2 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.priority2.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-foreground">
                          Priority 3:
                        </label>
                        <Textarea
                          {...register("priority3")}
                          className={errors.priority3 ? "border-red-500" : ""}
                        />
                        {errors.priority3 && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.priority3.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="mt-8 px-6 py-2 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-primary/90 cursor-pointer transition-colors"
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="text-white" size="sm" />
                          Submitting...
                        </>
                      ) : (
                        "Generate Report"
                      )}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </form>
      </div>
    </div>
  );
}
