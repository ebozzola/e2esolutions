"use client";
import React, { useState } from "react";
import { Container } from "../layout/container";
import { Section } from "../layout/section";
import { tinaField } from "tinacms/dist/react";
import type { Template } from "tinacms";
import { PageBlocksContactForm } from "../../tina/__generated__/types";
import { cn } from "../../lib/utils";

interface ContactFormProps {
  data: PageBlocksContactForm;
}

export const contactFormBlockSchema: Template = {
  label: "Contact Form",
  name: "contactForm",
  fields: [
    {
      type: "string" as const,
      label: "Heading",
      name: "heading",
    },
    {
      type: "string" as const,
      label: "Subheading",
      name: "subheading",
    },
    {
      type: "string" as const,
      label: "Form ID",
      name: "formId",
      description: "xldgqllq",
    },
    {
      label: "Color",
      name: "color",
      type: "string" as const,
      options: [
        { label: "Default", value: "default" },
        { label: "Tint", value: "tint" },
        { label: "Primary", value: "primary" },
      ],
    },
  ],
};

export const ContactForm = ({ data }: ContactFormProps) => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formState.subject.trim()) {
      newErrors.subject = "Subject is required";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formspree.io/f/${data.formId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormState({
          name: "",
          email: "",
          company: "",
          subject: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = cn(
    "w-full px-4 py-3.5 rounded-xl transition-all duration-300",
    "bg-gray-50 dark:bg-gray-800 border-2",
    "text-gray-900 dark:text-white placeholder-gray-400",
    "focus:outline-none focus:ring-0"
  );

  const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  return (
    <Section color={data.color || "default"} className="relative overflow-hidden pt-28 lg:pt-36 pb-8 lg:pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-orange-50/20 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800" />
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] bg-orange-100/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-[400px] h-[400px] bg-gray-100/60 rounded-full blur-3xl" />
      </div>

      <Container
        size="large"
        className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20"
      >
        {/* Left column - Info */}
        <div className="flex flex-col justify-center">
          {/* Section label */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-gradient-to-r from-orange-500 to-orange-300" />
            <span className="text-sm font-semibold tracking-[0.2em] uppercase text-orange-600 dark:text-orange-400">
              Contact Us
            </span>
          </div>

          {data.heading && (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="text-3xl md:text-4xl lg:text-5xl font-bold title-font text-gray-900 dark:text-white mb-6"
            >
              {data.heading}
            </h2>
          )}

          {data.subheading && (
            <p
              data-tina-field={tinaField(data, "subheading")}
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed"
            >
              {data.subheading}
            </p>
          )}

          {/* Contact info cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-gray-900/5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center">
                <svg width="24" height="24" className="w-6 h-6 flex-shrink-0 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Email us at</p>
                <p className="font-semibold text-gray-900 dark:text-white">info@e2esolutions.com</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-lg shadow-gray-900/5">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20 flex items-center justify-center">
                <svg width="24" height="24" className="w-6 h-6 flex-shrink-0 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Located at</p>
                <p className="font-semibold text-gray-900 dark:text-white">Global Operations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Form */}
        <div className="relative">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl shadow-gray-900/10 p-8 lg:p-10">
            {/* Accent line */}
            <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-transparent rounded-t-full" />

            {submitStatus === "success" ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-100 to-green-50 flex items-center justify-center">
                  <svg
                    width="40"
                    height="40"
                    className="w-10 h-10 flex-shrink-0 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 title-font">
                  Thank You!
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Your message has been sent successfully. We&apos;ll get back to
                  you soon.
                </p>
                <button
                  onClick={() => setSubmitStatus("idle")}
                  className={cn(
                    "px-8 py-3.5 rounded-xl text-sm font-semibold",
                    "bg-gradient-to-r from-gray-900 to-gray-800 text-white",
                    "hover:from-orange-500 hover:to-orange-600",
                    "transition-all duration-300 shadow-lg shadow-gray-900/20"
                  )}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Email row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelClasses}>
                      Name <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        errors.name
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:border-orange-500"
                      )}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClasses}>
                      Email <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        errors.email
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:border-orange-500"
                      )}
                      placeholder="john@company.com"
                    />
                    {errors.email && (
                      <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Company & Subject row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="company" className={labelClasses}>
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formState.company}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        "border-gray-200 dark:border-gray-700 focus:border-orange-500"
                      )}
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className={labelClasses}>
                      Subject <span className="text-orange-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={cn(
                        inputClasses,
                        errors.subject
                          ? "border-red-300 focus:border-red-500"
                          : "border-gray-200 dark:border-gray-700 focus:border-orange-500"
                      )}
                      placeholder="How can we help?"
                    />
                    {errors.subject && (
                      <p className="mt-2 text-sm text-red-600">{errors.subject}</p>
                    )}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className={labelClasses}>
                    Message <span className="text-orange-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    className={cn(
                      inputClasses,
                      "resize-none",
                      errors.message
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 dark:border-gray-700 focus:border-orange-500"
                    )}
                    placeholder="Tell us about your project..."
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                {/* Error message */}
                {submitStatus === "error" && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <p className="text-sm text-red-600 dark:text-red-400">
                      There was an error sending your message. Please try again
                      later.
                    </p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "w-full px-8 py-4 rounded-xl text-base font-semibold",
                    "bg-gradient-to-r from-gray-900 to-gray-800 text-white",
                    "hover:from-orange-500 hover:to-orange-600",
                    "transition-all duration-300 shadow-lg shadow-gray-900/20",
                    "hover:shadow-orange-500/25 hover:-translate-y-0.5",
                    isSubmitting && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg width="20" height="20" className="animate-spin w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
};
