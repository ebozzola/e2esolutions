"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { ElementType } from "react";

/**
 * Props for the TypingAnimation component
 * @interface TypingAnimationProps
 * @extends MotionProps - Framer Motion props
 */
interface TypingAnimationProps extends MotionProps {
  /** The text content to display */
  children: string;
  /** Additional CSS classes */
  className?: string;
  /** Duration parameter (kept for API compatibility) */
  duration?: number;
  /** Delay parameter (kept for API compatibility) */
  delay?: number;
  /** HTML element type to render as */
  as?: ElementType;
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
  duration = 100,
  delay = 0,
  as: Component = "div",
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  // Directly render the full text without animation
  return (
    <MotionComponent
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className
      )}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
