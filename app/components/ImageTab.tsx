"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const ImageTab = () => {
  const boxRef1 = useRef(null);

  useEffect(() => {
    gsap.to(boxRef1.current, {
      rotationX: 0,
      scrollTrigger: {
        trigger: boxRef1.current,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="w-full px-4 md:px-10 mt-16 mb-20 flex justify-center">
      <div
        ref={boxRef1}
        className="outer-boundary w-full max-w-5xl h-[450px] sm:h-[700px] md:h-[800px] lg:h-[900px] overflow-hidden rounded-3xl bg-gray-700 p-2 md:p-6 shadow-[0_20px_60px_rgba(59,130,246,0.3)]"
        style={{
          transform: 'perspective(800px) rotateX(15deg)',
        }}
      >
        <div className="inner-boundary w-full h-full rounded-2xl bg-white overflow-hidden flex justify-center items-start">
          <Image
            src="/Invoice.jpg"
            alt="Invoice Image"
            width={1000}
            height={1000}
            className="w-full h-auto object-contain rounded-xl"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default ImageTab;