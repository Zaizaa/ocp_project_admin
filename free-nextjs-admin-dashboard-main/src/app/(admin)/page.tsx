import type { Metadata } from "next";
import { IncidentMetrics } from "@/components/ecommerce/IncidentMetrics";

import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import ResolutionSuccess from "@/components/ecommerce/ResolutionSuccess";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import CercleStats from "@/components/ecommerce/CercleStats";
import IncidentCharts from "@/components/ecommerce/IncidentCharts";
import IncidentMap from "@/components/ecommerce/IncidentMap";
import OcpSafiImageMap from "@/components/ecommerce/OcpSafiImageMap";
import {TicketsParTypes} from "@/components/ecommerce/TicketsParTypes";
import {StatsEquipes} from "@/components/ecommerce/StatsEquipes";



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
        <IncidentMetrics />
      </div>
      
      {/* MonthlySalesChart and MonthlyTarget below, can be in their own row or grouped */}
      <div className="col-span-12 xl:col-span-8 space-y-6">
        <MonthlySalesChart />
      </div>

      <div className="col-span-12 xl:col-span-4 space-y-6">
        <IncidentCharts />
      </div>


      <div className="col-span-12 space-y-6">
        <OcpSafiImageMap />
      </div>

<div className="col-span-12 xl:col-span-6 space-y-6">
  <TicketsParTypes />
</div>

<div className="col-span-12 xl:col-span-6 space-y-6">
  <StatsEquipes />
</div>




    </div>
  );
}
