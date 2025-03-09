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
      className={`feature-card flex flex-col gap-6
        w-full 
        md:w-[calc(50%-1rem)] 
        xl:w-[calc(33.333%-1.5rem)]
        ${isVisible ? "animate-slideInFromBottom" : "opacity-0"} 
        group relative p-8 mb-8 rounded-xl bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {data.icon && (
        <div
          data-tina-field={tinaField(data, "icon")}
          className={`relative inline-flex items-center justify-center w-16 h-16 z-10`}
        >
          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-primary to-blue-500 p-2 w-10 h-10 flex items-center justify-center text-white"></div>
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
          className="absolute top-8 right-8 z-10"
        >
          <div className="relative">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30"></div>
            <Image
              src={data.image.src}
              alt={data.image.alt || "Profile picture"}
              width={100}
              height={100}
              className="relative rounded-full shadow-lg border-2 border-white"
            />
          </div>
        </div>
      )}
      {data.title && (
        <h3
          data-tina-field={tinaField(data, "title")}
          className="text-2xl font-semibold title-font pr-32 mb-2 relative z-10"
        >
          {data.title}
        </h3>
      )}
      {data.text && (
        <div
          data-tina-field={tinaField(data, "text")}
          className="prose prose-lg dark:prose-dark relative z-10"
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
      {/* Modern Background - Consistent with Hero Section */}
      <div className="absolute inset-0 z-0">
        {data.color === "primary" ? (
          <>
            {/* Primary color background for dark sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-600"></div>

            {/* Animated blob shapes for dark background */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          </>
        ) : (
          <>
            {/* Light background for default/tint sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"></div>

            {/* Animated blob shapes for light background */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          </>
        )}
      </div>

      {/* Geometric accent elements - similar to hero */}
      <div className="hidden md:block absolute inset-0 z-1 pointer-events-none">
        {/* Top right corner elements */}
        <div className="absolute top-20 right-10 w-32 h-1 bg-primary/30 -rotate-45 transform origin-right"></div>
        <div className="absolute top-20 right-10 w-1 h-32 bg-primary/30 rotate-45 transform origin-top"></div>

        {/* Bottom left corner elements */}
        <div className="absolute bottom-20 left-10 w-32 h-1 bg-primary/30 rotate-45 transform origin-left"></div>
        <div className="absolute bottom-20 left-10 w-1 h-32 bg-primary/30 -rotate-45 transform origin-bottom"></div>
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
