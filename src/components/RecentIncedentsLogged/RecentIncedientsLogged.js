"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon1 from "@/assets/images/pharmacy-icon1.svg";
import Icon2 from "@/assets/images/pharmacy-icon2.svg";
import Icon3 from "@/assets/images/pharmacy-icon3.svg";
import Icon4 from "@/assets/images/pharmacy-icon4.svg";
import Icon5 from "@/assets/images/pharmacy-icon5.svg";
import Icon from "@/assets/images/logged.svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { HiDotsVertical } from "react-icons/hi";
import ViewIncidentModal from "../Incident/ViewIncidentModal";

const iconMap = {
  pharmacy1: Icon1,
  pharmacy2: Icon2,
  pharmacy3: Icon3,
  pharmacy4: Icon4,
  pharmacy5: Icon5,
};

const RecentIncedientsLogged = ({ recentIncidents = [] }) => {
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    return { date: formattedDate, time: formattedTime };
  };

  const [openViewIncidentModal, setOpenViewIncidentModal] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);

  const handleViewIncident = (incident) => {
    setSelectedIncident(incident);
    setOpenViewIncidentModal(true);
  };

  const handleCloseModal = () => {
    setOpenViewIncidentModal(false);
    setSelectedIncident(null);
  };

  useEffect(() => {
    if (!openViewIncidentModal) {
      document.body.style.pointerEvents = "auto";
    }
  }, [openViewIncidentModal]);

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex justify-between flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]">
          <h4 className="text-[16px] sm:text-[25px]">
            Recent Incidents Logged
          </h4>
          <Link
            href="/report"
            className="text-[14px] sm:text-[18px] text-[#3B82F6]"
          >
            See All
          </Link>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow className="bg-[#F8F9FB] border-0 text-[16px]">
                <TableHead className="text-black font-semibold p-[20px] min-w-[250px]">
                  Incident Type
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Date
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Time
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Checked By
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]">
                  Dispenser Name
                </TableHead>
                <TableHead className="text-black font-semibold p-[20px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentIncidents.map((incident, index) => {
                const { date, time } = formatDateTime(incident.updatedAt);
                return (
                  <TableRow key={index}>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] whitespace-normal sm:min-w-[300px] min-w-[250px]">
                      <div className="flex items-center gap-3.5">
                        <Image
                          src={Icon}
                          alt={`${incident.incidentType} icon`}
                          width={42}
                          height={42}
                          className="rounded-full"
                        />

                        <div className="flex flex-col">
                          <h6 className="text-[14px] font-medium mb-1">
                            {incident.incidentType}
                          </h6>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {date}
                    </TableCell>

                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {time}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {incident.checkedByName}
                    </TableCell>
                    <TableCell className="py-[8px] px-[20px] border-b border-[#DAECFF] text-[16px]">
                      {incident.dispensedByName}
                    </TableCell>
                    <TableCell className="text-right py-[8px] px-[20px] border-b border-[#DAECFF]">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="!bg-transparent text-[#707B8A] cursor-pointer focus:outline-0 focus:shadow-none">
                            <HiDotsVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleViewIncident(incident)}
                          >
                            View
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
      {openViewIncidentModal && (
        <ViewIncidentModal
          incident={selectedIncident}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default RecentIncedientsLogged;
