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
import Image from "next/image";

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
      className={`feature-card flex flex-col gap-8
        w-full 
        md:w-[calc(50%-1rem)] 
        xl:w-[calc(33.333%-1.5rem)]
        ${isVisible ? "animate-slideInFromBottom" : "opacity-0"} 
        ${
          featuresColor === "primary"
            ? "glass-dark-industrial"
            : "glass-industrial"
        } 
        hover-lift relative p-8 mb-8`}
    >
      {data.icon && (
        <div
          data-tina-field={tinaField(data, "icon")}
          className={`relative inline-flex items-center justify-center w-16 h-16`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700/20 to-gray-900/20 rounded-sm"></div>
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
      {data.image?.src && (
        <div
          data-tina-field={tinaField(data.image, "src")}
          className="absolute top-8 right-8"
        >
          <Image
            src={data.image.src}
            alt={data.image.alt || "Profile picture"}
            width={100}
            height={100}
            className="rounded-full shadow-lg border-2 border-gray-200"
          />
        </div>
      )}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font pr-32 mb-4"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="prose prose-lg dark:prose-dark"
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
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
        <div className="absolute inset-0 bg-pattern-industrial opacity-5"></div>
        {data.color === "primary" ? (
          <div className="absolute inset-0 bg-gradient-industrial-dark opacity-70"></div>
        ) : (
          <div className="absolute inset-0 bg-gradient-industrial-diagonal opacity-20"></div>
        )}
      </div>

      {/* Decorative elements */}
      <div className="hidden md:block" style={{ zIndex: 1 }}>
        <div className="absolute top-10 right-10 w-64 h-1 bg-gray-500/20"></div>
        <div className="absolute top-10 right-10 w-1 h-64 bg-gray-500/20"></div>
        <div className="absolute bottom-10 left-10 w-64 h-1 bg-gray-500/20"></div>
        <div className="absolute bottom-10 left-10 w-1 h-64 bg-gray-500/20"></div>

        {/* Additional geometric elements */}
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-gray-500/15"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 border border-gray-500/15 rotate-45"></div>
      </div>

      <Container
        className={`flex flex-wrap gap-8 text-left py-16 md:py-24 relative z-10 mx-auto w-full max-w-[90%] xl:max-w-[85%]`}
        size="custom"
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
  image: {
    src: "",
    alt: "",
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
