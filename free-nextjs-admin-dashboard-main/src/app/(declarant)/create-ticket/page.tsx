'use client';
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import InputsCreationTicket from "@/components/form/form-elements/InputsCreationTicket";
import InputsCreationTicketTwo from "@/components/form/form-elements/InputsCreationTicketTwo";

import React from "react";


export default function CreateTicketPage() {
  return (
   
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="space-y-6">
          <InputsCreationTicket />
          
        </div>
        <div className="space-y-6">
          <InputsCreationTicketTwo />
        </div>
      </div>
  
  );
}


    