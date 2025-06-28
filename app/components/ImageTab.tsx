"use client";

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    <div className='w-full mt-15 flex justify-center'>
        <div ref={boxRef1} className="outer-boundary animate h-[800px] w-4/6 border rounded-3xl bg-gray-600 p-2 [transform:perspective(800px)_rotateX(15deg)] shadow-2xl shadow-blue-500">
            <div className="inner-boundary h-full w-full border rounded-3xl bg-white">
                <div className="image"></div>
            </div>
        </div>
    </div>
  )
}

export default ImageTab