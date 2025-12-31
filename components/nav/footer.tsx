"use client";
import React from "react";
import { cn } from "../../lib/utils";
import { Container } from "../layout/container";
import Link from "next/link";
import { Icon } from "../icon";
import {
  FaFacebookF,
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { useLayout } from "../layout/layout-context";

export default function Footer() {
  const { theme, globalSettings } = useLayout();
  const footer = globalSettings?.footer;

  if (!footer || !theme) return null;

  const socialIconClasses = "h-5 w-auto transition-colors duration-200";
  const socialIconColorClasses = {
    blue: "text-blue-500 dark:text-blue-400 hover:text-blue-300",
    teal: "text-teal-500 dark:text-teal-400 hover:text-teal-300",
    green: "text-green-500 dark:text-green-400 hover:text-green-300",
    red: "text-red-500 dark:text-red-400 hover:text-red-300",
    pink: "text-pink-500 dark:text-pink-400 hover:text-pink-300",
    purple: "text-purple-500 dark:text-purple-400 hover:text-purple-300",
    orange: "text-orange-500 dark:text-orange-400 hover:text-orange-300",
    yellow: "text-yellow-500 dark:text-yellow-400 hover:text-yellow-300",
    primary: "text-white opacity-80 hover:opacity-100",
  };

  const footerColor = {
    default:
      "bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-200",
    primary: {
      blue: "bg-gradient-to-br from-blue-600 to-blue-800 text-white",
      teal: "bg-gradient-to-br from-teal-600 to-teal-800 text-white",
      green: "bg-gradient-to-br from-green-600 to-green-800 text-white",
      red: "bg-gradient-to-br from-red-600 to-red-800 text-white",
      pink: "bg-gradient-to-br from-pink-600 to-pink-800 text-white",
      purple: "bg-gradient-to-br from-purple-600 to-purple-800 text-white",
      orange: "bg-gradient-to-br from-orange-600 to-orange-800 text-white",
      yellow: "bg-gradient-to-br from-yellow-600 to-yellow-800 text-white",
    },
  };

  const footerColorCss =
    theme.darkMode === "primary"
      ? footerColor.primary[theme.color as keyof typeof footerColor.primary]
      : footerColor.default;

  return (
    <footer className={cn(`py-12 md:py-16`, footerColorCss)}>
      <Container size="small">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3">
              <Icon
                parentColor={footer.color ?? undefined}
                data={{
                  name: "E2ELogo",
                  color:
                    theme.color === "primary"
                      ? "primary"
                      : globalSettings?.header?.icon?.color ?? undefined,
                  style: globalSettings?.header?.icon?.style ?? undefined,
                  size: "medium",
                }}
              />
              <span className="text-2xl font-bold tracking-tight">
                E2E Solutions
              </span>
            </Link>
            <p className="text-sm opacity-80 mt-4">
              Providing comprehensive operational solutions to empower your
              business growth.
            </p>
            <div className="flex gap-4 pt-4">
              {footer.social?.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="opacity-80 hover:opacity-100 transition-opacity"
                >
                  <FaFacebookF
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
              {footer.social && footer.social.twitter && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={footer.social.twitter}
                  target="_blank"
                >
                  <FaXTwitter
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
              {footer.social && footer.social.instagram && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={footer.social.instagram}
                  target="_blank"
                >
                  <AiFillInstagram
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
              {footer.social && footer.social.linkedIn && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={footer.social.linkedIn}
                  target="_blank"
                >
                  <FaLinkedin
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
              {footer.social && footer.social.github && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={footer.social.github}
                  target="_blank"
                >
                  <FaGithub
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
              {footer.social && footer.social.youtube && (
                <a
                  className="inline-block opacity-80 hover:opacity-100 transition ease-out duration-150"
                  href={footer.social.youtube}
                  target="_blank"
                >
                  <FaYoutube
                    className={`${socialIconClasses} ${
                      socialIconColorClasses[
                        (footer.color === "primary" ? "primary" : theme.color) as keyof typeof socialIconColorClasses
                      ]
                    }`}
                  />
                </a>
              )}
            </div>
          </div>
          {/* Company Links Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/our-team"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Solutions Section */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/areas-of-excellence"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Areas of Excellence
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/case-studies"
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                >
                  Case Studies
                </Link>
              </li> */}
            </ul>
          </div>
          {/* Newsletter Section 
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
            <p className="text-sm opacity-80 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-md bg-black/10 dark:bg-white/5 border border-gray-300/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-current text-sm placeholder-gray-500 dark:placeholder-gray-400"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 rounded-md transition-colors duration-200 text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
          */}
        </div>
        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-black/10 dark:border-white/10">
          <div className="flex justify-center">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} E2E Solutions. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
