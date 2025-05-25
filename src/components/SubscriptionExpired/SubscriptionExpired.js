"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Expired from "@/assets/images/expired.png";

export default function SubscriptionExpired() {
  return (
    <section className="pt-[20px] sm:pt0">
      <Dialog>
        <DialogTrigger asChild>
          <button className="primary-btn !bg-transparent border !border-[#99C729] !text-[#99C729] cursor-pointer w-full hover:!bg-[#99C729] hover:!text-white">
            Subscription Notice
          </button>
        </DialogTrigger>
        <DialogContent className="md:max-w-[352px] bg-white px-[16px] pt-[40px] sm:p-[20px]">
          <Image
            className="mx-auto mb-[30px]"
            src={Expired}
            alt="notice image"
          />
          <div className="text-center">
            <h5 className="mb-[15px] text-[20px] font-bold max-w-[280px] mx-auto">
              Your Subscription has Expired.
            </h5>
            <p className="text-[14px] mb-[30px]">
              Your subscription has expired, and access to premium features and
              personalized tools is now paused.
            </p>
            <button type="submit" className="primary-btn w-full cursor-pointer">
              Renew your Subscription
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
