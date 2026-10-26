import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { ScrollProgress } from "./components/ScrollProgress.jsx";
import { servicePages } from "./service-content.js";
import { trackEvent } from "./analytics.js";
import "./styles.css";

const WHATSAPP_URL = "https://wa.me/919456853697";
const root = document.getElementById("service-page-root");
const service = servicePages.find(
  (page) => page.id === root?.dataset.service,
);

if (!root || !service) {
  throw new Error("Service page content is missing or invalid.");
}

const relatedServices = servicePages.filter((page) => page.id !== service.id);

function useInView() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
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
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function Reveal({
  as: Element = "div",
  className = "",
  delay = 0,
  children,
  ...props
}) {
  const [ref, isVisible] = useInView();

  return (
    <Element
      {...props}
      ref={ref}
      className={`${className} motion-reveal${isVisible ? " is-visible" : ""}`}
      style={{ "--reveal-delay": `${delay}s` }}
    >
      {children}
    </Element>
  );
}

function whatsappLink() {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(service.message)}`;
}

function ServicePage() {
  const [savedTheme, setSavedTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem("digiclave-theme");
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const isDark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemPreference = (event) => {
      setSystemPrefersDark(event.matches);
    };

    preference.addEventListener("change", updateSystemPreference);
    return () => preference.removeEventListener("change", updateSystemPreference);
  }, []);

  useEffect(() => {
    if (savedTheme) {
      document.documentElement.dataset.theme = savedTheme;
      window.localStorage.setItem("digiclave-theme", savedTheme);
    } else {
      delete document.documentElement.dataset.theme;
      window.localStorage.removeItem("digiclave-theme");
    }
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", isDark ? "#101B28" : "#F7FAFD");
  }, [isDark, savedTheme]);

  return (
    <>
      <ScrollProgress />
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <div className="container service-header-inner">
          <a className="brand" href="/" aria-label="DigiClave Technologies, home">
            <span className="brand-mark">
              <img src="/digiclave-logo.jpeg" alt="" />
            </span>
            <span className="brand-name">
              DigiClave<span>Technologies</span>
            </span>
          </a>
          <nav className="service-header-navigation" aria-label="Service navigation">
            <a href="/">Home</a>
            <a href="/#services">All services</a>
            <button
              className="theme-toggle"
              type="button"
              aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
              onClick={() => setSavedTheme(isDark ? "light" : "dark")}
            >
              <span aria-hidden="true">{isDark ? "☾" : "☼"}</span>
              <span>{isDark ? "Light mode" : "Dark mode"}</span>
            </button>
            <a className="button button--small button--dark" href="/#contact">
              Contact us
            </a>
          </nav>
        </div>
      </header>
      <main id="main-content" className="service-page">
        <section className="service-page-hero">
          <div className="container">
            <p className="eyebrow">Worldwide service · {service.number}</p>
            <h1>{service.headline}</h1>
            <p className="service-page-intro">{service.introduction}</p>
            <div className="service-page-actions">
              <a
                className="button button--teal"
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                aria-label={`Discuss ${service.title} on WhatsApp (opens in a new tab)`}
                onClick={() =>
                  trackEvent("whatsapp_click", {
                    placement: "service_page",
                    service_id: service.id,
                  })
                }
              >
                Discuss this service <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="/#work">See a website project</a>
            </div>
          </div>
        </section>
        <section className="section service-page-body">
          <div className="container">
            <Reveal className="service-page-columns">
              <div>
                <p className="eyebrow">How we can help</p>
                <h2>A useful scope, shaped around your needs.</h2>
                <p className="service-page-copy">{service.description}</p>
              </div>
              <ul className="service-page-list">
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="service-approach">
              <p className="eyebrow">A clear approach</p>
              <div className="service-approach-grid">
                {service.approach.map((step, index) => (
                  <article
                    className="service-approach-step"
                    key={step}
                    style={{ "--reveal-delay": `${index * 0.1}s` }}
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{step}</p>
                  </article>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
        <Reveal as="section" className="service-related">
          <div className="container service-related-inner">
            <div>
              <p className="eyebrow">Explore more</p>
              <h2>Other ways we can help.</h2>
            </div>
            <nav className="service-related-links" aria-label="Other services">
              {relatedServices.map((related) => (
                <a href={related.path} key={related.id}>
                  {related.navigationTitle} <span aria-hidden="true">↗</span>
                </a>
              ))}
            </nav>
          </div>
        </Reveal>
      </main>
      <footer className="site-footer service-page-footer">
        <div className="container service-footer-inner">
          <a className="brand brand--footer" href="/">
            <span className="brand-name">DigiClave Technologies</span>
          </a>
          <p>Clear digital work, built together.</p>
          <a href="/#privacy">Privacy</a>
          <a href="/">Back to home</a>
        </div>
      </footer>
    </>
  );
}

createRoot(root).render(<ServicePage />);
