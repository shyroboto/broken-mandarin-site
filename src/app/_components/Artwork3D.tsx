"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export default function Artwork3D() {
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    let raf = 0;
    let touching = false;
    let baseBeta: number | null = null;
    let baseGamma: number | null = null;

    const setTilt = (rx: number, ry: number) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--ry", `${ry.toFixed(2)}deg`);
      });
    };

    // Desktop — cursor parallax (±12°)
    const onMouse = (e: MouseEvent) => {
      if (touching) return;
      const rx = (e.clientY / window.innerHeight - 0.5) * -24;
      const ry = (e.clientX / window.innerWidth - 0.5) * 24;
      setTilt(rx, ry);
    };

    // Mobile — tap-and-hold: finger position mimics the desktop cursor,
    // exaggerated vs. desktop so the reaction is obvious on a small screen
    const TOUCH_TILT = 40;
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (!t) return;
      touching = true;
      const rx = (t.clientY / window.innerHeight - 0.5) * -TOUCH_TILT;
      const ry = (t.clientX / window.innerWidth - 0.5) * TOUCH_TILT;
      setTilt(rx, ry);
    };
    const onTouchEnd = () => {
      touching = false;
      // Re-baseline the gyroscope so it resumes from the current pose
      baseBeta = null;
      baseGamma = null;
      setTilt(0, 0);
    };

    // Mobile (non-iOS) — gyroscope, exaggerated. Relative to the pose the
    // device was in on first reading, so however you hold it is "neutral".
    const GYRO_GAIN = 2.6;
    const GYRO_MAX = 38;
    const onOrient = (e: DeviceOrientationEvent) => {
      if (touching || e.beta == null || e.gamma == null) return;
      if (baseBeta == null || baseGamma == null) {
        baseBeta = e.beta;
        baseGamma = e.gamma;
        return;
      }
      const rx = clamp(-(e.beta - baseBeta) * GYRO_GAIN, -GYRO_MAX, GYRO_MAX);
      const ry = clamp((e.gamma - baseGamma) * GYRO_GAIN, -GYRO_MAX, GYRO_MAX);
      setTilt(rx, ry);
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);

    // Attach the gyroscope only where no permission prompt is required.
    // iOS 13+ exposes DeviceOrientationEvent.requestPermission — its presence
    // is a reliable iOS signal, so we skip gyroscope there entirely (no prompt).
    const DOE = window.DeviceOrientationEvent as
      | { requestPermission?: () => Promise<PermissionState> }
      | undefined;
    const isIOS = typeof DOE?.requestPermission === "function";
    if (typeof window.DeviceOrientationEvent !== "undefined" && !isIOS) {
      window.addEventListener("deviceorientation", onOrient);
    }

    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      window.removeEventListener("deviceorientation", onOrient);
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
