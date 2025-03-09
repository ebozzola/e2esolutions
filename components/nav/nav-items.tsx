"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import NavActive from "./nav-active";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { useLayout } from "../layout/layout-context";
import { IconOptions } from "../icon";

const activeItemClasses = {
  blue: "text-primary font-medium border-b-2 border-primary",
  teal: "text-teal-500 font-medium border-b-2 border-teal-500",
  green: "text-green-500 font-medium border-b-2 border-green-500",
  red: "text-red-500 font-medium border-b-2 border-red-500",
  pink: "text-pink-500 font-medium border-b-2 border-pink-500",
  purple: "text-purple-500 font-medium border-b-2 border-purple-500",
  orange: "text-orange-500 font-medium border-b-2 border-orange-500",
  yellow: "text-yellow-500 font-medium border-b-2 border-yellow-500",
};

const mobileActiveItemClasses = {
  blue: "bg-primary/10 text-primary",
  teal: "bg-teal-500/10 text-teal-500",
  green: "bg-green-500/10 text-green-500",
  red: "bg-red-500/10 text-red-500",
  pink: "bg-pink-500/10 text-pink-500",
  purple: "bg-purple-500/10 text-purple-500",
  orange: "bg-orange-500/10 text-orange-500",
  yellow: "bg-yellow-500/10 text-yellow-500",
};

const activeBackgroundClasses = {
  blue: "text-primary",
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
      <div className="md:hidden">
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
      </div>

      {/* Mobile menu in portal */}
      {mobileMenuOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0" style={{ zIndex: 9999 }}>
            <div
              className="fixed inset-0 bg-black/20 backdrop-blur-md"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div
              className="fixed top-[calc(var(--header-height,4rem))] right-4 w-64 p-4 rounded-lg bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg border border-white/20 dark:border-gray-700/30"
              style={{ zIndex: 10000 }}
            >
              <ul className="flex flex-col space-y-2">
                {navs.map((item) => {
                  const isActive = currentPath === `/${item.href}`;
                  return (
                    <li key={item.href}>
                      <Link
                        data-tina-field={tinaField(item, "label")}
                        href={`/${item.href}`}
                        className={`block py-2 px-3 rounded-md text-base transition-all duration-200 ${
                          isActive
                            ? mobileActiveItemClasses[theme.color]
                            : "hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
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
          </div>,
          document.body
        )}

      {/* Desktop menu */}
      <ul className="hidden md:flex gap-6 sm:gap-8 lg:gap-10 tracking-[.002em] -mx-4">
        {navs.map((item) => {
          const isActive = currentPath === `/${item.href}`;
          return (
            <li
              key={item.href}
              className={isActive ? activeItemClasses[theme.color] : ""}
            >
              <Link
                data-tina-field={tinaField(item, "label")}
                href={`/${item.href}`}
                className={`relative select-none text-sm font-medium inline-block tracking-wide transition-all duration-200 ease-out hover:text-primary dark:hover:text-primary py-6 px-4 ${
                  !isActive ? "text-gray-600 dark:text-gray-300" : ""
                }`}
              >
                {item.label}
                {isActive && (
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
