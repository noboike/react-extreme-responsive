"use client";
import { useLayoutEffect, useMemo, useRef, useState } from "react";

interface ExtremeResponsiveProps {
  children: React.ReactNode;
  minWidth: number;
}

export function ExtremeResponsive({
  children,
  minWidth,
}: ExtremeResponsiveProps) {
  const devRef = useRef(null);
  const [scaleRatio, setScaleRatio] = useState(1);
  const [isHidden, setIsHidden] = useState(true);
  const handleLayOut = useMemo(() => {
    return () => {
      setTimeout(() => {
        setIsHidden(false);
      }, 0);
      function scale() {
        let ratio = innerWidth / minWidth;
        ratio = ratio > 1 ? 1 : ratio;
        setScaleRatio(ratio);
      }
      const observer = new ResizeObserver(() => {
        scale();
      });
      scale();
      if (devRef.current) observer.observe(devRef.current);
    };
  }, [minWidth]);
  useLayoutEffect(handleLayOut, [minWidth]);
  return (
    <div
      ref={devRef}
      style={{
        transform: `translate(-50%, -50%) scale(${scaleRatio})`,
        width: `${100 * (scaleRatio < 1 ? minWidth / innerWidth : 1)}%`,
        height: `${100 * (scaleRatio < 1 ? minWidth / innerWidth : 1)}%`,
        position: "relative",
        left: "50%",
        top: "50%",
        transition: "0s",
      }}
    >
      {children}
    </div>
  );
}
