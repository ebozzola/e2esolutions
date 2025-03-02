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
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

export const Feature = ({
  featuresColor,
  data,
  index,
}: {
  featuresColor: string;
  data: PageBlocksFeaturesItems;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, index]);

  return (
    <div
      ref={ref}
      data-tina-field={tinaField(data)}
      className={`feature-card flex-1 flex flex-col gap-6 min-w-[280px] max-w-full sm:max-w-[calc(50%-1rem)] lg:max-w-[calc(33.33%-1rem)] 
        ${isVisible ? "animate-slideInFromBottom" : "opacity-0"} 
        ${featuresColor === "primary" ? "glass-dark" : "glass"} 
        hover-lift hover-glow`}
    >
      {data.icon && (
        <div
          data-tina-field={tinaField(data, "icon")}
          className={`relative inline-flex items-center justify-center w-16 h-16 animate-float`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-full"></div>
          <Icon
            parentColor={featuresColor}
            data={{
              name: data.icon.name,
              color: data.icon.color,
              style: data.icon.style,
            }}
            className={`w-full h-full relative z-10`}
          />
        </div>
      )}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="prose prose-md dark:prose-dark"
        >
          <TinaMarkdown content={data.text} />
        </div>
      )}
    </div>
  );
};

export const Features = ({ data }: { data: PageBlocksFeatures }) => {
  return (
    <Section color={data.color} className="relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-1">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        {data.color === "primary" && (
          <div className="absolute inset-0 bg-gradient-animated opacity-30"></div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block">
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-blue-700/5 blur-3xl"></div>
      </div>

      <Container
        className={`flex flex-wrap gap-x-10 gap-y-8 text-left py-12 md:py-20`}
        size="large"
      >
        {data.items &&
          data.items.map(function (block, i) {
            return (
              <Feature
                featuresColor={data.color}
                key={i}
                data={block}
                index={i}
              />
            );
          })}
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
        itemProps: (item) => {
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
