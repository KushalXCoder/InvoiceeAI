"use client";
import { useEffect, useRef, useState } from "react";
import { BentoGridItem } from "./ui/BentoGrid";
import {
  IconArrowWaveRightUp,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconLock,
} from "@tabler/icons-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const Uses = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [cursor, setCursor] = useState<boolean>(false);
  const spanRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states before any animation
      cardsRef.current.forEach((card, i) => {
        gsap.set(card, {
          opacity: 0,
          y: 100,
          x: i % 2 === 0 ? -50 : 50,
          scale: 0.8,
        });
      });
      gsap.set(spanRef.current, { filter: "blur(0px)" }); // Initial blur state

      // Scroll animation for cards
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom bottom",
          scrub: 3,
          pin: false,
          anticipatePin: 1,
          markers: process.env.NODE_ENV === "development" ? true : false,
        },
      });

      cardsRef.current.forEach((card, i) => {
        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          i * 0.3
        );
      });

      // Blur animation for the span
      const animateBlur = (toBlur) => {
        gsap.to(spanRef.current, {
          filter: toBlur ? "blur(0px)" : "blur(24px)",
          duration: 0.5,
          ease: "power2.out",
        });
      };

      // Event listeners for span animation
      spanRef.current.addEventListener("mouseenter", () => {
        setCursor(true);
        animateBlur(true);
      });
      spanRef.current.addEventListener("mouseleave", () => {
        setCursor(false);
        animateBlur(false);
      });
    }, [sectionRef, spanRef]);

    return () => ctx.revert();
  }, []);

  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100" />
  );

  const items = [
    {
      title: "Instant Invoice Generation",
      description: "Create invoices in seconds by describing your purchase — no manual entry needed.",
      header: <Skeleton />,
      icon: <IconClipboardCopy className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "AI-Powered Accuracy",
      description: "Leverage Gemini AI to extract item names, prices, and totals with precision.",
      header: <Skeleton />,
      icon: <IconFileBroken className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Minimal Design, Maximum Impact",
      description: "A sleek UI that makes invoice generation modern and effortless.",
      header: <Skeleton />,
      icon: <IconSignature className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Secure & Private",
      description: "Your invoice data stays on your device — nothing is stored or shared.",
      header: <Skeleton />,
      icon: <IconLock className="h-6 w-6 text-blue-600" />,
    },
    {
      title: "Built for Everyone",
      description: "Whether you’re a kirana store or a restaurant — InvoiceeZ fits your needs.",
      header: <Skeleton />,
      icon: <IconArrowWaveRightUp className="h-6 w-6 text-blue-600" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full bg-white flex flex-col justify-center items-center overflow-hidden"
    >
      <h1 className="font-poppins text-4xl mb-15">
        Why{" "}
        <span
          ref={spanRef}
          className="border px-3 py-1 rounded-lg font-bold border-blue-950" // Removed conditional blur-xl
          onMouseEnter={() => setCursor(true)}
          onMouseLeave={() => setCursor(false)}
        >
          InvoiceeAI
        </span>{" "}
        ?
      </h1>
      <div className="grid w-full max-w-[1300px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
        {items.map((item, i) => (
          <div
            key={i}
            className={`bento-card ${i === 3 || i === 6 ? "sm:col-span-2" : ""}`}
            style={{ minHeight: "14rem" }}
            ref={(el) => (cardsRef.current[i] = el)}
          >
            <BentoGridItem
              title={item.title}
              description={item.description}
              header={item.header}
              icon={item.icon}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Uses;