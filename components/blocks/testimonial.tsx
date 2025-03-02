import React, { useEffect, useState } from "react";
import type { Template } from "tinacms";
import { PageBlocksTestimonial } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { useInView } from "react-intersection-observer";

export const Testimonial = ({ data }: { data: PageBlocksTestimonial }) => {
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

  return (
    <Section
      color={data.color}
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-1">
        {data.color === "primary" && (
          <div className="absolute inset-0 bg-gradient-animated opacity-30"></div>
        )}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block">
        <div className="absolute top-0 left-0 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full bg-blue-700/10 blur-2xl"></div>
        <div className="absolute top-1/4 right-1/4 w-4 h-4 rounded-full bg-blue-400 opacity-20 animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-6 h-6 rounded-full bg-blue-300 opacity-20 animate-float animate-delay-300"></div>
      </div>

      <Container size="large">
        <blockquote
          ref={ref}
          className={`${
            isVisible ? "animate-fadeIn" : "opacity-0"
          } transition-all duration-700 ease-out`}
        >
          <div
            className={`relative z-10 max-w-3xl mx-auto text-4xl lg:text-5xl font-bold tracking-normal text-center title-font ${
              data.color === "primary"
                ? `text-white`
                : `text-gray-700 dark:text-gray-50`
            }`}
          >
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-2 -left-4 leading-4 -z-1 ${
                isVisible ? "animate-slideInFromLeft" : "opacity-0"
              }`}
            >
              &ldquo;
            </span>
            <p
              data-tina-field={tinaField(data, `quote`)}
              className={`relative opacity-95 ${
                isVisible ? "animate-pulse" : ""
              }`}
            >
              {data.quote}
            </p>
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-3 -right-4 leading-4 -z-1 ${
                isVisible ? "animate-slideInFromRight" : "opacity-0"
              }`}
            >
              &rdquo;
            </span>
          </div>
          <div
            className={`my-8 flex-grow-0 ${
              isVisible
                ? "animate-slideInFromBottom animate-delay-200"
                : "opacity-0"
            }`}
          >
            <span
              className={`block mx-auto h-0.5 w-1/6 ${
                data.color === "primary"
                  ? `bg-blue-600`
                  : `bg-gray-200 dark:bg-gray-700`
              }`}
            ></span>
          </div>
          <footer
            className={`text-center ${
              isVisible
                ? "animate-slideInFromBottom animate-delay-300"
                : "opacity-0"
            }`}
          >
            <p
              data-tina-field={tinaField(data, `author`)}
              className={`tracking-wide title-font font-bold text-lg ${
                data.color === "primary"
                  ? `text-blue-200`
                  : `text-blue-500 dark:text-blue-300`
              }`}
            >
              {data.author}
            </p>
          </footer>
        </blockquote>
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
