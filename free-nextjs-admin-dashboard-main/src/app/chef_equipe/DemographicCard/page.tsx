import type { Metadata } from "next";
import React from "react";
import Chef_card from "@/components/ecommerce/Chef_card";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default function Ecommerce() {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 xl:col-span-5">
        <Chef_card />
      </div>
    </div>
  );
}