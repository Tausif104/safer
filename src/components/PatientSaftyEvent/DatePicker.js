"use client";

import * as React from "react";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePicker({ placeholder }) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(undefined); // Initializing date as undefined

  // Ensure date is valid before passing it to the Calendar
  const handleDateSelect = (selectedDate) => {
    // Check if the selectedDate is a valid Date
    if (selectedDate instanceof Date && !isNaN(selectedDate.getTime())) {
      setDate(selectedDate);
      setOpen(false);
    } else {
      setDate(undefined); // In case of invalid date
    }
  };

  return (
    <div className='flex flex-col gap-3'>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger
          asChild
          className=' bg-[#F8F9FB]  p-[16px] h-[56px] border  rounded-[6px] flex items-center gap-[10px] text-[16px] font-normal leading-[160%] text-[#374151] placeholder:text-[#707B8A] placeholder:font-normal placeholder:text-[16px]'
        >
          <Button
            variant='outline'
            id='date'
            className='w-full justify-between font-normal'
          >
            {date ? date.toLocaleDateString() : placeholder}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            captionLayout='dropdown'
            onSelect={handleDateSelect} // Use the safe date handler
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
