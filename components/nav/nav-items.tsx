"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import NavActive from "./nav-active";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { useLayout } from "../layout/layout-context";
import { IconOptions } from "../icon";

const activeItemClasses = {
  blue: "border-b-3 border-blue-200 text-blue-700 dark:text-blue-300 font-medium dark:border-blue-700",
  teal: "border-b-3 border-teal-200 text-teal-700 dark:text-teal-300 font-medium dark:border-teal-700",
  green:
    "border-b-3 border-green-200 text-green-700 dark:text-green-300 font-medium dark:border-green-700",
  red: "border-b-3 border-red-300 text-red-700 dark:text-green-300 font-medium dark:border-red-700",
  pink: "border-b-3 border-pink-200 text-pink-700 dark:text-pink-300 font-medium dark:border-pink-700",
  purple:
    "border-b-3 border-purple-200 text-purple-700 dark:text-purple-300 font-medium dark:border-purple-700",
  orange:
    "border-b-3 border-orange-200 text-orange-700 dark:text-orange-300 font-medium dark:border-orange-700",
  yellow:
    "border-b-3 border-yellow-300 text-yellow-700 dark:text-yellow-300 font-medium dark:border-yellow-600",
};

const mobileActiveItemClasses = {
  blue: "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  teal: "bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300",
  green: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  red: "bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-300",
  pink: "bg-pink-50 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
  purple:
    "bg-purple-50 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  orange:
    "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",
  yellow:
    "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const activeBackgroundClasses = {
  blue: "text-blue-500",
  teal: "text-teal-500",
  green: "text-green-500",
  red: "text-red-500",
  pink: "text-pink-500",
  purple: "text-purple-500",
  orange: "text-orange-500",
  yellow: "text-yellow-500",
};

export default function NavItems({ navs }: { navs: any }) {
  const currentPath = usePathname();
  const { theme } = useLayout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const BiMenu = IconOptions["BiMenu"];
  const BiX = IconOptions["BiX"];

  return (
    <>
      {/* Mobile hamburger button */}
      <div className="md:hidden relative">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <BiX className="w-6 h-6" />
          ) : (
            <BiMenu className="w-6 h-6" />
          )}
        </button>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="fixed top-[calc(var(--header-height,4rem))] right-4 z-[100] bg-white dark:bg-gray-900 shadow-lg py-2 px-4 w-64 mt-2 rounded-lg border border-gray-200 dark:border-gray-700">
            <ul className="flex flex-col space-y-2">
              {navs.map((item) => {
                const isActive = currentPath === `/${item.href}`;
                return (
                  <li key={item.href}>
                    <Link
                      data-tina-field={tinaField(item, "label")}
                      href={`/${item.href}`}
                      className={`block py-2 px-3 rounded-md text-base ${
                        isActive
                          ? mobileActiveItemClasses[theme.color]
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
        {navs.map((item) => {
          return (
            <li
              key={item.href}
              className={
                currentPath === `/${item.href}`
                  ? activeItemClasses[theme.color]
                  : ""
              }
            >
              <Link
                data-tina-field={tinaField(item, "label")}
                href={`/${item.href}`}
                className={`relative select-none text-base inline-block tracking-wide transition duration-150 ease-out hover:opacity-100 py-8 px-4`}
              >
                {item.label}
                {currentPath === `/${item.href}` && (
                  <NavActive
                    backgroundColor={activeBackgroundClasses[theme.color]}
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
