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

  const socialIconClasses =
    "h-5 w-5 transition-all duration-300 hover:scale-110";

  return (
    <footer className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-700/20 rounded-full blur-3xl" />
      </div>

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-orange-500 to-transparent" />

      <Container size="large" className="relative z-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-3 group mb-6"
            >
              <Icon
                parentColor={footer.color ?? undefined}
                data={{
                  name: "E2ELogo",
                  color: "orange",
                  style: globalSettings?.header?.icon?.style ?? undefined,
                  size: "medium",
                }}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-2xl font-bold tracking-tight title-font">
                E2E Solutions
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Providing comprehensive operational solutions to empower your
              business growth. End-to-end supply chain expertise.
            </p>

            {/* Social Links */}
            <div className="flex gap-3">
              {footer.social?.facebook && (
                <a
                  href={footer.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <FaFacebookF className={socialIconClasses} />
                </a>
              )}
              {footer.social?.twitter && (
                <a
                  href={footer.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <FaXTwitter className={socialIconClasses} />
                </a>
              )}
              {footer.social?.instagram && (
                <a
                  href={footer.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <AiFillInstagram className={socialIconClasses} />
                </a>
              )}
              {footer.social?.linkedIn && (
                <a
                  href={footer.social.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <FaLinkedin className={socialIconClasses} />
                </a>
              )}
              {footer.social?.github && (
                <a
                  href={footer.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <FaGithub className={socialIconClasses} />
                </a>
              )}
              {footer.social?.youtube && (
                <a
                  href={footer.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-orange-500 flex items-center justify-center transition-all duration-300"
                >
                  <FaYoutube className={socialIconClasses} />
                </a>
              )}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-orange-400 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/about", label: "About Us" },
                { href: "/our-team", label: "Our Team" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-orange-400 mb-6">
              Solutions
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/services", label: "Services" },
                { href: "/areas-of-excellence", label: "Areas of Excellence" },
                { href: "/case-studies", label: "Case Studies" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-300 text-sm hover-underline inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-orange-400 mb-6">
              Get in Touch
            </h3>
            <div className="space-y-4">
              <p className="text-gray-400 text-sm">
                Ready to optimize your supply chain?
              </p>
              <Link
                href="/contact"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold",
                  "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700",
                  "text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40",
                  "transition-all duration-300 hover:-translate-y-0.5"
                )}
              >
                Contact Us
                <svg
                  width="16"
                  height="16"
                  className="w-4 h-4 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} E2E Solutions. All rights
              reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
