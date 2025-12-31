"use client";
import * as React from "react";
import dynamic from "next/dynamic";
import type { Template } from "tinacms";
import { PageBlocksVideo } from "@/tina/__generated__/types";
import { Section } from "../layout/section";
import { Container } from "../layout/container";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false }) as React.ComponentType<any>;

export const Video = ({ data }: { data: PageBlocksVideo }) => {
  if (!data.url) return null;

  return (
    <Section color={data.color ?? undefined} className="py-8 md:py-16">
      <Container size="custom" className="max-w-7xl mx-auto">
        <div className="aspect-video">
          <ReactPlayer
            width="100%"
            height="100%"
            style={{ margin: "auto" }}
            playing={data.autoPlay ?? false}
            loop={data.loop ?? false}
            controls={true}
            url={data.url}
          />
        </div>
      </Container>
    </Section>
  );
};

export const videoBlockSchema: Template = {
  name: "video",
  label: "Video",
  ui: {
    previewSrc: "/blocks/video.png",
    defaultItem: {
      url: "https://www.youtube.com/watch?v=j8egYW7Jpgk",
    },
  },
  fields: [
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
    {
      type: "string",
      label: "Url",
      name: "url",
    },
    {
      type: "boolean",
      label: "Auto Play",
      name: "autoPlay",
    },
    {
      type: "boolean",
      label: "Loop",
      name: "loop",
    }
  ],
};
