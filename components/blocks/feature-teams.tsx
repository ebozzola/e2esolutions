"use client";
import {
  PageBlocksFeatureTeams,
  PageBlocksFeatureTeamsItems,
} from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Icon } from "../icon";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { useState } from "react";
import Image from "next/image";

// Modal component for displaying full team member details
const TeamMemberModal = ({
  isOpen,
  onClose,
  data,
  featuresColor,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: PageBlocksFeatureTeamsItems;
  featuresColor: string;
}) => {
  const [isClosing, setIsClosing] = useState(false);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
      // Prevent scrolling on body when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    // Add a small delay before actually closing the modal to allow for exit animation
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop with blur effect */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isClosing ? "opacity-0" : "opacity-100"
        }`}
        onClick={handleClose}
      ></div>

      {/* Modal content */}
      <div
        className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-900 rounded-xl shadow-2xl transform transition-all duration-300 ${
          isClosing ? "scale-95 opacity-0" : "animate-modalEntry"
        }`}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 z-10 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-6">
            {data.icon && (
              <div
                className={`relative inline-flex items-center justify-center w-16 h-16 z-10`}
              >
                <div
                  className={`absolute inset-0 rounded-full ${
                    data.icon.color
                      ? `bg-${data.icon.color}-500 dark:bg-${data.icon.color}-600`
                      : "bg-primary"
                  }`}
                ></div>
                <div className="absolute inset-0 rounded-full border-2 border-primary/20 scale-110 opacity-30"></div>
                <Icon
                  parentColor={featuresColor}
                  data={{
                    name: data.icon.name,
                    color: data.icon.color || "",
                    style: data.icon.style || "regular",
                  }}
                  className="w-8 h-8 relative z-10 text-white"
                />
              </div>
            )}

            <div className="flex-1">
              {data.title && (
                <h2 className="text-2xl font-bold mb-1">{data.title}</h2>
              )}

              {data.image?.src && (
                <div className="absolute top-6 right-8 z-10">
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
            </div>
          </div>

          {data.text && (
            <div className="prose prose-lg dark:prose-dark max-w-none">
              <TinaMarkdown content={data.text} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const FeatureTeamItem = ({
  featuresColor,
  data,
  index,
}: {
  featuresColor: string;
  data: PageBlocksFeatureTeamsItems;
  index: number;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        data-tina-field={tinaField(data)}
        className={`feature-card flex flex-col gap-4
          w-full 
          md:w-[calc(50%-1rem)] 
          xl:w-[calc(33.333%-1.5rem)]
          group relative p-6 mb-6 rounded-xl bg-white/50 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden
          cursor-pointer`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => setIsModalOpen(true)}
        role="button"
        tabIndex={0}
        aria-expanded={isModalOpen}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsModalOpen(true);
          }
        }}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

        {data.icon && (
          <div
            data-tina-field={tinaField(data, "icon")}
            className={`relative inline-flex items-center justify-center w-16 h-16 z-10 mb-2`}
          >
            {/* Animated background circle */}
            <div
              className={`absolute inset-0 rounded-full ${
                data.icon.color
                  ? `bg-${data.icon.color}-500 dark:bg-${data.icon.color}-600`
                  : "bg-primary"
              } transition-all duration-500 ease-in-out ${
                isHovered ? "scale-110 opacity-90" : "scale-100 opacity-80"
              }`}
            ></div>

            {/* Decorative ring */}
            <div
              className={`absolute inset-0 rounded-full border-2 border-primary/20 transition-all duration-500 ${
                isHovered ? "scale-125 opacity-50" : "scale-110 opacity-30"
              }`}
            ></div>

            {/* Icon */}
            <Icon
              parentColor={featuresColor}
              data={{
                name: data.icon.name,
                color: data.icon.color || "",
                style: data.icon.style || "regular",
              }}
              className={`w-8 h-8 relative z-10 text-white transition-transform duration-300 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        )}
        {data.image?.src && (
          <div
            data-tina-field={tinaField(data.image, "src")}
            className="absolute top-6 right-6 z-10"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-full blur opacity-30"></div>
              <Image
                src={data.image.src}
                alt={data.image.alt || "Profile picture"}
                width={80}
                height={80}
                className="relative rounded-full shadow-lg border-2 border-white"
              />
            </div>
          </div>
        )}
        {data.title && (
          <h3
            data-tina-field={tinaField(data, "title")}
            className="text-xl font-semibold title-font pr-24 mb-2 relative z-10"
          >
            {data.title}
          </h3>
        )}
        {data.text && (
          <div
            data-tina-field={tinaField(data, "text")}
            className="prose prose-md dark:prose-dark relative z-10"
          >
            <div className="line-clamp-6">
              <TinaMarkdown content={data.text} />
            </div>

            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsModalOpen(true);
                }}
                className="mt-2 text-primary hover:text-primary-dark font-medium transition-colors duration-200 flex items-center"
              >
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1 h-4 w-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for full content */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={data}
        featuresColor={featuresColor}
      />
    </>
  );
};

export const FeatureTeams = ({ data }: { data: PageBlocksFeatureTeams }) => {
  return (
    <Section color={data.color} className="relative overflow-hidden">
      {/* Modern Background - Consistent with Hero Section */}
      <div className="absolute inset-0 z-0">
        {data.color === "primary" ? (
          <>
            {/* Primary color background for dark sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-600 to-purple-600"></div>

            {/* Animated blob shapes for dark background */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-10"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-10"></div>
          </>
        ) : (
          <>
            {/* Light background for default/tint sections */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/5 to-blue-500/10"></div>

            {/* Animated blob shapes for light background */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute bottom-0 -right-4 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
            <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

            {/* Subtle pattern overlay */}
            <div className="absolute inset-0 opacity-5"></div>
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
        className={`flex flex-wrap gap-6 text-left py-12 md:py-16 relative z-10 mx-auto w-full`}
        size="large"
      >
        {/* Features grid */}
        <div className="flex flex-wrap gap-6 justify-center w-full">
          {data.items &&
            data.items.map(function (block, i) {
              return (
                block && (
                  <FeatureTeamItem
                    featuresColor={data.color || "default"}
                    key={i}
                    data={block}
                    index={i}
                  />
                )
              );
            })}
        </div>
      </Container>
    </Section>
  );
};

export const featureTeamsBlockSchema = {
  name: "featureTeams",
  label: "Team Features",
  ui: {
    previewSrc: "/blocks/features.png",
    defaultItem: {
      items: [
        {
          title: "Team Member Name",
          text: "This is where you might talk about the team member, their background, expertise, and achievements.",
          icon: {
            color: "",
            style: "float",
            name: "",
          },
          image: {
            src: "",
            alt: "",
          },
        },
      ],
    },
  },
  fields: [
    {
      type: "object",
      label: "Team Members",
      name: "items",
      list: true,
      ui: {
        itemProps: (item) => {
          return {
            label: item?.title,
          };
        },
        defaultItem: {
          title: "Team Member Name",
          text: "This is where you might talk about the team member, their background, expertise, and achievements.",
          icon: {
            color: "",
            style: "float",
            name: "",
          },
          image: {
            src: "",
            alt: "",
          },
        },
      },
      fields: [
        {
          type: "object",
          label: "Icon",
          name: "icon",
          fields: [
            {
              name: "name",
              label: "Icon Name",
              type: "string",
            },
            {
              name: "color",
              label: "Icon Color",
              type: "string",
            },
            {
              name: "style",
              label: "Icon Style",
              type: "string",
            },
          ],
        },
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
