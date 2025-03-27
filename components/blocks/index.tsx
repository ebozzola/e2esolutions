import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { FeatureTeams } from "./feature-teams";
import { Testimonial } from "./testimonial";
import { TestimonialCarousel } from "./testimonial-carousel";
import { Video } from "./video";
import { CaseStudies } from "./case-studies";
import { ContactForm } from "./contact-form";
import { FAQ } from "./faq";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksVideo":
      return <Video data={block} />;
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksFeatureTeams":
      return <FeatureTeams data={block} />;
    case "PageBlocksTestimonial":
      return <Testimonial data={block} />;
    case "PageBlocksTestimonialCarousel":
      return <TestimonialCarousel data={block} />;
    case "PageBlocksCaseStudies":
      return <CaseStudies data={block} />;
    case "PageBlocksContactForm":
      return <ContactForm data={block} />;
    case "PageBlocksFaq":
      return <FAQ data={block} />;
    default:
      return null;
  }
};
