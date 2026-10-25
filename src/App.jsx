import React, { useEffect, useRef, useState } from "react";
import { TextReveal } from "./components/TextReveal.jsx";

const WHATSAPP_URL = "https://wa.me/919456853697";
const EMAIL = "digiclavetechnologies@gmail.com";
const PRECISE_LEARNING_URL = "https://precise-learning-burari-mu.vercel.app/";

const services = [
  {
    number: "01",
    id: "web-development",
    title: "Web development",
    description:
      "Clear, responsive websites that give your business a confident place to grow online.",
    items: [
      "Business and portfolio websites",
      "Landing pages and e-commerce",
      "Redesign, maintenance and support",
    ],
    message: "Hi DigiClave Technologies! I'd like to discuss a website project.",
  },
  {
    number: "02",
    id: "ai-automation",
    title: "AI automation",
    description:
      "Thoughtful automations that reduce repetitive work and help everyday processes run smoothly.",
    items: [
      "Workflow and task automation",
      "Lead capture and follow-up",
      "Third-party app integrations",
    ],
    message: "Hi DigiClave Technologies! I'd like to discuss AI automation.",
  },
  {
    number: "03",
    id: "ai-assistants",
    title: "AI assistants",
    description:
      "Helpful conversational tools that can answer questions, qualify leads, and support your team.",
    items: [
      "Website chatbots",
      "Automated FAQ responses",
      "Lead qualification workflows",
    ],
    message: "Hi DigiClave Technologies! I'd like to explore AI solutions.",
  },
  {
    number: "04",
    id: "google-business-profile-seo",
    title: "Google Business Profile & SEO",
    description:
      "Set up your local search presence and make it easier for nearby customers to find your business online.",
    items: [
      "Google Business Profile setup",
      "Local SEO foundations",
      "On-page SEO improvements",
    ],
    message:
      "Hi DigiClave Technologies! I'd like help with Google Business Profile setup and SEO.",
  },
];

const projects = [
  {
    number: "01",
    category: "Live project · Web development",
    title: "Precise Learning",
    kind: "Tuition website · Classes 6–12 · Burari, Delhi",
    href: PRECISE_LEARNING_URL,
  },
];

const processSteps = [
  ["01", "Discover", "We listen and learn about your business, goals, and requirements."],
  ["02", "Plan", "Together, we define the scope, design direction, and approach."],
  ["03", "Build", "We create the website or automation, then test how it works."],
  ["04", "Launch", "We hand over the project and discuss support where it’s useful."],
];

const faqs = [
  {
    question: "What services does DigiClave Technologies provide?",
    answer:
      "We build business websites, provide Google Business Profile setup and SEO, and work on practical workflow automation and AI-powered assistants.",
  },
  {
    question: "Can you build a website from scratch?",
    answer:
      "Yes. We can shape a project from its goals and structure through design, development, testing, and handover.",
  },
  {
    question: "Can you automate our existing business workflows?",
    answer:
      "Often, yes. We first learn how your current process works, then discuss which parts are suitable to automate and what tools are involved.",
  },
  {
    question: "Can you set up a Google Business Profile or help with SEO?",
    answer:
      "Yes. We can help set up a Google Business Profile and work on local and on-page SEO foundations. Search rankings and business results depend on many factors and aren't guaranteed.",
  },
  {
    question: "How can I discuss my project and get a quote?",
    answer:
      "Send us a short description through WhatsApp or email. We’ll ask about the scope and requirements before discussing an estimate.",
  },
  {
    question: "How long will a typical project take?",
    answer:
      "Timing depends on the project’s scope, content, feedback, and integrations. We’ll agree on a realistic timeline after understanding the details.",
  },
  {
    question: "Do you offer website maintenance or ongoing support?",
    answer:
      "Support options can be discussed when we define the project. We’ll be clear about what is included in the initial handover and any ongoing work.",
  },
];

function whatsappLink(message) {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`;
}

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
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, isVisible];
}

function RevealItem({
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

function WordRotator() {
  const words = ["Web development", "Local SEO", "AI automation"];
  const [activeWord, setActiveWord] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let interval;

    function syncRotation() {
      window.clearInterval(interval);
      if (motionPreference.matches) return;

      interval = window.setInterval(() => {
        setActiveWord((index) => (index + 1) % words.length);
      }, 2600);
    }

    syncRotation();
    motionPreference.addEventListener("change", syncRotation);
    return () => {
      window.clearInterval(interval);
      motionPreference.removeEventListener("change", syncRotation);
    };
  }, []);

  return (
    <p className="eyebrow eyebrow--hero hero-service-rotator">
      <span className="sr-only">
        Web development, local SEO, and AI automation
      </span>
      <span key={words[activeWord]} aria-hidden="true">
        {words[activeWord]}
      </span>
    </p>
  );
}

function CountUp({ value, label }) {
  const [ref, isVisible] = useInView();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(value);
      return undefined;
    }

    let animationFrame;
    const startTime = performance.now();
    const duration = 900;

    function updateCount(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const easedProgress = 1 - (1 - progress) ** 3;
      setCount(Math.round(value * easedProgress));
      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(updateCount);
      }
    }

    animationFrame = window.requestAnimationFrame(updateCount);
    return () => window.cancelAnimationFrame(animationFrame);
  }, [isVisible, value]);

  return (
    <div className="studio-stat" ref={ref} role="group" aria-label={`${value} ${label}`}>
      <span className="studio-stat-value" aria-hidden="true">
        {count.toLocaleString()}
      </span>
      <span className="studio-stat-label" aria-hidden="true">{label}</span>
    </div>
  );
}

function BrandMark({ footer = false }) {
  return (
    <a
      className={`brand${footer ? " brand--footer" : ""}`}
      href="#home"
      aria-label="DigiClave Technologies, home"
    >
      <span className="brand-mark">
        <img src="/digiclave-logo.jpeg" alt="" />
      </span>
      <span className="brand-name">
        DigiClave<span>Technologies</span>
      </span>
    </a>
  );
}

function ArrowIcon({ diagonal = false }) {
  return (
    <svg
      aria-hidden="true"
      className="arrow-icon"
      viewBox="0 0 16 16"
      fill="none"
    >
      {diagonal ? (
        <path d="M4 12 12 4M5 4h7v7" />
      ) : (
        <path d="M2.5 8h10m-4-4 4 4-4 4" />
      )}
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="whatsapp-icon"
      viewBox="0 0 32 32"
      fill="none"
    >
      <path
        d="M16 3.25A12.45 12.45 0 0 0 5.27 22.01L3.5 28.5l6.65-1.74A12.5 12.5 0 1 0 16 3.25Z"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
      <path
        d="M12.04 10.56c-.25-.56-.52-.57-.76-.58h-.65c-.23 0-.61.09-.93.44-.32.35-1.22 1.19-1.22 2.9s1.25 3.36 1.43 3.59c.17.23 2.41 3.86 5.96 5.25 2.95 1.16 3.55.93 4.19.87.64-.06 2.06-.84 2.35-1.65.29-.82.29-1.52.2-1.66-.09-.15-.32-.23-.67-.41-.35-.18-2.06-1.02-2.38-1.14-.32-.12-.55-.18-.78.18-.23.35-.9 1.14-1.1 1.37-.2.23-.4.26-.75.09-.35-.18-1.48-.55-2.82-1.75-1.04-.93-1.75-2.08-1.95-2.43-.2-.35-.02-.54.15-.71.15-.15.35-.4.53-.61.18-.2.23-.35.35-.58.12-.23.06-.43-.03-.61-.09-.18-.79-1.9-1.12-2.56Z"
        fill="currentColor"
      />
    </svg>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [savedTheme, setSavedTheme] = useState(() => {
    const storedTheme = window.localStorage.getItem("digiclave-theme");
    return storedTheme === "light" || storedTheme === "dark"
      ? storedTheme
      : null;
  });
  const [systemPrefersDark, setSystemPrefersDark] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );
  const closeMenu = () => setMenuOpen(false);
  const isDark = savedTheme
    ? savedTheme === "dark"
    : systemPrefersDark;

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
    <header className="site-header">
      <div className="container header-inner">
        <BrandMark />
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
        <nav
          id="primary-navigation"
          className={`primary-navigation${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#work" onClick={closeMenu}>
            Our work
          </a>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
            onClick={() => {
              setSavedTheme(isDark ? "light" : "dark");
              closeMenu();
            }}
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
              {isDark ? (
                <path
                  d="M16.2 12.5A7 7 0 0 1 7.5 3.8a7.1 7.1 0 1 0 8.7 8.7Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              ) : (
                <>
                  <circle cx="10" cy="10" r="3.3" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M10 1.8v1.6m0 13.2v1.6m8.2-8.2h-1.6M3.4 10H1.8m14-5.8-1.1 1.1M5.3 14.7l-1.1 1.1m11.6 0-1.1-1.1M5.3 5.3 4.2 4.2"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </>
              )}
            </svg>
            <span>{isDark ? "Light mode" : "Dark mode"}</span>
          </button>
          <a
            className="button button--small button--dark nav-cta"
            href={whatsappLink("Hi DigiClave Technologies! I'd like to start a project.")}
            target="_blank"
            rel="noreferrer"
          >
            Start your project <ArrowIcon diagonal />
          </a>
        </nav>
      </div>
    </header>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? " section-heading--light" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <TextReveal text={title} as="h2" />
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}

function HeroVisual() {
  return (
    <div className="hero-visual" aria-hidden="true">
      <div className="visual-topline">
        <span className="visual-dot" />
        <span className="visual-dot" />
        <span className="visual-dot" />
        <span className="visual-address">digiclave / workspace</span>
      </div>
      <div className="visual-layout">
        <div className="visual-sidebar">
          <span className="visual-sidebar-mark">d.</span>
          <span className="sidebar-line sidebar-line--active" />
          <span className="sidebar-line" />
          <span className="sidebar-line" />
        </div>
        <div className="visual-content">
          <div className="visual-label">A better way to work</div>
          <div className="visual-title">Make room<br />for what matters.</div>
          <div className="visual-copy" />
          <div className="visual-button">Explore the platform <ArrowIcon /></div>
          <div className="visual-bottom">
            <span className="visual-orbit" />
            <div className="visual-stats">
              <span>Thoughtful by design</span>
              <b>01 / 03</b>
            </div>
          </div>
        </div>
      </div>
      <div className="visual-note">
        <span className="note-pulse" />
        Built around your business
      </div>
      <span className="visual-index">FIG. 01</span>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="container hero-grid">
        <div className="hero-copy">
          <WordRotator />
          <h1 aria-label="Build a digital presence that moves you forward.">
            <TextReveal text="Build a digital" as="span" />
            <br />
            <TextReveal text="presence that" as="span" />
            <br />
            <TextReveal
              text="moves you forward."
              as="span"
              className="hero-highlight"
            />
          </h1>
          <p className="hero-description">
            We help businesses show up with confidence online and work smarter
            through thoughtful websites and practical automation.
          </p>
          <div className="hero-actions">
            <a
              className="button button--teal button--glow"
              href={whatsappLink("Hi DigiClave Technologies! I'm interested in your services.")}
              target="_blank"
              rel="noreferrer"
            >
              <span>Start your project <ArrowIcon diagonal /></span>
            </a>
            <a className="text-link text-link--light" href="#services">
              Explore our services <ArrowIcon />
            </a>
          </div>
          <p className="hero-footnote">An independent digital studio · Building together</p>
        </div>
        <HeroVisual />
      </div>
      <div className="hero-bottom container" aria-hidden="true">
        <span>01 — 04</span>
        <span className="hero-rule" />
        <span>Websites · Automation · Intelligent tools</span>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section section--services" id="services">
      <div className="container">
        <SectionHeading
          eyebrow="What we do"
          title="Good work starts with a clear idea."
          description="Useful digital solutions, designed around what your business needs next."
        />
        <div className="service-grid">
          {services.map((service, index) => (
            <RevealItem
              as="article"
              className="service-card"
              id={service.id}
              delay={index * 0.1}
              key={service.number}
            >
              <div className="card-topline">
                <span className="card-number">{service.number}</span>
                <span className="card-cross" aria-hidden="true">+</span>
              </div>
              <h3>{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <a
                className="text-link"
                href={whatsappLink(service.message)}
                target="_blank"
                rel="noreferrer"
              >
                Let’s talk <ArrowIcon diagonal />
              </a>
            </RevealItem>
          ))}
        </div>
        <section className="studio-stats" aria-label="DigiClave at a glance">
          <CountUp value={services.length} label="Service areas" />
          <CountUp value={projects.length} label="Live project" />
          <CountUp value={processSteps.length} label="Project steps" />
        </section>
      </div>
    </section>
  );
}

function Principles() {
  const principles = [
    ["01", "Made for your goals", "Each project starts with your business, your people, and what you need to achieve."],
    ["02", "Design with purpose", "We pair considered visuals with straightforward experiences that feel good to use."],
    ["03", "Practical by nature", "From responsive websites to automation, we focus on solutions that fit real workflows."],
    ["04", "Clear communication", "We keep the process collaborative, explain decisions, and make the next step clear."],
  ];

  return (
    <section className="section section--principles">
      <div className="container principles-layout">
        <div className="principles-intro">
          <p className="eyebrow">Why DigiClave</p>
          <TextReveal
            text={"Small details.\nThoughtful outcomes."}
            as="h2"
          />
          <p>
            Good technology should feel intuitive, look considered, and make
            something easier. That’s the standard we bring to every project.
          </p>
        </div>
        <div className="principles-list">
          {principles.map(([number, title, description]) => (
            <RevealItem
              as="article"
              className="principle"
              delay={(Number(number) - 1) * 0.08}
              key={number}
            >
              <span className="principle-number">{number}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
              <span className="principle-plus" aria-hidden="true">↗</span>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="section section--work" id="work">
      <div className="container">
        <div className="work-heading">
          <SectionHeading
            eyebrow="Selected work"
            title="A website made for learning."
            description="A live tuition website project for Precise Learning in Burari, Delhi."
          />
          <span className="work-count">01 / LIVE PROJECT</span>
        </div>
        <div className="project-grid">
          {projects.map((project, index) => (
            <RevealItem
              as="article"
              className="project-card project-card--featured"
              delay={index * 0.1}
              key={project.number}
            >
              <div
                className="project-preview project-preview--live"
                onPointerMove={(event) => {
                  if (event.pointerType !== "mouse") return;
                  const bounds = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty(
                    "--cursor-x",
                    `${event.clientX - bounds.left}px`,
                  );
                  event.currentTarget.style.setProperty(
                    "--cursor-y",
                    `${event.clientY - bounds.top}px`,
                  );
                }}
                onPointerLeave={(event) => {
                  event.currentTarget.style.setProperty("--cursor-x", "-100%");
                  event.currentTarget.style.setProperty("--cursor-y", "-100%");
                }}
              >
                <div className="live-site-window">
                  <div className="live-site-chrome">
                    <span className="live-site-dots" aria-hidden="true">
                      <i /><i /><i />
                    </span>
                    <span>precise-learning-burari-mu.vercel.app</span>
                  </div>
                  <div className="live-site-content">
                    <span className="live-site-kicker">TUITION · BURARI, DELHI</span>
                    <strong>Precise Learning</strong>
                    <span>Tuition for Classes 6–12 in Burari, Delhi</span>
                  </div>
                </div>
                <span className="live-project-label">
                  <span aria-hidden="true" /> Live website
                </span>
              </div>
              <div className="project-meta">
                <div>
                  <p className="project-category">{project.category}</p>
                  <h3>{project.title}</h3>
                  <p className="project-kind">{project.kind}</p>
                  <a
                    className="text-link project-live-link"
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Visit live website: ${project.title} (opens in a new tab)`}
                  >
                    Visit live website <ArrowIcon diagonal />
                  </a>
                </div>
                <span className="project-number">{project.number}</span>
              </div>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <>
      <section className="section section--about" id="about">
        <div className="container about-grid">
          <div className="about-title">
            <p className="eyebrow">A little about us</p>
            <TextReveal
              text={"Two friends.\nOne shared idea."}
              as="h2"
            />
            <span className="about-signature">DigiClave Technologies <span>— est. together</span></span>
          </div>
          <div className="about-story">
            <p className="story-lead">
              A friendship that started in Class 9 became the beginning of
              something we wanted to build together.
            </p>
            <p>
              Anubhav had long been drawn to technology, websites, and the
              possibilities of digital solutions. Aarohi brought a natural
              creative perspective and a love of ideas and design.
            </p>
            <p>
              By Class 11, we began thinking about how those interests could
              come together in something meaningful. DigiClave Technologies
              grew from that conversation.
            </p>
            <p>
              We’re starting this journey as young founders: learning,
              creating, and helping businesses build a stronger digital
              presence through modern websites and smarter automation.
            </p>
          </div>
        </div>
      </section>
      <section className="founders" aria-label="Our founders">
        <div className="container founder-grid">
          <RevealItem
            as="article"
            className="founder-card founder-card--featured"
          >
            <div className="founder-avatar" aria-hidden="true">AS</div>
            <div>
              <span className="founder-role">Founder</span>
              <h3>Anubhav Singh</h3>
              <p>Drawn to technology, websites, and useful digital solutions.</p>
            </div>
          </RevealItem>
          <RevealItem as="article" className="founder-card" delay={0.1}>
            <div className="founder-avatar founder-avatar--outline" aria-hidden="true">AJ</div>
            <div>
              <span className="founder-role">Co-founder · Creative</span>
              <h3>Aarohi Jain</h3>
              <p>Bringing a thoughtful eye for ideas, design, and how things feel.</p>
            </div>
          </RevealItem>
        </div>
      </section>
    </>
  );
}

function Process() {
  const [gridRef, isVisible] = useInView();

  return (
    <section className="section section--process">
      <div className="container">
        <SectionHeading
          eyebrow="A simple process"
          title="From first conversation to launch."
          description="A collaborative process that keeps the work focused and the next step clear."
        />
        <div
          className={`process-grid${isVisible ? " is-visible" : ""}`}
          ref={gridRef}
        >
          {processSteps.map(([number, title, description], index) => (
            <RevealItem
              as="article"
              className="process-step"
              delay={index * 0.1}
              key={number}
            >
              <span className="process-number">{number}</span>
              <span className="process-marker" aria-hidden="true" />
              <h3>{title}</h3>
              <p>{description}</p>
            </RevealItem>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section className="section section--faq" id="faq">
      <div className="container faq-layout">
        <div className="faq-intro">
          <p className="eyebrow">Good to know</p>
          <TextReveal
            text={"A few things\nyou might be wondering."}
            as="h2"
          />
          <p>Have another question? We’re happy to talk it through.</p>
          <a className="text-link" href={`mailto:${EMAIL}`}>
            Email us <ArrowIcon diagonal />
          </a>
        </div>
        <div className="faq-list">
          {faqs.map(({ question, answer }) => (
            <details className="faq-item" key={question}>
              <summary>
                <span>{question}</span>
                <span className="faq-toggle" aria-hidden="true" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [whatsappHref, setWhatsappHref] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const message = [
      "Hi DigiClave Technologies! I would like to discuss a project.",
      "",
      `Name: ${formData.get("name")}`,
      `Email: ${formData.get("email")}`,
      `Business: ${formData.get("business") || "Not provided"}`,
      `Service: ${formData.get("service")}`,
      `Budget: ${formData.get("budget") || "Not provided"}`,
      `Project Details: ${formData.get("details")}`,
      "",
      "Please let me know the next steps.",
    ].join("\n");
    const url = whatsappLink(message);
    setWhatsappHref(url);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section className="section section--contact" id="contact">
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow eyebrow--hero">Your next step</p>
          <h2 aria-label="Have an idea? Let’s build it.">
            <TextReveal text="Have an idea?" as="span" />
            <br />
            <TextReveal
              text="Let’s build it."
              as="span"
              className="contact-highlight"
            />
          </h2>
          <p>
            Tell us what you’re planning, and let’s explore how DigiClave
            Technologies can help.
          </p>
          <div className="contact-links">
            <a href="https://wa.me/919456853697" target="_blank" rel="noreferrer">
              WhatsApp <ArrowIcon diagonal />
            </a>
            <a href={`mailto:${EMAIL}`}>
              {EMAIL} <ArrowIcon diagonal />
            </a>
            <a
              href="https://www.instagram.com/digiclavetechnologies.in/"
              target="_blank"
              rel="noreferrer"
            >
              @digiclavetechnologies.in <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <form className="inquiry-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <h3>Tell us a little about it.</h3>
            <span>Fields marked * are required</span>
          </div>
          <div className="form-grid">
            <label>
              Full name <span>*</span>
              <input name="name" autoComplete="name" required />
            </label>
            <label>
              Email address <span>*</span>
              <input name="email" type="email" autoComplete="email" required />
            </label>
            <label>
              Business name
              <input name="business" autoComplete="organization" />
            </label>
            <label>
              Service required <span>*</span>
              <select name="service" defaultValue="" required>
                <option value="" disabled>Select a service</option>
                <option>Web development</option>
                <option>AI automation</option>
                <option>AI chatbots &amp; assistants</option>
                <option>Google Business Profile &amp; SEO</option>
                <option>Something else</option>
              </select>
            </label>
            <label className="form-field--full">
              Estimated budget
              <input name="budget" placeholder="Optional" />
            </label>
            <label className="form-field--full">
              Project details <span>*</span>
              <textarea name="details" rows="4" required />
            </label>
          </div>
          <button className="button button--dark form-submit" type="submit">
            Send inquiry on WhatsApp <ArrowIcon diagonal />
          </button>
          <p className="form-note">
            WhatsApp will open with your details. You’ll need to press Send
            there to submit your inquiry.
          </p>
          {whatsappHref && (
            <p className="form-fallback form-success" role="status" aria-live="polite">
              <span className="success-mark" aria-hidden="true">✓</span>
              Your inquiry message is ready. Review it in WhatsApp and press Send to submit.
            </p>
          )}
          {whatsappHref && (
            <p className="form-fallback">
              If a new tab didn’t open,{" "}
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                continue to WhatsApp <ArrowIcon diagonal />
              </a>
              .
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <BrandMark footer />
            <p>
              Build smarter. Automate more. Thoughtful digital solutions for
              businesses ready to move forward.
            </p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="#services">Services</a>
            <a href="#work">Our work</a>
            <a href="#about">About us</a>
            <a href="#faq">FAQs</a>
          </div>
          <div className="footer-column">
            <h2>What we do</h2>
            <a href="#web-development">Web development</a>
            <a href="#ai-automation">AI automation</a>
            <a href="#ai-assistants">AI assistants</a>
            <a href="#google-business-profile-seo">Google Business Profile &amp; SEO</a>
          </div>
          <div className="footer-column footer-column--contact">
            <h2>Say hello</h2>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer">+91 94568 53697</a>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a
              href="https://www.instagram.com/digiclavetechnologies.in/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram <ArrowIcon diagonal />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} DigiClave Technologies</span>
          <span>Made with care. Built together.</span>
          <div className="footer-legal">
            <a href="#privacy">Privacy policy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
        <div className="legal-notes">
          <section id="privacy">
            <h2>Privacy policy</h2>
            <p>
              This website does not store inquiry form submissions. When you
              choose to continue, the details you entered are placed in a
              WhatsApp message addressed to DigiClave Technologies. Review the
              message before sending it. WhatsApp and email are subject to their
              providers’ privacy policies.
            </p>
          </section>
          <section id="terms">
            <h2>Terms</h2>
            <p>
              Project scope, pricing, delivery timing, and any ongoing support
              are discussed and agreed individually before work begins. SEO
              work does not guarantee particular rankings or business results.
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}

function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappLink("Hi DigiClave Technologies! I'm interested in your services.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Contact DigiClave on WhatsApp"
    >
      <WhatsAppIcon />
    </a>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Services />
        <Principles />
        <Work />
        <About />
        <Process />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
