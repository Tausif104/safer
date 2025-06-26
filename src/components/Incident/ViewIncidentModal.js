"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { API_BASE_URL } from "@/config/constant";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toKebabCase from "@/helpers/toKebabCase";

const formatKey = (key) => {
  const formattedKey = key.replace(/^(is|has)(?=[A-Z])/, "");
  return formattedKey.replace(/([A-Z])/g, " $1").trim();
};

const excludeFields = [
  "id",
  "isDeleted",
  "checkedBy",
  "dispensedBy",
  "receivedBy",
];

const onlyDateFields = [
  "dateOfIncident",
  "dateOfAccident",
  "dateOfReturn",
  "expiryDate",
  "issuedAt",
  "receivedDate",
];
const onlyTimeFields = ["timeOfIncident", "timeOfAccident"];
const dateAndTimeFields = ["createdAt", "updatedAt"];

const ViewIncidentModal = ({ incident, onClose }) => {
  const [incidentData, setIncidentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIncident = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/v1/incidents/${incident?.id}?type=${toKebabCase(
            incident?.incidentType
          )}`
        );
        setIncidentData(response.data.data);
      } catch (err) {
        console.error("Error fetching incident:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (incident?.id) {
      fetchIncident();
    }
  }, [incident]);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Incident Details</DialogTitle>
        </DialogHeader>

        {loading && <div className="py-4">Loading...</div>}

        {error && <div className="py-4 text-destructive">Error: {error}</div>}

        {!loading && !error && !incidentData && (
          <div className="py-4">No incident found</div>
        )}

        {!loading && !error && incidentData && (
          <div className="space-y-4 mt-4">
            {Object.entries(incidentData)
              .filter(([key]) => !excludeFields.includes(key))
              .map(([key, value]) => {
                if (key.endsWith("By")) {
                  return null;
                }
                return (
                  <div key={key} className="border-b pb-2">
                    <span className="font-semibold capitalize">
                      {formatKey(key)}:{" "}
                    </span>
                    <span>
                      {(() => {
                        if (key === "picture") {
                          if (value) {
                            return (
                              <div className="mt-2">
                                <Image
                                  src={
                                    value.startsWith("http")
                                      ? value
                                      : `${API_BASE_URL}/public/img/${value}`
                                  }
                                  alt="Incident picture"
                                  width={400}
                                  height={300}
                                  className="rounded-lg object-cover"
                                />
                              </div>
                            );
                          }
                          return "No image";
                        }
                        if (typeof value === "boolean") {
                          return value.toString();
                        }
                        if (dateAndTimeFields.includes(key)) {
                          return new Date(value)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/(\d+)(?=(st|nd|rd|th))/, "$1$2")
                            .replace(/(am|pm)/i, (match) =>
                              match.toUpperCase()
                            );
                        }
                        if (onlyDateFields.includes(key)) {
                          return new Date(value).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          });
                        }
                        if (onlyTimeFields.includes(key)) {
                          return new Date(value)
                            .toLocaleTimeString("en-GB", {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/(\d+)(?=(st|nd|rd|th))/, "$1$2")
                            .replace(/(am|pm)/i, (match) =>
                              match.toUpperCase()
                            );
                        }
                        return value;
                      })()}
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncidentModal;
