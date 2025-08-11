'use client';
import React from "react";


import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOneHistorique";


export default function HistoriqueTicketsPage() {
  return (
   
      
      <div className="space-y-6">
        <ComponentCard title="suivi des tickets">
          <BasicTableOne />
        </ComponentCard>
      
    </div>
  );
}



