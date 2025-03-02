"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { Actions } from "./actions";
import MermaidElement from "../mermaid-renderer";
import { useInView } from "react-intersection-observer";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      setIsVisible(true);
    }
  }, [inView]);

  const headlineColorClasses = {
    blue: "from-gray-600 to-gray-800",
    teal: "from-teal-600 to-teal-800",
    green: "from-green-600 to-green-800",
    red: "from-red-600 to-red-800",
    pink: "from-pink-600 to-pink-800",
    purple: "from-purple-600 to-purple-800",
    orange: "from-orange-500 to-orange-700",
    yellow: "from-yellow-600 to-yellow-800",
  };

  return (
    <Section
      color={data.color}
      className="hero-section min-h-[90vh] flex items-center relative"
    >
      {/* Industrial Background */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-gradie t-industrial-steel opacity-40 dark:opacity-50"></div>
        <div className="absolute inset-0 bg-pattern-industrial opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-industrial-radial opacity-20 dark:opacity-30"></div>
      </div>

      {/* Industrial Geometric Elements - Only visible on larger screens */}
      <div className="hidden md:block" style={{ zIndex: 1 }}>
        <div className="absolute top-20 left-10 w-32 h-1 bg-gray-500 opacity-20"></div>
        <div className="absolute top-20 left-10 w-1 h-32 bg-gray-500 opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-32 h-1 bg-gray-500 opacity-20"></div>
        <div className="absolute bottom-20 right-10 w-1 h-32 bg-gray-500 opacity-20"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 border-2 border-gray-500 opacity-15 rotate-45"></div>

        {/* Additional geometric elements for more industrial feel */}
        <div className="absolute top-1/4 left-1/3 w-24 h-24 border border-gray-500 opacity-15"></div>
        <div className="absolute bottom-1/4 right-1/3 w-20 h-20 border border-gray-500 opacity-15"></div>
        <div className="absolute top-2/3 left-2/3 w-12 h-12 border-2 border-gray-500 opacity-15 rotate-45"></div>
      </div>

      <Container
        size="large"
        className="hero-content grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-14 items-center justify-center py-12 md:py-20 relative z-10"
      >
        <div
          ref={ref}
          className="row-start-2 md:row-start-1 md:col-span-5 text-center md:text-left"
        >
          {data.tagline && (
            <h2
              data-tina-field={tinaField(data, "tagline")}
              className={`${
                isVisible
                  ? "animate-slideInFromBottom animate-delay-100"
                  : "opacity-0"
              } relative inline-block px-3 py-1 mb-6 md:mb-8 text-sm md:text-md font-bold tracking-wide title-font z-20`}
            >
              {data.tagline}
              <span
                className="absolute w-full h-full left-0 top-0 rounded-full bg-current opacity-7"
                style={{ zIndex: -1 }}
              ></span>
            </h2>
          )}
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className={`${
                isVisible
                  ? "animate-slideInFromBottom animate-delay-200"
                  : "opacity-0"
              } w-full relative mb-6 md:mb-10 text-3xl md:text-5xl font-extrabold tracking-normal leading-tight title-font`}
            >
              <span
                className={`bg-clip-text text-transparent bg-gradient-to-r  ${
                  data.color === "primary"
                    ? `from-white to-gray-100`
                    : headlineColorClasses["blue"]
                }`}
              >
                {data.headline}
              </span>
            </h3>
          )}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col md:w-3/5">
              {data.text && (
                <div
                  data-tina-field={tinaField(data, "text")}
                  className={`${
                    isVisible
                      ? "animate-slideInFromBottom animate-delay-300"
                      : "opacity-0"
                  } prose prose-lg mx-auto md:mx-0 mb-10 ${
                    data.color === "primary"
                      ? `prose-primary`
                      : `dark:prose-dark`
                  }`}
                >
                  <TinaMarkdown
                    content={data.text}
                    components={{
                      mermaid: ({ value }) => {
                        return <MermaidElement value={value} />;
                      },
                    }}
                  />
                </div>
              )}
            </div>
            {data.image && (
              <div
                data-tina-field={tinaField(data.image, "src")}
                className={`${
                  isVisible
                    ? "animate-slideInFromRight animate-delay-400"
                    : "opacity-0"
                } relative flex-shrink-0 md:w-2/5 flex justify-center`}
              >
                <div className="relative overflow-hidden rounded-lg shadow-xl hover-lift">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
                  <Image
                    className="w-full h-auto max-w-full rounded-lg"
                    style={{ objectFit: "cover" }}
                    alt={data.image.alt}
                    src={data.image.src}
                    width={500}
                    height={500}
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
                </div>
              </div>
            )}
          </div>
          {data.text2 && (
            <div
              data-tina-field={tinaField(data, "text2")}
              className={`${
                isVisible
                  ? "animate-slideInFromBottom animate-delay-400"
                  : "opacity-0"
              } prose prose-lg mx-auto md:mx-0 mb-10 ${
                data.color === "primary" ? `prose-primary` : `dark:prose-dark`
              }`}
            >
              <TinaMarkdown
                content={data.text2}
                components={{
                  mermaid: ({ value }) => {
                    return <MermaidElement value={value} />;
                  },
                }}
              />
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
};

// Define the heroBlockSchema for Tina CMS
export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Welcome",
      headline: "This is the main headline",
      text: "This is the main text content",
      color: "default",
    },
  },
  fields: [
    {
      type: "string",
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
      required: true,
    },
    {
      type: "rich-text",
      label: "Text",
      name: "text",
    },
    {
      type: "rich-text",
      label: "Text 2",
      name: "text2",
    },
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
      label: "Color",
      name: "color",
      options: [
        { label: "Default", value: "default" },
        { label: "Primary", value: "primary" },
      ],
    },
    {
      type: "object",
      label: "Actions",
      name: "actions",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.label };
        },
        defaultItem: {
          type: "button",
          label: "Learn More",
          icon: false,
          link: "/",
        },
      },
      fields: [
        {
          type: "string",
          label: "Label",
          name: "label",
        },
        {
          type: "string",
          label: "Type",
          name: "type",
          options: [
            { label: "Button", value: "button" },
            { label: "Link", value: "link" },
          ],
        },
        {
          type: "string",
          label: "Link",
          name: "link",
        },
        {
          type: "boolean",
          label: "Icon",
          name: "icon",
        },
      ],
    },
  ],
};
