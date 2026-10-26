import React, { useEffect, useRef } from "react";

export function ScrollProgress() {
  const progressRef = useRef(null);

  useEffect(() => {
    let animationFrame = 0;

    function updateProgress() {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const scrollableHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress =
          scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;

        progressRef.current?.style.setProperty(
          "--scroll-progress",
          String(Math.min(Math.max(progress, 0), 1)),
        );
      });
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return <div className="scroll-progress" ref={progressRef} aria-hidden="true" />;
}
