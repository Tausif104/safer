"use client";
import React from "react";
import Layout from "@/components/Layout/Layout";
import Header3 from "@/components/Header3/Header3";
import { FaLock } from "react-icons/fa";

const NewFeaturesPage = () => {
  const features = [
    {
      name: "SafeQueue",
      description: "Manage and track patient queues efficiently",
      icon: "📋",
    },
    {
      name: "SafeClaim",
      description: "Streamline insurance claims processing",
      icon: "💳",
    },
  ];

  return (
    <Layout>
      <div className="main-layout lg:w-[calc(100%-320px)] lg:float-right p-[20px] pt-0 sm:p-[30px] transition-all duration-600 h-screen overflow-y-auto pb-[180px] sm:pb-[30px]">
        <Header3 />
        <div className="max-w-6xl mx-auto mt-8">
          <div className="mb-8">
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#262262] mb-4">
              New Features
            </h1>
            <p className="text-[16px] text-[#707B8A]">
              Exciting new features are coming soon to enhance your SafeRx
              experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-[14px] border border-[#DAECFF] p-6 relative opacity-60 cursor-not-allowed"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{feature.icon}</div>
                    <div>
                      <h3 className="text-[24px] font-semibold text-[#262262] mb-2">
                        {feature.name}
                      </h3>
                      <p className="text-[14px] text-[#707B8A]">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-[#F8F9FB] px-3 py-1.5 rounded-full">
                    <FaLock className="text-[#707B8A] text-sm" />
                    <span className="text-[12px] text-[#707B8A] font-medium">
                      Coming Soon
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-[#E8F1FF] rounded-[14px] border border-[#DAECFF] p-6 text-center">
            <p className="text-[16px] text-[#262262] mb-2">
              We're working hard to bring you these amazing features.
            </p>
            <p className="text-[14px] text-[#707B8A]">
              Stay tuned for updates!
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewFeaturesPage;
