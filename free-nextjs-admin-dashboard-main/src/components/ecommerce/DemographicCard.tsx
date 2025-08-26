"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import CountryMap from "./CountryMap";
import { MoreDotIcon } from "@/icons";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

export default function DemographicCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Cette variable permet de savoir si le rendu est côté client
    setIsClient(true);
  }, []);

  function toggleDropdown() {
    setIsOpen(!isOpen);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  // Ne rend le CountryMap que côté client
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Customers Demographic
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Number of customer based on country
          </p>
        </div>

        <div className="relative inline-block">
          <button onClick={toggleDropdown} className="dropdown-toggle">
            <MoreDotIcon className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-300" />
          </button>
          <Dropdown
            isOpen={isOpen}
            onClose={closeDropdown}
            className="w-40 p-2"
          >
            <DropdownItem onItemClick={closeDropdown} className="dropdown-item">
              View More
            </DropdownItem>
            <DropdownItem onItemClick={closeDropdown} className="dropdown-item">
              Delete
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl bg-gray-50 dark:border-gray-800 dark:bg-gray-900 sm:px-6">
        {isClient && (
          <div
            id="mapOne"
            className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
          >
            <CountryMap />
          </div>
        )}
      </div>

      <div className="space-y-5">
        {/* Liste des pays */}
        {[
          { src: "/images/country/country-01.svg", name: "USA", customers: 2379, percent: 79 },
          { src: "/images/country/country-02.svg", name: "France", customers: 589, percent: 23 },
        ].map((country, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <Image width={48} height={48} src={country.src} alt={country.name} className="w-full" />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">{country.name}</p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {country.customers} Customers
                </span>
              </div>
            </div>

            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div className={`absolute left-0 top-0 flex h-full w-[${country.percent}%] items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white`}></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">{country.percent}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
