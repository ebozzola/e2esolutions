"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import { tinaField } from "tinacms/dist/react";
import Link from "next/link";
import { useLayout } from "../layout/layout-context";
import { IconOptions } from "../icon";
import { cn } from "../../lib/utils";

interface NavItem {
  href: string;
  label: string;
  [key: string]: unknown;
}

export default function NavItems({
  navs,
  scrolled = false,
}: {
  navs: NavItem[] | null | undefined;
  scrolled?: boolean;
}) {
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
          className={cn(
            "relative p-2.5 rounded-lg transition-all duration-300",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            "focus:outline-none focus:ring-2 focus:ring-orange-500/20"
          )}
          aria-label="Toggle menu"
        >
          <span className="sr-only">Open menu</span>
          {mobileMenuOpen ? (
            <BiX className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          ) : (
            <BiMenu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Mobile menu portal */}
      {mobileMenuOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div className="fixed inset-0" style={{ zIndex: 9999 }}>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm animate-fadeIn"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Menu panel */}
            <div
              className="fixed top-20 right-4 left-4 sm:left-auto sm:w-80 p-2 rounded-2xl bg-white dark:bg-gray-900 shadow-2xl shadow-gray-900/20 border border-gray-200/50 dark:border-gray-700/50 animate-slideInFromBottom"
              style={{ zIndex: 10000 }}
            >
              {/* Accent line */}
              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

              <nav className="p-4">
                <ul className="flex flex-col space-y-1">
                  {navs?.map((item: NavItem, index: number) => {
                    const isActive =
                      currentPath === `/${item.href}` ||
                      (item.href === "" && currentPath === "/");
                    return (
                      <li
                        key={item.href}
                        className="animate-slideInFromBottom"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <Link
                          data-tina-field={tinaField(item, "label")}
                          href={`/${item.href}`}
                          className={cn(
                            "group flex items-center gap-3 py-3 px-4 rounded-xl text-base font-medium transition-all duration-300",
                            isActive
                              ? "bg-gradient-to-r from-orange-500/10 to-orange-400/5 text-orange-600 dark:text-orange-400"
                              : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {/* Active indicator */}
                          <span
                            className={cn(
                              "w-1.5 h-1.5 rounded-full transition-all duration-300",
                              isActive
                                ? "bg-orange-500"
                                : "bg-gray-300 dark:bg-gray-600 group-hover:bg-orange-400"
                            )}
                          />
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* CTA Button */}
              <div className="p-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                <Link
                  href="/contact"
                  className="block w-full py-3 px-4 text-center text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 hover:from-orange-500 hover:to-orange-600 rounded-xl transition-all duration-300 shadow-lg shadow-gray-900/10 hover:shadow-orange-500/20"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Desktop navigation */}
      <nav className="hidden md:flex items-center gap-1">
        {navs?.map((item: NavItem) => {
          const isActive =
            currentPath === `/${item.href}` ||
            (item.href === "" && currentPath === "/");
          return (
            <Link
              key={item.href}
              data-tina-field={tinaField(item, "label")}
              href={`/${item.href}`}
              className={cn(
                "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group",
                isActive
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              <span className="relative z-10">{item.label}</span>

              {/* Hover background */}
              <span
                className={cn(
                  "absolute inset-0 rounded-lg transition-all duration-300",
                  isActive
                    ? "bg-orange-500/10"
                    : "bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-gray-800"
                )}
              />

              {/* Active indicator dot */}
              {isActive && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-orange-500" />
              )}
            </Link>
          );
        })}

       
      </nav>
    </>
  );
}
