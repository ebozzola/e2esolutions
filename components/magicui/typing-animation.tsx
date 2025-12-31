"use client";

import { cn } from "@/lib/utils";

/**
 * Props for the TypingAnimation component
 */
interface TypingAnimationProps {
  /** The text content to display */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Duration parameter (kept for API compatibility) */
  duration?: number;
  /** Delay parameter (kept for API compatibility) */
  delay?: number;
}

/**
 * TypingAnimation component
 *
 * Note: This component previously implemented a character-by-character typing animation,
 * but has been modified to display text normally without animation.
 * The props interface is maintained for compatibility with existing code.
 */
export function TypingAnimation({
  children,
  className,
}: TypingAnimationProps) {
  // Directly render the full text without animation
  return (
    <span
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className
      )}
    >
      {children}
    </span>
  );
}
