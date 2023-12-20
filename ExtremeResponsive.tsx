import { ReactNode, useLayoutEffect, useRef, useState } from "react";

interface ExtremeResponsiveProps {
  children: ReactNode;
  minWidth: number;
}

export function ExtremeResponsive({
  children,
  minWidth,
}: ExtremeResponsiveProps) {
  const devRef = useRef(null);
  const [scaleRatio, setScaleRatio] = useState(1);
  function handleLayOut() {
    const observer = new ResizeObserver(() => {
      let ratio = innerWidth / minWidth;
      ratio = ratio > 1 ? 1 : ratio;
      setScaleRatio(ratio);
    });
    if (devRef.current) observer.observe(devRef.current);
  }
  useLayoutEffect(handleLayOut, []);
  return (
    <div
      ref={devRef}
      style={{
        transform: `translate(-50%, -50%) scale(${scaleRatio})`,
        width: `${100 * (scaleRatio < 1 ? minWidth / innerWidth : 1)}%`,
        height: `${100 * (scaleRatio < 1 ? minWidth / innerWidth : 1)}%`,
        position: "absolute",
        left: "50%",
        top: "50%",
      }}
    >
      {children}
    </div>
  );
}
