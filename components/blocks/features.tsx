"use client";
import {
  PageBlocksFeatures,
  PageBlocksFeaturesItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { iconSchema } from "../../tina/fields/icon";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";

export const Feature = ({
  featuresColor,
  data,
  index = 0,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
  index?: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      data-tina-field={tinaField(data)}
      className={cn(
        "feature-card group relative w-full md:w-[calc(50%-1rem)] xl:w-[calc(33.333%-1.5rem)]",
        "animate-slideUp"
      )}
      style={{ animationDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Accent border on hover */}
      <div
        className={cn(
          "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent",
          "transform origin-left transition-transform duration-500 ease-out",
          isHovered ? "scale-x-100" : "scale-x-0"
        )}
      />

      {/* Icon */}
      {data.icon && (
        <div
          data-tina-field={tinaField(data, "icon")}
          className="relative mb-6"
        >
          <div
            className={cn(
              "inline-flex items-center justify-center w-14 h-14 rounded-xl transition-all duration-500",
              "bg-gradient-to-br from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-700",
              "group-hover:from-orange-100 group-hover:to-orange-50 dark:group-hover:from-orange-900/30 dark:group-hover:to-orange-800/20"
            )}
          >
            <Icon
              parentColor={featuresColor}
              data={{
                name: data.icon.name ?? undefined,
                color: data.icon.color ?? "",
                style: data.icon.style ?? "regular",
              }}
              className={cn(
                "w-7 h-7 transition-all duration-500",
                "text-gray-700 dark:text-gray-300",
                "group-hover:text-orange-600 dark:group-hover:text-orange-400",
                isHovered ? "scale-110" : "scale-100"
              )}
            />
          </div>
        </div>
      )}

      {/* Profile image (if present) */}
      {data.image?.src && (
        <div
          data-tina-field={tinaField(data.image, "src")}
          className="absolute top-6 right-6 z-10"
        >
          <div className="relative group/avatar">
            <div
              className={cn(
                "absolute -inset-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-400 blur-sm transition-opacity duration-300",
                "opacity-0 group-hover/avatar:opacity-60"
              )}
            />
            <Image
              src={data.image.src}
              alt={data.image.alt || "Profile picture"}
              width={72}
              height={72}
              className="relative rounded-full shadow-lg border-2 border-white dark:border-gray-800 object-cover"
            />
          </div>
        </div>
      )}

      {/* Title */}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className={cn(
            "text-xl font-semibold mb-3 title-font",
            "text-gray-900 dark:text-white",
            "transition-colors duration-300 group-hover:text-gray-800",
            data.image?.src ? "pr-24" : ""
          )}
        >
          {data.title}
        </h3>
      )}

      {/* Description */}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="prose prose-sm prose-gray dark:prose-invert max-w-none"
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}

      {/* Learn more link */}
      <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800">
        <span
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium",
            "text-gray-500 dark:text-gray-400",
            "group-hover:text-orange-600 dark:group-hover:text-orange-400",
            "transition-colors duration-300"
          )}
        >
          Learn more
          <svg
            width="16"
            height="16"
            className={cn(
              "w-4 h-4 flex-shrink-0 transition-transform duration-300",
              isHovered ? "translate-x-1" : "translate-x-0"
            )}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  const isPrimary = data.color === "primary";

  return (
    <Section
      color={data.color ?? undefined}
      className="relative overflow-hidden py-20 lg:py-28"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {isPrimary ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-400/5 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50/50 to-white dark:from-gray-900 dark:via-gray-900 dark:to-gray-900" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-gray-100/80 rounded-full blur-3xl" />
          </>
        )}
      </div>

      {/* Decorative corner accents */}
      <div className="hidden lg:block absolute top-20 right-12 corner-accent corner-accent-tl rotate-90" />
      <div className="hidden lg:block absolute bottom-20 left-12 corner-accent corner-accent-br -rotate-90" />

      <Container className="relative z-10" size="large">
       

        {/* Features grid */}
        <div className="flex flex-wrap gap-6 justify-center">
          {data.items?.map((block, i) =>
            block ? (
              <Feature
                featuresColor={data.color || "default"}
                key={i}
                data={block}
                index={i}
              />
            ) : null
          )}
        </div>
      </Container>
    </Section>
  );
};

const defaultFeature = {
  title: "Here's Another Feature",
  text: "This is where you might talk about the feature, if this wasn't just filler text.",
  icon: {
    color: "",
    style: "float",
    name: "",
  },
  image: {
    src: "",
    alt: "",
  },
};

export const featureBlockSchema = {
  name: "features",
  label: "Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [defaultFeature, defaultFeature, defaultFeature],
    },
  },
  fields: [
    {
      type: "object",
      label: "Feature Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item: { title?: string }) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          ...defaultFeature,
        },
      },
      fields: [
        iconSchema,
        {
          type: "object",
          label: "Image",
          name: "image",
          fields: [
            {
              name: "src",
              label: "Image Source",
              type: "image",
            },
            {
              name: "alt",
              label: "Alt Text",
              type: "string",
            },
          ],
        },
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Text",
          name: "text",
        },
      ],
    },
    {
      type: "string",
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};
