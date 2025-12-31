"use client";
import React, { useState, useRef } from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { motion, AnimatePresence } from "framer-motion";
import { PageBlocksFaq } from "../../tina/__generated__/types";

// Define the types for our FAQ items
interface FAQItemType {
  question?: string;
  answer?: any; // Rich text content
}

interface FAQProps {
  data: PageBlocksFaq;
}

// Individual FAQ Item component
const FAQItem = ({ item, index }: { item: any; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className={`mb-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm transition-all duration-300 ${
        isOpen ? "shadow-lg" : "shadow"
      }`}
    >
      <button
        data-tina-field={tinaField(item, "question")}
        className="flex justify-between items-center w-full p-5 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold">{item.question}</h3>
        <motion.span
          className="ml-6 flex-shrink-0 text-primary"
          initial={false}
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 transition-transform"
          >
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            ref={contentRef}
            data-tina-field={tinaField(item, "answer")}
            className="px-5 pb-5 prose dark:prose-dark overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeIn" },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <motion.div
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              exit={{ y: 10 }}
              transition={{ duration: 0.3 }}
            >
              <TinaMarkdown content={item.answer} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main FAQ component
export const FAQ = ({ data }: FAQProps) => {
  return (
    <Section
      color={data.color ?? undefined}
      className="relative overflow-hidden py-8 md:py-16"
    >
      {/* Modern Background - Consistent with other sections */}
      <div className="absolute inset-0 z-0">
        {data.color === "primary" ? (
          <>
            {/* Primary color background for dark sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </>
        ) : (
          <>
            {/* Light background for default/tint sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"></div>
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </>
        )}
      </div>

      <Container size="large" className="relative z-10">
        <div className="max-w-4xl mx-auto">
          {data.title && (
            <h2
              data-tina-field={tinaField(data, "title")}
              className={`text-3xl md:text-4xl font-bold text-center mb-4 ${
                data.color === "primary"
                  ? "text-white"
                  : "text-gray-900 dark:text-white"
              }`}
            >
              {data.title}
            </h2>
          )}

          {data.subtitle && (
            <p
              data-tina-field={tinaField(data, "subtitle")}
              className={`text-xl text-center mb-12 ${
                data.color === "primary"
                  ? "text-white/80"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {data.subtitle}
            </p>
          )}

          <div className="space-y-4">
            {data.items?.map((item, index) => (
              <div key={index}>
                <FAQItem item={item} index={index} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

// Define the FAQ block schema for Tina CMS
export const faqBlockSchema: Template = {
  name: "faq",
  label: "FAQ",
  ui: {
    previewSrc: "/blocks/faq.png",
    defaultItem: {
      title: "Frequently Asked Questions",
      subtitle: "Find answers to common questions about our services",
      items: [
        {
          question: "What services do you offer?",
          answer:
            "We offer comprehensive supply chain management solutions including procurement, logistics, inventory management, and distribution services.",
        },
        {
          question: "How can your services benefit my business?",
          answer:
            "Our services can help optimize your supply chain, reduce costs, improve efficiency, and enhance overall business performance.",
        },
      ],
      color: "default",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Subtitle",
      name: "subtitle",
    },
    {
      type: "object",
      label: "FAQ Items",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.question };
        },
        defaultItem: {
          question: "What is your question?",
          answer: "This is the answer to the question.",
        },
      },
      fields: [
        {
          type: "string",
          label: "Question",
          name: "question",
        },
        {
          type: "rich-text",
          label: "Answer",
          name: "answer",
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
