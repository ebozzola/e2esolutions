"use client";
import React from "react";
import type { Template } from "tinacms";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";

// Define the types for our testimonial items
interface TestimonialItemType {
  quote?: string;
  author?: string;
  role?: string;
  company?: string;
  image?: {
    src?: string;
    alt?: string;
  };
}

interface TestimonialCarouselProps {
  data: {
    title?: string;
    subtitle?: string;
    testimonials?: TestimonialItemType[];
    color?: string;
  };
}

const TestimonialItem = ({ item }: { item: TestimonialItemType }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="bg-white rounded-xl p-6 flex flex-col border border-gray-100 h-full shadow-[0_4px_14px_rgba(0,0,0,0.08)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] transition-shadow duration-300">
        <div className="flex items-start mb-3">
          <div className="relative mr-4 flex-shrink-0">
            {item.image?.src ? (
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src={item.image.src}
                  alt={item.image.alt || `${item.author} testimonial`}
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {item.author ? item.author.charAt(0) : ""}
              </div>
            )}
          </div>
          <div>
            <p
              data-tina-field={item && tinaField(item, "author")}
              className="font-bold text-base text-gray-900"
            >
              {item.author}
            </p>
            {item.role && (
              <p
                data-tina-field={item && tinaField(item, "role")}
                className="text-xs text-gray-600"
              >
                {item.role}
              </p>
            )}
            {item.company && (
              <p
                data-tina-field={item && tinaField(item, "company")}
                className="text-xs text-primary font-medium"
              >
                {item.company}
              </p>
            )}
          </div>
        </div>
        <div className="relative flex-1 overflow-hidden mt-2">
          <span className="absolute -top-4 -left-2 text-4xl text-primary/20">
            &ldquo;
          </span>
          <p
            data-tina-field={item && tinaField(item, "quote")}
            className="text-gray-700 text-sm italic relative z-10 pl-2 line-clamp-7"
          >
            {item.quote}
          </p>
          <span className="absolute -bottom-4 -right-2 text-4xl text-primary/20">
            &rdquo;
          </span>
        </div>
      </div>
    </div>
  );
};

export const TestimonialCarousel = ({ data }: TestimonialCarouselProps) => {
  if (!data.testimonials || data.testimonials.length === 0) {
    return null;
  }

  // Create a duplicated array for continuous scrolling effect
  // We need to duplicate the items to create the continuous scrolling illusion
  const duplicatedTestimonials = [
    ...data.testimonials,
    ...data.testimonials,
    ...data.testimonials,
  ];

  return (
    <Section
      color={data.color}
      className="relative overflow-hidden py-16 md:py-24"
    >
      {/* Modern Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.1)_0,rgba(0,0,0,0)_70%)]"></div>
      </div>

      <div className="relative z-10 w-full">
        <Container size="large" className="mb-8">
          {data.title && (
            <h2
              data-tina-field={tinaField(data, "title")}
              className="text-3xl md:text-5xl font-bold text-center mb-4 text-gray-900"
            >
              {data.title}
            </h2>
          )}

          {data.subtitle && (
            <p
              data-tina-field={tinaField(data, "subtitle")}
              className="text-xl text-center mb-8 text-gray-600"
            >
              {data.subtitle}
            </p>
          )}
        </Container>

        <div className="w-full overflow-hidden">
          <Carousel
            autoplaySpeed={40000} // 40 seconds for a complete cycle
            className="w-full"
          >
            <CarouselContent>
              <div className="flex">
                {duplicatedTestimonials.map(
                  (testimonial, index) =>
                    testimonial && (
                      <CarouselItem
                        key={index}
                        className="w-[280px] sm:w-[320px] md:w-[350px] lg:w-[380px] h-full"
                      >
                        <div className="px-2 h-full">
                          <TestimonialItem item={testimonial} />
                        </div>
                      </CarouselItem>
                    )
                )}
              </div>
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </Section>
  );
};

export const testimonialCarouselBlockSchema: Template = {
  name: "testimonialCarousel",
  label: "Testimonial Carousel",
  ui: {
    previewSrc: "/blocks/testimonial-carousel.png",
    defaultItem: {
      title: "What Our Clients Say",
      subtitle: "Hear from professionals who have worked with us.",
      testimonials: [
        {
          quote:
            "The team's expertise in data management and development has been invaluable for our operations. Their ability to create efficient systems and analyze complex datasets has significantly improved our capabilities.",
          author: "John Smith",
          role: "CEO",
          company: "Manufacturing Company",
          image: {
            src: "https://randomuser.me/api/portraits/men/32.jpg",
            alt: "John Smith testimonial photo",
          },
        },
        {
          quote:
            "Working with E2E Solutions has been a game-changer for our retail distribution network. Their data-driven approach helped us optimize inventory levels across multiple locations, resulting in reduced costs and improved customer satisfaction.",
          author: "Sarah Johnson",
          role: "Distribution Manager",
          company: "Retail Chain",
          image: {
            src: "https://randomuser.me/api/portraits/women/44.jpg",
            alt: "Sarah Johnson testimonial photo",
          },
        },
        {
          quote:
            "The team delivered exceptional results for our healthcare system. Their technical expertise and collaborative approach were instrumental in creating solutions that improved patient care while reducing administrative overhead.",
          author: "Michael Chen",
          role: "CTO",
          company: "Healthcare Provider",
          image: {
            src: "https://randomuser.me/api/portraits/men/76.jpg",
            alt: "Michael Chen testimonial photo",
          },
        },
        {
          quote:
            "E2E Solutions transformed our supply chain operations completely. Their team identified inefficiencies we hadn't noticed for years and implemented solutions that reduced our costs by 23% while improving delivery times.",
          author: "Emily Rodriguez",
          role: "Operations Director",
          company: "Logistics Company",
          image: {
            src: "https://randomuser.me/api/portraits/women/65.jpg",
            alt: "Emily Rodriguez testimonial photo",
          },
        },
      ],
      color: "primary",
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
      label: "Testimonials",
      name: "testimonials",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.author || "Testimonial" };
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
          label: "Role",
          name: "role",
        },
        {
          type: "string",
          label: "Company",
          name: "company",
        },
        {
          type: "object",
          label: "Author Image",
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
