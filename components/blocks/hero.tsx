"use client";
import * as React from "react";
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
import { cn } from "../../lib/utils";

export const Hero = ({ data }: { data: PageBlocksHero }) => {
  return (
    <Section
      color={data.color ?? undefined}
      className="hero-section min-h-screen flex items-center relative overflow-hidden pt-24"
    >
      {/* Elegant Background */}
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />

        {/* Accent gradient orbs */}
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-orange-200/40 to-orange-100/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-gradient-to-tr from-gray-200/50 to-gray-100/30 rounded-full blur-3xl" />

        {/* Diagonal accent lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[1px] h-[60vh] bg-gradient-to-b from-orange-500/30 via-orange-500/10 to-transparent transform rotate-[20deg] origin-top-right" />
          <div className="absolute bottom-0 left-1/4 w-[1px] h-[40vh] bg-gradient-to-t from-gray-400/20 via-gray-400/10 to-transparent transform -rotate-[15deg] origin-bottom" />
        </div>
      </div>

      {/* Corner accents */}
      <div className="hidden lg:block absolute top-32 left-12 corner-accent corner-accent-tl" />
      <div className="hidden lg:block absolute bottom-12 right-12 corner-accent corner-accent-br" />

      <Container
        size="large"
        width="custom"
        className="hero-content grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center py-12 lg:py-20 relative z-10 max-w-8xl mx-auto"
      >
        {/* Content Column */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          {/* Tagline */}
          {data.tagline && (
            <div
              data-tina-field={tinaField(data, "tagline")}
              className="inline-flex items-center gap-2 mb-6 animate-fadeIn"
            >
              <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-orange-300" />
              <span className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-600 dark:text-orange-400">
                {data.tagline}
              </span>
            </div>
          )}

          {/* Headline */}
          {data.headline && (
            <h1
              data-tina-field={tinaField(data, "headline")}
              className="mb-6 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1] title-font text-gray-900 dark:text-white"
            >
              <TypingAnimation className="inline">
                {data.headline}
              </TypingAnimation>
            </h1>
          )}

          {/* Description */}
          {data.text && (
            <div
              data-tina-field={tinaField(data, "text")}
              className="mb-8 text-lg sm:text-xl text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {data.text.children?.[0]?.children?.[0]?.text && (
                <p className="animate-slideUp" style={{ animationDelay: "200ms" }}>
                  {data.text.children[0].children[0].text}
                </p>
              )}
            </div>
          )}

          {/* Actions */}
          {data.actions && (
            <div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slideUp"
              style={{ animationDelay: "400ms" }}
            >
              <Actions
                className="gap-4"
                parentColor={data.color ?? "default"}
                actions={data.actions.filter(
                  (a): a is NonNullable<typeof a> => a !== null
                )}
              />
            </div>
          )}

          {/* Stats or trust indicators */}
          <div
            className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 animate-slideUp"
            style={{ animationDelay: "600ms" }}
          >
            <div className="flex flex-wrap gap-8 justify-center lg:justify-start">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  15+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Years Experience
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  200+
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Projects Delivered
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">
                  98%
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Secondary text */}
          {data.text2 && (
            <div
              data-tina-field={tinaField(data, "text2")}
              className="prose prose-lg dark:prose-dark mt-8"
            >
              <TinaMarkdown
                content={data.text2}
                components={{
                  mermaid: (props: { value: string } | undefined) => {
                    if (!props) return null;
                    return <MermaidElement value={props.value} />;
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* Image Column */}
        {data.image && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative animate-scaleIn">
              {/* Background shape */}
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-100 to-orange-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl transform rotate-3 opacity-60" />

              {/* Image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-gray-900/20 group">
                {data.image.src && (
                  <Image
                    className="w-full h-auto object-cover aspect-[4/3] transition-transform duration-700 ease-out group-hover:scale-105"
                    alt={data.image.alt || "Hero image"}
                    src={data.image.src}
                    width={800}
                    height={600}
                    priority
                  />
                )}

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent" />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gray-900/10 rounded-full blur-2xl" />

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 lg:bottom-8 lg:-right-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
                    <svg
                      width="24"
                      height="24"
                      className="w-6 h-6 text-white flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      End-to-End Solutions
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Complete Supply Chain Coverage
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden lg:block">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
            Scroll
          </span>
          <svg
            width="20"
            height="20"
            className="w-5 h-5 text-gray-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
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
