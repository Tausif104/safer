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
import { IoPrintOutline } from "react-icons/io5";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import { API_BASE_URL } from "@/config/constant";

const iconMap = {
  pharmacy1: Icon1,
  pharmacy2: Icon2,
  pharmacy3: Icon3,
  pharmacy4: Icon4,
  pharmacy5: Icon5,
};

const RecentIncedientsLogged = () => {
  const [incidentReports, setIncidentReports] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incidentsResponse = await axios.get(
          `${API_BASE_URL}/api/v1/incidents/reports`
        );
        setIncidentReports(incidentsResponse.data.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="bg-white rounded-[16px] px-0 p-[20px] sm:p-[30px] pt-0 sm:pt-[30px] mt-[30px]">
      <div>
        <div className="flex justify-between items-center flex-wrap gap-4 sm:mb-5 sm:p-0 p-[15px]">
          <h4 className="text-[16px] sm:text-[25px]">
            Incidents Logged Report
          </h4>
          <div className="flex items-center gap-[8px]">
            <button
              type="submit"
              className="primary-btn w-full cursor-pointer !border-[#99C729] !bg-transparent !text-[#99C729] !px-[20px] capitalize hover:!bg-[#99C729] hover:!text-white hover:!border-[#99C729]"
            >
              <MdOutlineFileDownload /> Download
            </button>
            <span className="h-[38px] w-[38px] min-w-[38px] border border-[#DAECFF] rounded-full flex items-center justify-center">
              <IoPrintOutline />
            </span>
            <Select className="">
              <SelectTrigger className="w-full bg-white p-[16px] !h-[36px] border rounded-[1000px] flex items-center gap-[10px] text-[14px] font-normal leading-[160%] text-[#262262] placeholder:text-[#262262] placeholder:font-normal placeholder:text-[16px] focus:outline-0 focus:shadow-none">
                <SelectValue placeholder="Select Report" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yearly">Yearly Report</SelectItem>
                <SelectItem value="monthly">Monthly Report</SelectItem>
                <SelectItem value="weekly">Weekly Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
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
              {incidentReports.map((incident, index) => {
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default RecentIncedientsLogged;
