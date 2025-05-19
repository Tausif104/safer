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
            {Object.entries(incidentData).map(([key, value]) => (
              <div key={key} className="border-b pb-2">
                <span className="font-semibold capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:{" "}
                </span>
                <span>
                  {key === "picture" ? (
                    <div className="mt-2">
                      <Image
                        src={`${API_BASE_URL}/public/img/${value}`}
                        alt="Incident picture"
                        width={400}
                        height={300}
                        className="rounded-lg object-cover"
                        unoptimized
                      />
                    </div>
                  ) : typeof value === "boolean" ? (
                    value.toString()
                  ) : (
                    value
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ViewIncidentModal;
