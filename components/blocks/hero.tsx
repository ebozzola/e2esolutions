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
import { TypingAnimation } from "../magicui/typing-animation";
import { IconOptions } from "../icon";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  const headlineColorClasses = {
    blue: "from-blue-600 to-blue-800",
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
      className="hero-section min-h-[90vh] flex items-center relative overflow-hidden"
    >
      {/* Modern Dynamic Background */}
      <div className="absolute inset-0 z-0">
        {/* Primary gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"></div>

        {/* Logo pattern using Icon component */}
        <div className="absolute inset-0 grid grid-cols-6 gap-12 p-8 opacity-[0.02]">
          {[...Array(24)].map((_, index) => (
            <IconOptions.E2ELogo
              key={index}
              className="w-full h-full opacity-50 transform rotate-0 hover:rotate-45 transition-transform duration-1000"
            />
          ))}
        </div>

        {/* Animated blob shapes */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Geometric accent elements */}
      <div className="hidden md:block absolute inset-0 z-1 pointer-events-none">
        {/* Top left corner elements */}
        <div className="absolute top-20 left-10 w-32 h-1 bg-primary/30 rotate-45 transform origin-left"></div>
        <div className="absolute top-20 left-10 w-1 h-32 bg-primary/30 -rotate-45 transform origin-top"></div>

        {/* Bottom right corner elements */}
        <div className="absolute bottom-20 right-10 w-32 h-1 bg-primary/30 -rotate-45 transform origin-right"></div>
        <div className="absolute bottom-20 right-10 w-1 h-32 bg-primary/30 rotate-45 transform origin-bottom"></div>

        {/* Floating accent logos */}
        <div className="absolute top-1/3 right-1/4 opacity-20 rotate-12 animate-float">
          <IconOptions.E2ELogo className="w-16 h-16" />
        </div>
        <div className="absolute top-1/4 left-1/3 opacity-20 -rotate-12 animate-float animation-delay-2000">
          <IconOptions.E2ELogo className="w-24 h-24" />
        </div>
        <div className="absolute bottom-1/4 right-1/3 opacity-20 rotate-45 animate-float animation-delay-3000">
          <IconOptions.E2ELogo className="w-20 h-20" />
        </div>
      </div>

      <Container
        size="large"
        width="custom"
        className="hero-content grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-center justify-center py-12 md:py-20 relative z-10 max-w-8xl mx-auto"
      >
        <div className="row-start-2 md:row-start-1 md:col-span-6 text-center md:text-left">
          {data.tagline && (
            <h2
              data-tina-field={tinaField(data, "tagline")}
              className="relative inline-block px-4 py-1.5 mb-6 md:mb-8 text-sm md:text-base font-bold tracking-wide title-font rounded-full bg-gradient-to-r from-primary/20 to-purple-500/20 text-primary dark:text-white"
            >
              {data.tagline}
            </h2>
          )}
          {data.headline && (
            <h3
              data-tina-field={tinaField(data, "headline")}
              className="w-full relative mb-6 md:mb-6 text-4xl md:text-6xl font-extrabold tracking-tight leading-tight title-font"
            >
              <TypingAnimation
                className={`bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-600 to-purple-500`}
              >
                {data.headline}
              </TypingAnimation>
            </h3>
          )}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col md:w-full">
              {data.text && (
                <div
                  data-tina-field={tinaField(data, "text")}
                  className={`prose prose-lg mx-auto md:mx-0 mb-10 ${
                    data.color === "primary"
                      ? "prose-primary"
                      : "dark:prose-dark"
                  }`}
                >
                  {/* Extract a plain text summary for typing animation */}
                  {data.text.children?.[0]?.children?.[0]?.text && (
                    <TypingAnimation className="mb-4 text-base font-normal leading-normal tracking-normal">
                      {data.text.children[0].children[0].text}
                    </TypingAnimation>
                  )}

                  {/* using typing animation instead
                  <TinaMarkdown
                    content={data.text}
                    components={{
                      mermaid: ({ value }) => {
                        return <MermaidElement value={value} />;
                      },
                    }}
                  />
                   */}
                </div>
              )}
              {data.actions && (
                <div className="mt-8">
                  <Actions
                    className="justify-center md:justify-start py-2 gap-4"
                    parentColor={data.color}
                    actions={data.actions}
                  />
                </div>
              )}
            </div>
          </div>
          {data.text2 && (
            <div
              data-tina-field={tinaField(data, "text2")}
              className={`prose prose-lg mx-auto md:mx-0 mb-10 ${
                data.color === "primary" ? "prose-primary" : "dark:prose-dark"
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

        {data.image && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className="relative md:col-span-6 flex justify-center"
          >
            <div className="relative overflow-hidden rounded-2xl shadow-2xl group w-full">
              {/* Glow effect behind image */}
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

              <div className="relative rounded-2xl overflow-hidden">
                <Image
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                  alt={data.image.alt || "Hero image"}
                  src={data.image.src}
                  width={2400}
                  height={2400}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent"></div>
              </div>

              {/* Decorative corner accents */}
              <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
                <div className="absolute top-4 left-0 w-8 h-1 bg-primary/50"></div>
                <div className="absolute top-0 left-4 w-1 h-8 bg-primary/50"></div>
              </div>
              <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
                <div className="absolute bottom-4 right-0 w-8 h-1 bg-primary/50"></div>
                <div className="absolute bottom-0 right-4 w-1 h-8 bg-primary/50"></div>
              </div>
            </div>
          </div>
        )}
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
