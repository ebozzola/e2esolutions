import type { Collection } from "tinacms";
import { heroBlockSchema } from "../../components/blocks/hero";
import { contentBlockSchema } from "../../components/blocks/content";
import { testimonialBlockSchema } from "../../components/blocks/testimonial";
import { testimonialCarouselBlockSchema } from "../../components/blocks/testimonial-carousel";
import { featureBlockSchema } from "../../components/blocks/features";
import { featureTeamsBlockSchema } from "../../components/blocks/feature-teams";
import { videoBlockSchema } from "../../components/blocks/video";
import { caseStudiesBlockSchema } from "../../components/blocks/case-studies";
import { contactFormBlockSchema } from "../../components/blocks/contact-form";
import { faqBlockSchema } from "../../components/blocks/faq";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  format: "mdx",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      return `/${document._sys.filename}`;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        contentBlockSchema,
        testimonialBlockSchema,
        // @ts-ignore
        testimonialCarouselBlockSchema,
        // @ts-ignore
        featureBlockSchema,
        // @ts-ignore
        featureTeamsBlockSchema,
        videoBlockSchema,
        caseStudiesBlockSchema,
        contactFormBlockSchema,
        faqBlockSchema,
      ],
    },
  ],
};

export default Page;
