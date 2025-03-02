import React from "react";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { tinaField } from "tinacms/dist/react";
import type { Template } from "tinacms";

export const caseStudiesBlockSchema: Template = {
  name: "caseStudies",
  label: "Case Studies",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      headline: "Our Success Stories",
      subheadline:
        "See how we've helped businesses transform their supply chains",
      studies: [
        {
          title: "Global Manufacturer",
          problem: "Facing supply chain disruptions and rising costs",
          solution:
            "Implemented strategic sourcing and supplier diversification",
          results: "30% cost reduction and improved resilience",
          industry: "Manufacturing",
        },
      ],
      color: "default",
    },
  },
  fields: [
    {
      type: "string",
      name: "headline",
      label: "Headline",
    },
    {
      type: "string",
      name: "subheadline",
      label: "Subheadline",
    },
    {
      type: "object",
      name: "studies",
      label: "Case Studies",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.title || "Case Study" };
        },
      },
      fields: [
        {
          type: "string",
          name: "title",
          label: "Client Title",
        },
        {
          type: "string",
          name: "problem",
          label: "Problem Statement",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "solution",
          label: "Our Solution",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "results",
          label: "Results Achieved",
          ui: {
            component: "textarea",
          },
        },
        {
          type: "string",
          name: "industry",
          label: "Industry",
        },
      ],
    },
    {
      type: "string",
      name: "color",
      label: "Background Color",
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};

export const CaseStudies = ({ data }) => {
  return (
    <Section color={data.color} className="py-12 md:py-16 lg:py-20">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {data.headline && (
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl mb-6"
              data-tina-field={tinaField(data, "headline")}
            >
              {data.headline}
            </h2>
          )}
          {data.subheadline && (
            <p
              className="mt-4 text-lg text-gray-600 dark:text-gray-400 mb-12"
              data-tina-field={tinaField(data, "subheadline")}
            >
              {data.subheadline}
            </p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
          {data.studies &&
            data.studies.map((study, index) => (
              <div
                key={index}
                className="p-6 rounded-lg border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow duration-200"
                data-tina-field={tinaField(data.studies, index)}
              >
                <div className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                  {study.industry}
                </div>
                <h3
                  className="text-xl font-semibold mb-3"
                  data-tina-field={tinaField(study, "title")}
                >
                  {study.title}
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      The Challenge
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-sm mt-1"
                      data-tina-field={tinaField(study, "problem")}
                    >
                      {study.problem}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Our Solution
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-sm mt-1"
                      data-tina-field={tinaField(study, "solution")}
                    >
                      {study.solution}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">
                      Results
                    </h4>
                    <p
                      className="text-gray-600 dark:text-gray-400 text-sm mt-1"
                      data-tina-field={tinaField(study, "results")}
                    >
                      {study.results}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </Container>
    </Section>
  );
};
