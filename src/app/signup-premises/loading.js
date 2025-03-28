'use client'
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingComp = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 20); // Adjust speed here (lower = faster)

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-[1250px] mx-auto py-[50px] px-[20px] bg-[#F8F9FB] sm:bg-[#F8FEE6]">
      <div className="text-center mb-[30px] md:mb-[40px]">
        <h3 className="text-[24px] md:text-[30px] lg:text-[40px] mb-[10px] lg:mb-[20px]">Please Wait</h3>
        <p className="text-[16px] md:text-[18px] lg:text-[20px] mb-[20px] lg:mb-[30px]">Your previous data is loading. Please hold on.</p>
        
        {/* Progress Bar */}
        <div className="max-w-[850px] h-[34px] md:h-[40px] lg:h-[50px] border border-[#EAF0F8] rounded-[100px] mx-auto p-[6px] bg-white flex items-center gap-6 relative">
          <div
            className="bg-[#3B82F6] rounded-[100px] h-full transition-all duration-200 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute right-4 text-[14px] lg:text-[20px] text-[#000000] font-medium">{progress}%</span>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-5 bg-white p-[25px] rounded-[10px]">
          <Skeleton className="h-[36px] w-full rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[25px] w-[80%] rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[25px] w-[70%] rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[54px] w-[60%] rounded-[6px] bg-[#EAF2FB]" />
        </div>

        <div className="flex flex-col gap-2.5">
          <Skeleton className="h-[26px] w-full rounded-[6px] bg-white" />
          <Skeleton className="h-[26px] w-[55%] rounded-[6px] bg-white" />
          <Skeleton className="h-[26px] w-[50%] rounded-[6px] bg-white" />
        </div>

        <div className="flex flex-col gap-5 bg-white p-[25px] rounded-[10px]">
          <Skeleton className="h-[36px] w-full rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[25px] w-[80%] rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[25px] w-[70%] rounded-[6px] bg-[#EAF2FB]" />
          <Skeleton className="h-[54px] w-[60%] rounded-[6px] bg-[#EAF2FB]" />
        </div>
      </div>
    </div>
  );
};

export default LoadingComp;
