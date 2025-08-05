"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader-declarant";
import AppSidebar from "@/layout/AppSidebar-declarant";
import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Détermination dynamique de la marge du contenu principal
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex bg-gray-50 text-gray-800">
      {/* Barre latérale et fond assombri (mobile) */}
      <AppSidebar />
      <Backdrop />

      {/* Zone principale */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* En-tête */}
        <AppHeader />

        {/* Contenu de la page */}
        <div className="p-4 md:p-6 max-w-screen-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
}
