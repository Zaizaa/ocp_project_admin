import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import ResolutionSuccess from "@/components/ecommerce/ResolutionSuccess";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import CercleStats from "@/components/ecommerce/CercleStats";
import IncidentCharts from "@/components/ecommerce/IncidentCharts";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Make metrics span all 12 columns */}
      <div className="col-span-12">
        <EcommerceMetrics />
      </div>
      
      {/* MonthlySalesChart and MonthlyTarget below, can be in their own row or grouped */}
      <div className="col-span-12 xl:col-span-7 space-y-6">
        <MonthlySalesChart />
        <ResolutionSuccess />
      </div>

      <div className="col-span-12">
        <StatisticsChart />
      </div>

      <div className="col-span-12 xl:col-span-5">
        <DemographicCard />
      </div>

      <div className="col-span-12 xl:col-span-7">
        <RecentOrders />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <CercleStats />
      </div>
      <div className="col-span-12 xl:col-span-7">
        <IncidentCharts />
      </div>
    </div>
  );
}
