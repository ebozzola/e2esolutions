import React from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
  return (
    <Section
      color={data.color ?? undefined}
      className="relative overflow-hidden py-8 md:py-16"
    >
      {/* Modern Background - Consistent with Hero Section */}
      <div className="absolute inset-0 z-0">
        {data.color === "primary" ? (
          <>
            {/* Primary color background for dark sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-600"></div>

            {/* Animated blob shapes for dark background */}
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute bottom-0 -left-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </>
        ) : (
          <>
            {/* Light background for default/tint sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"></div>

            {/* Animated blob shapes for light background */}
            <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 -left-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </>
        )}
      </div>

      {/* Geometric accent elements - similar to hero */}
      <div className="hidden md:block absolute inset-0 z-1 pointer-events-none">
        {/* Floating accent shapes */}
        <div className="absolute top-1/4 right-1/4 w-16 h-16 border-2 border-primary/20 opacity-80 rotate-12 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border border-primary/20 opacity-80 -rotate-12 animate-float animation-delay-2000"></div>
      </div>

      <Container size="large" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          <blockquote className="transition-all duration-700 ease-out bg-white/10 backdrop-blur-sm p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="relative">
              {/* Quote marks */}
              <span
                className={`absolute -top-10 -left-6 text-8xl ${
                  data.color === "primary" ? "text-white/20" : "text-primary/20"
                }`}
              >
                &ldquo;
              </span>

              <div
                className={`relative z-10 text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight ${
                  data.color === "primary"
                    ? "text-white"
                    : "text-gray-800 dark:text-gray-50"
                }`}
              >
                <p
                  data-tina-field={tinaField(data, `quote`)}
                  className="leading-relaxed"
                >
                  {typeof data.quote === "string" ? data.quote : ""}
                </p>
              </div>

              <span
                className={`absolute -bottom-20 -right-6 text-8xl ${
                  data.color === "primary" ? "text-white/20" : "text-primary/20"
                }`}
              >
                &rdquo;
              </span>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4 animate-pulse">
                {data.author ? data.author.charAt(0) : ""}
              </div>
              <div>
                <p
                  data-tina-field={tinaField(data, `author`)}
                  className={`font-bold text-lg ${
                    data.color === "primary"
                      ? "text-white"
                      : "text-primary dark:text-blue-300"
                  }`}
                >
                  {data.author}
                </p>
              </div>
            </div>
          </blockquote>
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
