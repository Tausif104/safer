"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineUser, HiOutlineBuildingOffice2 } from "react-icons/hi2";

const DemoHome = () => {
  return (
    <section className="pt-[20px] sm:pt-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Greeting Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-[#262262] mb-4 mt-7">
            Hey there, Welcome to SafeRx
          </h1>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Signup as Technician */}
          <div className="bg-white p-6 rounded-[14px] border border-[#DAECFF] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                <HiOutlineUser className="text-[#3B82F6] text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#262262]">
                Signup as Pharmacist/Technician
              </h3>
            </div>
            <p className="text-[#707B8A] mb-6">
              Join our network of healthcare professionals and help ensure
              medication safety
            </p>
            <Link
              href="/signup-technician"
              className="inline-block bg-[#3B82F6] text-white px-6 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Register Now
            </Link>
          </div>

          {/* Signup as Pharmacy Premise */}
          <div className="bg-white p-6 rounded-[14px] border border-[#DAECFF] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                <HiOutlineBuildingOffice2 className="text-[#3B82F6] text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#262262]">
                Signup as Pharmacy Premises
              </h3>
            </div>
            <p className="text-[#707B8A] mb-6">
              Register your pharmacy and enhance your medication safety
              protocols
            </p>
            <Link
              href="/signup-premises"
              className="inline-block bg-[#3B82F6] text-white px-6 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Register Now
            </Link>
          </div>

          {/* Login as Technician */}
          <div className="bg-white p-6 rounded-[14px] border border-[#DAECFF] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                <HiOutlineUser className="text-[#3B82F6] text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#262262]">
                Login as Pharmacist/Technician
              </h3>
            </div>
            <p className="text-[#707B8A] mb-6">
              Access your personal dashboard and manage your safety reports
            </p>
            <Link
              href="/login-technician"
              className="inline-block bg-[#3B82F6] text-white px-6 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Login as Pharmacy Premise */}
          <div className="bg-white p-6 rounded-[14px] border border-[#DAECFF] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                <HiOutlineBuildingOffice2 className="text-[#3B82F6] text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#262262]">
                Login as Pharmacy Premises
              </h3>
            </div>
            <p className="text-[#707B8A] mb-6">
              Access your pharmacy dashboard and manage your safety reports
            </p>
            <Link
              href="/login-premises"
              className="inline-block bg-[#3B82F6] text-white px-6 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Login
            </Link>
          </div>

          {/* Login as Admin */}
          <div className="bg-white p-6 mb-6 rounded-[14px] border border-[#DAECFF] hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-[#E8F1FF] rounded-full flex items-center justify-center">
                <HiOutlineUser className="text-[#3B82F6] text-xl" />
              </div>
              <h3 className="text-xl font-semibold text-[#262262]">
                Login as System Admin
              </h3>
            </div>
            <p className="text-[#707B8A] mb-6">
              Access the admin dashboard to manage system-wide settings and
              users
            </p>
            <Link
              href="/login-admin"
              className="inline-block bg-[#3B82F6] text-white px-6 py-2 rounded-md hover:bg-[#2563EB] transition-colors"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoHome;
