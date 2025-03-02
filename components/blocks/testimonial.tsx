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
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        {data.color === "primary" ? (
          <div className="absolute inset-0 bg-gradient-industrial-steel opacity-70"></div>
        ) : (
          <div className="absolute inset-0 bg-gradient-industrial-metal opacity-20"></div>
        )}
        <div className="absolute inset-0 bg-pattern-industrial opacity-5"></div>
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block" style={{ zIndex: 1 }}>
        <div className="absolute top-0 left-0 w-32 h-1 bg-gray-500/15"></div>
        <div className="absolute top-0 left-0 w-1 h-32 bg-gray-500/15"></div>
        <div className="absolute bottom-0 right-0 w-32 h-1 bg-gray-500/15"></div>
        <div className="absolute bottom-0 right-0 w-1 h-32 bg-gray-500/15"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 border border-gray-500/20 rotate-45"></div>
        <div className="absolute bottom-1/4 left-1/4 w-12 h-12 border border-gray-500/20 rotate-45"></div>

        {/* Additional geometric elements */}
        <div className="absolute top-1/2 right-1/3 w-20 h-1 bg-gray-500/15"></div>
        <div className="absolute bottom-1/2 left-1/3 w-20 h-1 bg-gray-500/15"></div>
      </div>

      <Container size="large" className="relative z-10">
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
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-2 -left-4 leading-4 ${
                isVisible ? "animate-slideInFromLeft" : "opacity-0"
              }`}
              style={{ zIndex: -1 }}
            >
              &ldquo;
            </span>
            <p
              data-tina-field={tinaField(data, `quote`)}
              className={`relative opacity-95 ${
                isVisible ? "animate-pulse" : ""
              }`}
            >
              {typeof data.quote === "string" ? data.quote : ""}
            </p>
            <span
              className={`block opacity-15 text-8xl absolute inset-y-1/2 transform translate-y-3 -right-4 leading-4 ${
                isVisible ? "animate-slideInFromRight" : "opacity-0"
              }`}
              style={{ zIndex: -1 }}
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
                  ? `bg-gray-600`
                  : `bg-gray-300 dark:bg-gray-700`
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
