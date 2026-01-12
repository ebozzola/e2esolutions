import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { cn } from "../../lib/utils";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
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
            <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-900" />
            <div className="absolute inset-0 bg-grid-pattern opacity-30" />
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-100/50 rounded-full blur-3xl" />
          </>
        )}
      </div>

      <Container size="large" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Quote card */}
          <div
            className={cn(
              "relative p-10 md:p-16 rounded-3xl",
              isPrimary
                ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                : "bg-white dark:bg-gray-800 shadow-2xl shadow-gray-900/10"
            )}
          >
            {/* Decorative quote mark */}
            <div className="absolute -top-6 left-10">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  "bg-gradient-to-br from-orange-500 to-orange-600",
                  "shadow-lg shadow-orange-500/30"
                )}
              >
                <svg
                  width="24"
                  height="24"
                  className="w-6 h-6 flex-shrink-0 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
            </div>

            {/* Quote text */}
            <blockquote
              data-tina-field={tinaField(data, `quote`)}
              className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-medium leading-relaxed title-font mb-8",
                isPrimary
                  ? "text-white"
                  : "text-gray-900 dark:text-white"
              )}
            >
              {typeof data.quote === "string" ? `"${data.quote}"` : ""}
            </blockquote>

            {/* Author */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold",
                  "bg-gradient-to-br from-orange-100 to-orange-50 text-orange-600",
                  "dark:from-orange-900/30 dark:to-orange-800/20 dark:text-orange-400"
                )}
              >
                {data.author ? data.author.charAt(0).toUpperCase() : "A"}
              </div>

              <div>
                <p
                  data-tina-field={tinaField(data, `author`)}
                  className={cn(
                    "text-lg font-semibold",
                    isPrimary
                      ? "text-white"
                      : "text-gray-900 dark:text-white"
                  )}
                >
                  {data.author}
                </p>
                <p
                  className={cn(
                    "text-sm",
                    isPrimary
                      ? "text-gray-400"
                      : "text-gray-500 dark:text-gray-400"
                  )}
                >
                  Verified Client
                </p>
              </div>

              {/* 5 star rating */}
              <div className="ml-auto hidden md:flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    width="20"
                    height="20"
                    className="w-5 h-5 flex-shrink-0 text-orange-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export const testimonialBlockSchema: Template = {
  name: "testimonial",
  label: "Testimonial",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      quote:
        "There are only two hard things in Computer Science: cache invalidation and naming things.",
      author: "Phil Karlton",
      color: "primary",
    },
  },
  fields: [
    {
      type: "string",
      ui: {
        component: "textarea",
      },
      label: "Quote",
      name: "quote",
    },
    {
      type: "string",
      label: "Author",
      name: "author",
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
