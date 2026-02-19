"use client";
import React, { useRef } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce(
      (acc, breakpoint, index) => {
        const distance = Math.abs(latest - breakpoint);
        if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
          return index;
        }
        return acc;
      },
      0,
    );
    setActiveCard(closestBreakpointIndex);
  });

  // Border glow colors for each card
  const borderColors = [
    "shadow-red-500/20 border-red-500/30",
    "shadow-amber-500/20 border-amber-500/30",
    "shadow-cyan-500/20 border-cyan-500/30",
    "shadow-violet-500/20 border-violet-500/30",
  ];

  return (
    <div
      className="relative w-full h-[40rem] overflow-y-auto rounded-3xl border border-white/[0.06] bg-zinc-950/60 backdrop-blur-xl p-6 md:p-10 scrollbar-hide"
      ref={ref}
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {/* Subtle inner glow */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.03] via-transparent to-transparent" />

      <div className="relative flex w-full justify-center gap-10 lg:gap-20">
        {/* Left - Text Content */}
        <div className="relative flex items-start w-full lg:w-1/2">
          <div className="max-w-xl">
            {content.map((item, index) => (
              <div key={item.title + index} className="my-20 first:mt-0">
                <motion.h2
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.2,
                    x: activeCard === index ? 0 : -10,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="text-2xl font-bold text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-space-grotesk), sans-serif' }}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCard === index ? 1 : 0.15,
                  }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: 0.1 }}
                  className="text-base mt-6 max-w-md text-zinc-400 leading-relaxed"
                >
                  {item.description}
                </motion.p>

                {/* Progress indicator */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{
                    scaleX: activeCard === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="h-0.5 w-12 mt-6 bg-gradient-to-r from-violet-500 to-cyan-500 origin-left rounded-full"
                />
              </div>
            ))}
            <div className="h-48" />
          </div>
        </div>

        {/* Right - Sticky Preview */}
        <div className="hidden lg:flex items-start w-1/2 justify-end">
          <div
            className={cn(
              "sticky top-10 overflow-hidden rounded-2xl",
              "border bg-zinc-950/80 backdrop-blur-sm",
              "transition-all duration-500 ease-out",
              "shadow-2xl",
              borderColors[activeCard % borderColors.length],
              contentClassName,
            )}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full"
              >
                {content[activeCard].content ?? null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Side indicator dots */}
      <div className="hidden lg:flex flex-col items-center justify-center gap-3 absolute right-5 top-1/2 -translate-y-1/2 z-30">
        {content.map((_, index) => (
          <motion.div
            key={index}
            animate={{
              scale: activeCard === index ? 1.2 : 1,
              opacity: activeCard === index ? 1 : 0.3,
            }}
            transition={{ duration: 0.2 }}
            className={cn(
              "w-2 h-2 rounded-full transition-colors duration-300",
              activeCard === index
                ? ["bg-red-400", "bg-amber-400", "bg-cyan-400", "bg-violet-400"][index]
                : "bg-zinc-600"
            )}
          />
        ))}
      </div>
    </div>
  );
};
