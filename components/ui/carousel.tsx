"use client";

import * as React from "react";

type CarouselProps = {
  orientation?: "horizontal" | "vertical";
  autoplaySpeed?: number; // Controls animation duration
};

type CarouselContextProps = {
  orientation?: "horizontal" | "vertical";
  autoplaySpeed?: number;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      className,
      children,
      autoplaySpeed = 30000, // Default to 30 seconds for a full cycle
      ...props
    },
    ref
  ) => {
    return (
      <CarouselContext.Provider
        value={{
          orientation,
          autoplaySpeed,
        }}
      >
        <div
          ref={ref}
          className={`w-full overflow-hidden ${className || ""}`}
          role="region"
          aria-roledescription="marquee"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation, autoplaySpeed } = useCarousel();

  // Create a unique ID for the animation
  const animationId = React.useId().replace(/:/g, "");
  const isHorizontal = orientation === "horizontal";

  // Define the animation style
  const animationStyle = `
    @keyframes scroll-${animationId} {
      from {
        transform: ${isHorizontal ? "translateX(0)" : "translateY(0)"};
      }
      to {
        transform: ${
          isHorizontal ? "translateX(calc(-50%))" : "translateY(calc(-50%))"
        };
      }
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: animationStyle }} />
      <div className="w-full overflow-hidden">
        <div
          ref={ref}
          className={`flex ${isHorizontal ? "flex-row" : "flex-col"} ${
            className || ""
          }`}
          style={{
            animation: `scroll-${animationId} ${autoplaySpeed}ms linear infinite`,
            width: isHorizontal ? "fit-content" : "100%",
            height: isHorizontal ? "100%" : "fit-content",
          }}
          {...props}
        />
      </div>
    </>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={`shrink-0 ${orientation === "horizontal" ? "px-2" : "py-2"} ${
        className || ""
      }`}
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

export { type CarouselProps, Carousel, CarouselContent, CarouselItem };
