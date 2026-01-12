"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import NavItems from "./nav-items";
import { useLayout } from "../layout/layout-context";

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings?.header;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!header || !theme) return null;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
        scrolled
          ? "py-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg shadow-black/5"
          : "py-5 bg-transparent"
      )}
    >
      {/* Subtle top accent line */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <Container size="custom" className="max-w-8xl relative">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-3 transition-all duration-300"
          >
            <div className="relative">
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Icon
                tinaField={tinaField(header, "icon")}
                parentColor={header.color ?? undefined}
                data={{
                  name: header.icon?.name ?? undefined,
                  color: header.icon?.color ?? undefined,
                  style: header.icon?.style ?? undefined,
                  size: "medium",
                }}
                className="relative z-10 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span
              data-tina-field={tinaField(header, "name")}
              className={cn(
                "text-xl font-semibold tracking-tight transition-colors duration-300",
                scrolled
                  ? "text-gray-900 dark:text-white"
                  : "text-gray-900 dark:text-white"
              )}
            >
              {header.name}
            </span>
          </Link>

          {/* Navigation */}
          <NavItems
            navs={header.nav
              ?.filter(
                (n): n is NonNullable<typeof n> & { href: string; label: string } =>
                  n !== null &&
                  typeof n.href === "string" &&
                  typeof n.label === "string"
              )
              .map((n) => ({ ...n, href: n.href ?? "", label: n.label ?? "" }))}
            scrolled={scrolled}
          />
        </div>
      </Container>
    </header>
  );
}
