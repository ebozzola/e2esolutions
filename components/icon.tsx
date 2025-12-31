"use client";
import * as BoxIcons from "react-icons/bi";
import React from "react";
import { useLayout } from "./layout/layout-context";
import Image from "next/image";

export const IconOptions = {
  E2ELogo: (props: { className?: string }) => (
    <Image
      src="/logo-notext.svg"
      alt="E2E Solutions Logo"
      width={40}
      height={40}
      className={props.className}
      priority
    />
  ),
  E2ELogoText: (props: { className?: string }) => (
    <Image
      src="/logo.svg"
      alt="E2E Solutions Logo"
      width={40}
      height={40}
      className={props.className}
      priority
    />
  ),
  ...BoxIcons,
};

const iconColorClass: {
  [name: string]: { regular: string; circle: string };
} = {
  blue: {
    regular: "text-blue-400",
    circle: "bg-blue-400 dark:bg-blue-500 text-blue-50",
  },
  teal: {
    regular: "text-teal-400",
    circle: "bg-teal-400 dark:bg-teal-500 text-teal-50",
  },
  green: {
    regular: "text-green-400",
    circle: "bg-green-400 dark:bg-green-500 text-green-50",
  },
  red: {
    regular: "text-red-400",
    circle: "bg-red-400 dark:bg-red-500 text-red-50",
  },
  pink: {
    regular: "text-pink-400",
    circle: "bg-pink-400 dark:bg-pink-500 text-pink-50",
  },
  purple: {
    regular: "text-purple-400",
    circle: "bg-purple-400 dark:bg-purple-500 text-purple-50",
  },
  orange: {
    regular: "text-orange-400",
    circle: "bg-orange-400 dark:bg-orange-500 text-orange-50",
  },
  yellow: {
    regular: "text-yellow-400",
    circle: "bg-yellow-400 dark:bg-yellow-500 text-yellow-50",
  },
  white: {
    regular: "text-white opacity-80",
    circle: "bg-white-400 dark:bg-white-500 text-white-50",
  },
};

const iconSizeClass = {
  xs: "w-6 h-6 flex-shrink-0",
  small: "w-8 h-8 flex-shrink-0",
  medium: "w-12 h-12 flex-shrink-0",
  large: "w-14 h-14 flex-shrink-0",
  xl: "w-16 h-16 flex-shrink-0",
  custom: "",
};

interface IconData {
  name?: string;
  color?: string;
  size?: string;
  style?: string;
}

export const Icon = ({
  data,
  parentColor = "",
  className = "",
  tinaField = "",
}: {
  data: IconData;
  parentColor?: string;
  className?: string;
  tinaField?: string;
}) => {
  const { theme } = useLayout();

  const iconOptionsTyped = IconOptions as Record<string, React.ComponentType<{ className?: string }>>;

  if (!data.name || iconOptionsTyped[data.name] === null || iconOptionsTyped[data.name] === undefined) {
    return null;
  }

  const { name, color, size = "medium", style = "regular" } = data;

  const IconSVG = iconOptionsTyped[name];

  const iconSizeClasses =
    typeof size === "string"
      ? iconSizeClass[size as keyof typeof iconSizeClass]
      : iconSizeClass[Object.keys(iconSizeClass)[Number(size)] as keyof typeof iconSizeClass];

  const iconColor = color
    ? color === "primary"
      ? theme?.color
      : color
    : theme?.color;

  if (style == "circle") {
    const colorKey = iconColor || "blue";
    return (
      <div
        data-tina-field={tinaField}
        className={`relative z-10 inline-flex items-center justify-center flex-shrink-0 ${iconSizeClasses} rounded-full ${iconColorClass[colorKey]?.circle || iconColorClass.blue.circle} ${className}`}
      >
        <IconSVG className="w-2/3 h-2/3" />
      </div>
    );
  } else {
    const colorKey =
      parentColor === "primary" &&
      (iconColor === theme?.color || iconColor === "primary")
        ? "white"
        : iconColor || "blue";
    const iconColorClasses = iconColorClass[colorKey]?.regular || iconColorClass.blue.regular;
    return (
      <IconSVG
        data-tina-field={tinaField}
        className={`${iconSizeClasses} ${iconColorClasses} ${className}`}
      />
    );
  }
};
