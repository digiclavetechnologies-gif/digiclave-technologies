import React, { Fragment, useEffect, useRef, useState } from "react";

export function TextReveal({
  text,
  as: Element = "span",
  splitBy = "words",
  staggerDelay = 0.035,
  duration = 0.5,
  once = true,
  className = "",
}) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return undefined;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  const segments =
    splitBy === "characters"
      ? Array.from(text)
      : text.split(/(\s+)/);
  let revealIndex = 0;

  return (
    <Element
      ref={elementRef}
      className={`text-reveal${isVisible ? " is-visible" : ""}${className ? ` ${className}` : ""}`}
      aria-label={text}
    >
      {segments.map((segment, index) => {
        if (segment.includes("\n")) {
          return <br key={`${index}-break`} />;
        }

        if (/^\s+$/.test(segment)) {
          return <Fragment key={`${index}-space`}>{segment}</Fragment>;
        }

        const currentIndex = revealIndex++;
        return (
          <span
            aria-hidden="true"
            className="text-reveal__word"
            key={`${index}-${segment}`}
            style={{
              "--reveal-delay": `${currentIndex * staggerDelay}s`,
              "--reveal-duration": `${duration}s`,
            }}
          >
            {segment}
          </span>
        );
      })}
    </Element>
  );
}
