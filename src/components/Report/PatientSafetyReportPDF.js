import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";

// Custom font registration (optional, can use default fonts)
// Font.register({ family: 'Roboto', src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxM.woff2' });

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#fff",
  },
  logo: {
    position: "absolute",
    top: 14,
    left: 24,
    width: 80,
    marginTop: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#222",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#222",
  },
  subSectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 6,
    color: "#222",
  },
  label: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 3,
    color: "#333",
  },
  value: {
    fontSize: 9,
    marginBottom: 8,
    color: "#222",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "solid",
    padding: 6,
    minHeight: 20,
  },
  valueMultiline: {
    fontSize: 9,
    marginBottom: 8,
    color: "#222",
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "solid",
    padding: 6,
    minHeight: 40,
  },
  table: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#d1d5db",
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableHeader: {
    backgroundColor: "#f9fafb",
  },
  tableCell: {
    borderRightWidth: 1,
    borderRightColor: "#d1d5db",
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    padding: 6,
    fontSize: 8,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  tableCellHeader: {
    fontWeight: "bold",
    backgroundColor: "#f9fafb",
    color: "#222",
    fontSize: 7,
    lineHeight: 1.2,
  },
  tableCellFirst: {
    width: "15%",
  },
  tableCellData: {
    width: "12.14%", // (100% - 15%) / 7 columns
  },
  grid2: {
    flexDirection: "row",
    marginBottom: 12,
  },
  grid2Col: {
    flex: 1,
    marginRight: 12,
  },
  grid2ColLast: {
    flex: 1,
  },
  grid3: {
    flexDirection: "row",
    marginBottom: 12,
  },
  grid3Col: {
    flex: 1,
    marginRight: 8,
  },
  grid3ColLast: {
    flex: 1,
  },
  grid4: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },
  grid4Col: {
    width: "48%",
    marginRight: "4%",
    marginBottom: 8,
  },
  grid4ColLast: {
    width: "48%",
    marginBottom: 8,
  },
  muted: {
    color: "#6b7280",
    fontSize: 8,
    marginTop: 4,
    marginBottom: 8,
  },
  underline: {
    textDecoration: "underline",
  },
  section: {
    marginBottom: 16,
  },
  gridContainer: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderStyle: "solid",
  },
  gridCell: {
    padding: 0,
    borderRightWidth: 1,
    borderRightColor: "#d1d5db",
  },
  gridCellLast: {
    padding: 0,
    borderRightWidth: 0,
  },
  gridCellHeader: {
    backgroundColor: "#f9fafb",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    minHeight: 80, // Ensure consistent header heights
    justifyContent: "flex-start",
  },
  gridCellContent: {
    padding: 8,
    minHeight: 60,
  },
  valueNoBorder: {
    fontSize: 9,
    marginBottom: 8,
    color: "#222",
    padding: 6,
    minHeight: 20,
  },
  pageBreak: {
    break: true,
  },
  // Chart styles
  chartsGrid: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 16,
  },
  chartContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 16,
    minHeight: 320,
  },
  chartTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#222",
  },
  chartBorder: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 16,
    height: 280,
    justifyContent: "center",
    alignItems: "center",
  },
  chartImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

const reportTypeLabelMap = {
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
  WEEKLY: "Weekly",
};

const PatientSafetyReportPDF = ({ data, type }) => {
  const reportTypeLabel = reportTypeLabelMap[type] || "Monthly";

  // Helper function to get week number (same as in PatientSafetyReport.js)
  const getWeekNumber = (date) => {
    const dateObj = new Date(date);
    const firstDayOfYear = new Date(dateObj.getFullYear(), 0, 1);
    const pastDaysOfYear = (dateObj - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
  };

  // Helper for summary table row label (matching PatientSafetyReport.js logic)
  let summaryLabel = "";
  if (type === "MONTHLY") {
    summaryLabel = data.monthYearWeek?.split(" ")[0] || "";
  } else if (type === "YEARLY") {
    summaryLabel = data.monthYearWeek || "";
  } else if (type === "WEEKLY") {
    summaryLabel = data.monthYearWeek ? getWeekNumber(data.monthYearWeek) : "";
  }

  // Helper function to format date display in pharmacy info section
  const formatDateDisplay = () => {
    if (type === "MONTHLY") {
      return data.monthYearWeek || "";
    } else if (type === "YEARLY") {
      return data.monthYearWeek || "";
    } else if (type === "WEEKLY") {
      if (data.monthYearWeek) {
        const weekNumber = getWeekNumber(data.monthYearWeek);
        const year = new Date(data.monthYearWeek).getFullYear();
        return `Week ${weekNumber}, ${year}`;
      }
      return "";
    }
    return "";
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Image src="/logo-black.png" alt="" style={styles.logo} />
        <Text style={styles.header}>
          {reportTypeLabel} Patient Safety Report
        </Text>

        {/* Section: Pharmacy Info */}
        <View style={styles.section}>
          <View style={styles.grid2}>
            <View style={styles.grid2Col}>
              <Text style={styles.label}>
                Pharmacy name (and branch number, if applicable)
              </Text>
              <Text style={styles.value}>{data.pharmacyName || ""}</Text>
            </View>
            <View style={styles.grid2ColLast}>
              <Text style={styles.label}>
                {type === "MONTHLY"
                  ? "Month and year"
                  : type === "YEARLY"
                  ? "Year"
                  : "Week"}
              </Text>
              <Text style={styles.value}>{formatDateDisplay()}</Text>
            </View>
          </View>
          <View style={styles.grid2}>
            <View style={styles.grid2Col}>
              <Text style={styles.label}>Record completed by (name)</Text>
              <Text style={styles.value}>{data.recordCompletedBy || ""}</Text>
            </View>
            <View style={styles.grid2ColLast}>
              <Text style={styles.label}>Date of report</Text>
              <Text style={styles.value}>{data.dateOfReport || ""}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.label}>
              Pharmacy team members who participated in preparing this report
              (initials)
            </Text>
            <Text style={styles.value}>{data.teamMembers || ""}</Text>
          </View>
        </View>

        {/* Section 1: Summary Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            1. {reportTypeLabel} summary of patient safety incidents and
            activity in the pharmacy (enter numbers in the table below)
          </Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellFirst,
                ]}
              >
                {reportTypeLabel.slice(0, -2)}
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                A. Prescribing interventions
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                B. Near misses
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                C. Near misses involving high-risk LASA* (if known)
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                D. Dispensing incidents
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                E. Dispensing incidents involving high-risk LASA* (if known)
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                F. National safety alerts
              </Text>
              <Text
                style={[
                  styles.tableCell,
                  styles.tableCellHeader,
                  styles.tableCellData,
                ]}
              >
                G. Other patient safety activity†
              </Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableCellFirst]}>
                {summaryLabel}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.prescribingInterventions || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.nearMisses || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.nearMissesLASA || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.dispensingIncidents || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.dispensingIncidentsLASA || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.nationalSafetyAlerts || ""}
              </Text>
              <Text style={[styles.tableCell, styles.tableCellData]}>
                {data.otherPatientSafetyActivity || ""}
              </Text>
            </View>
          </View>
          <Text style={styles.muted}>
            * &apos;Look-Alike, Sound-Alike&apos; (LASA), [sometimes also
            referred to as Sound Alike Look Alike Drugs (SALAD).
          </Text>
          <Text style={styles.muted}>† Including drug recalls.</Text>
        </View>

        {/* Charts Section */}
        <View style={styles.section}>
          <View style={styles.chartsGrid}>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Incident Distribution</Text>
              <View style={styles.chartBorder}>
                <Image
                  alt="pie-chart"
                  src={data.incidentPieChartPng}
                  style={styles.chartImage}
                />
              </View>
            </View>
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Incident Comparison</Text>
              <View style={styles.chartBorder}>
                <Image
                  alt="comparison-chart"
                  src={data.incidentComparisonChartPng}
                  style={styles.chartImage}
                />
              </View>
            </View>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. How have the patient safety priorities that were agreed in the
            last month&apos;s patient safety report been acted upon?
          </Text>
          <Text style={styles.valueMultiline}>
            {data.previousPrioritiesActions || ""}
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Outline your learnings and actions, if you have had a LASA
            medicines incident or near miss in the last month (refer to columns
            C and E in the monthly summary table above).
          </Text>
          <View style={styles.gridContainer}>
            <View style={styles.tableRow}>
              <View style={[styles.gridCell, { width: "50%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 70 }]}>
                  <Text style={styles.label}>
                    What were the key learning points for the pharmacy team
                    following the completion of the CPPE reducing look-alike,
                    sound, alike errors e-learning and e-assessment? (Fill in
                    this box in the month you complete the CPPE training and for
                    the following month)
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.cppeKeyLearnings || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCellLast, { width: "50%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 70 }]}>
                  <Text style={styles.label}>
                    What actions have been implemented to minimise LASA
                    incidents and near misses from your last monthly Patient
                    Safety Report?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.lasaActionsImplemented || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* Section 3 continued */}
        <View style={styles.section}>
          <View style={styles.gridContainer}>
            <View style={styles.tableRow}>
              <View style={[styles.gridCell, { width: "50%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    How have these learnings and actions helped to reduce the
                    number of LASA incidents occurring in your pharmacy?
                    Quantify where possible.
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.lasaReductionQuantify || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCellLast, { width: "50%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    If these learnings have not helped to reduce the number of
                    LASA incidents, why is this the case and what additional
                    actions will you now take?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.additionalActions || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            4.{" "}
            <Text style={styles.underline}>
              Outline key patient safety improvements
            </Text>{" "}
            that have occurred within your pharmacy during the month in relation
            to:
          </Text>

          {/* Section 4.1 */}
          <Text style={styles.subSectionTitle}>
            4.1. Improvement 1: Pharmacy safety – patient safety incidents
            (refer to columns A, B and D in the monthly summary table above).
          </Text>
          <View style={styles.gridContainer}>
            <View style={styles.tableRow}>
              <View style={[styles.gridCell, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    Reviewing patient safety incidents, what was the key
                    learning point and how was it identified?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.safetyLearningPoint || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCell, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    What actions have been taken at the pharmacy as a result?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.safetyActionsPharmacy || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCellLast, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    How has patient safety improved as a result?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.safetyImprovementResult || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Section 4.2 */}
          <Text style={styles.subSectionTitle}>
            4.2. Improvement 2: National patient safety alerts (refer to column
            F in the monthly summary table above).
          </Text>
          <View style={styles.gridContainer}>
            <View style={styles.tableRow}>
              <View style={[styles.gridCell, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    Reviewing patient safety alerts, what was the key learning
                    point and how was it identified?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.alertsLearningPoint || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCell, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    What actions have been taken at the pharmacy as a result?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.alertsActionsPharmacy || ""}
                  </Text>
                </View>
              </View>
              <View style={[styles.gridCellLast, { width: "33.33%" }]}>
                <View style={[styles.gridCellHeader, { minHeight: 50 }]}>
                  <Text style={styles.label}>
                    How has patient safety improved as a result?
                  </Text>
                </View>
                <View style={[styles.gridCellContent, { minHeight: 100 }]}>
                  <Text style={styles.valueNoBorder}>
                    {data.alertsImprovementResult || ""}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Section 5 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            5. How have you shared what you have learned above (in relation to
            section 3, 4.1 and 4.2) both with your team and externally?
          </Text>
          <Text style={styles.valueMultiline}>
            {data.sharingLearnings || ""}
          </Text>
        </View>
      </Page>

      <Page size="A4" style={styles.page}>
        {/* Section 6 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            6. What will be the team&apos;s patient safety priorities for the
            next month?
          </Text>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.label}>Priority 1:</Text>
            <Text style={styles.valueMultiline}>{data.priority1 || ""}</Text>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.label}>Priority 2:</Text>
            <Text style={styles.valueMultiline}>{data.priority2 || ""}</Text>
          </View>
          <View style={{ marginBottom: 8 }}>
            <Text style={styles.label}>Priority 3:</Text>
            <Text style={styles.valueMultiline}>{data.priority3 || ""}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PatientSafetyReportPDF;
