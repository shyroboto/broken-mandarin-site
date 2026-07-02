"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export default function Artwork3D() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rx = (e.clientY / window.innerHeight - 0.5) * -24;
        const ry = (e.clientX / window.innerWidth - 0.5) * 24;
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scene" aria-hidden="true">
      <div className="float">
        <div ref={tiltRef} className="tilt">
          <div className="artwork">
            <Image
              src="/shot-orange.jpg"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 70vw, 45vw"
              className="artwork__img"
            />
            <div className="artwork__ghost artwork__ghost--red" />
            <div className="artwork__ghost artwork__ghost--cyan" />
          </div>
        </div>
      </div>
    </div>
  );
}
