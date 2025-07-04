"use client";
import { cn } from "@/lib/utils/utils";
import { motion } from "framer-motion"; // corrected: `motion/react` is wrong
import React from "react";

export const Meteors = ({
  number,
  className,
}: {
  number?: number;
  className?: string;
}) => {
  const meteors = new Array(number || 20).fill(true);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 pointer-events-none z-0" // this makes it cover the whole page
    >
      {meteors.map((_, idx) => {
        const meteorCount = number || 20;
        const position = idx * (window.innerWidth / meteorCount); // Spread across full width

        return (
          <span
            key={"meteor" + idx}
            className={cn(
              "absolute h-0.5 w-0.5 rotate-[45deg] rounded-full bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
              "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
              "animate-meteor-effect",
              className,
            )}
            style={{
              top: "-40px",
              left: `${position}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.floor(Math.random() * (10 - 5) + 5)}s`,
            }}
          />
        );
      })}
    </motion.div>
  );
};