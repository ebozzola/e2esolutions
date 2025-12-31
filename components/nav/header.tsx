"use client";

import React from "react";
import Link from "next/link";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import NavItems from "./nav-items";
import { useLayout } from "../layout/layout-context";

const headerColor = {
  default: "text-gray-800 dark:text-white backdrop-blur-md",
  primary: {
    blue: "text-white backdrop-blur-md",
    teal: "text-white backdrop-blur-md",
    green: "text-white backdrop-blur-md",
    red: "text-white backdrop-blur-md",
    pink: "text-white backdrop-blur-md",
    purple: "text-white backdrop-blur-md",
    orange: "text-white backdrop-blur-md",
    yellow: "text-white backdrop-blur-md",
  },
};

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings?.header;

  if (!header || !theme) return null;

  const headerColorCss =
    header.color === "primary"
      ? headerColor.primary[theme.color as keyof typeof headerColor.primary]
      : headerColor.default;

  return (
    <div
      className={`sticky top-0 z-50 w-full border-b border-white/10 ${headerColorCss}`}
    >
      {/* Background that matches hero section */}
      <div className="absolute inset-0 bg-white/5 dark:bg-gray-900/5 z-0">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-purple-500/5 to-blue-500/5"></div>
        <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-5"></div>
      </div>

      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between gap-6 relative">
          <h4 className="select-none text-lg font-bold tracking-tight my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-1 items-center whitespace-nowrap tracking-[.002em]"
            >
              <Icon
                tinaField={tinaField(header, "icon")}
                parentColor={header.color ?? undefined}
                data={{
                  name: header.icon?.name ?? undefined,
                  color: header.icon?.color ?? undefined,
                  style: header.icon?.style ?? undefined,
                  size: "medium",
                }}
              />{" "}
              <span data-tina-field={tinaField(header, "name")}>
                {header.name}
              </span>
            </Link>
          </h4>
          <NavItems navs={header.nav?.filter((n): n is NonNullable<typeof n> & { href: string; label: string } => n !== null && typeof n.href === 'string' && typeof n.label === 'string').map(n => ({ ...n, href: n.href ?? '', label: n.label ?? '' }))} />
        </div>
        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme?.darkMode === "primary"
              ? `via-white/20`
              : `via-primary/20 dark:via-white/20`,
            "to-transparent bottom-0 left-4 right-4 -z-1 opacity-30"
          )}
        />
      </Container>
    </div>
  );
}
