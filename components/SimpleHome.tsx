import { getDict } from "@/lib/dictionaries";
import { languageNames, languages, simplePath, type Language } from "@/lib/languages";
import { env } from "@/lib/env";
import {
  highlightKeys,
  projectEntries,
  serviceKeys,
  socialEntries,
  youtubeChannels,
} from "@/lib/content";

/**
 * The site as a Wikipedia-style article — the exact same content as the
 * designed page, laid out like a document: title, language bar, table of
 * contents in the sidebar, sections with the numbers in an infobox. No
 * Tailwind, no icons, no animation, no client JS; the responsive rules turn the
 * two columns into one on a phone. Served at /simple/ (English) and
 * /{lang}/simple/ for every other language, for reading, translating, printing
 * and saving as PDF.
 *
 * Everything here is a server component on purpose: the static HTML is the
 * whole page, so it renders with scripting disabled and without hydration.
 */
export default function SimpleHome({ lang }: { lang: Language }) {
  const dict = getDict(lang);
  const t = (key: string) => dict[key] ?? key;
  const year = new Date().getFullYear();

  // Table of contents in the sidebar — the same five anchors as the navigation
  // of the designed site.
  const sections = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  /**
   * Renders the `**highlighted**` markers of the locale files. The designed page
   * turns them into gradient spans, the article copy keeps them as bold text.
   * split() with a capture group leaves unmatched asterisks intact.
   */
  const withEmphasis = (text: string): React.ReactNode[] =>
    text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? <strong key={i}>{part.slice(2, -2)}</strong> : part,
    );

  return (
    <div className="page">
      <div className="sheet">
        {/* ─── Title + language bar ─────────────────────────────────────── */}
        <header className="masthead">
          <h1>{t("hero.name")}</h1>
          <p className="tagline">{t("hero.title")}</p>
          <p className="langbar">
            {languages.map((code, i) => (
              <span key={code}>
                {i > 0 ? " · " : ""}
                {code === lang ? (
                  <span className="current">{languageNames[code]}</span>
                ) : (
                  <a href={simplePath(code)}>{languageNames[code]}</a>
                )}
              </span>
            ))}
          </p>
        </header>

        <div className="columns">
          {/* ─── Sidebar: contents ──────────────────────────────────────── */}
          <aside>
            <nav className="box" aria-label={t("toc.title")}>
              <h2 className="box-title">{t("toc.title")}</h2>
              <ul>
                {sections.map((section) => (
                  <li key={section.href}>
                    <a href={section.href}>{section.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* ─── Article ────────────────────────────────────────────────── */}
          <main className="article">
            {/* Hero */}
            <section id="home">
              <p className="lead">{t("hero.description")}</p>

              <p>
                <a href="#services">{t("hero.cta")}</a>{" "}
                <a href="#contact">{t("contact.title")}</a>
              </p>

              <ul>
                {socialEntries.map((social) => (
                  <li key={social.name}>
                    <a href={social.url} target="_blank" rel="noopener noreferrer">
                      {social.name}
                    </a>
                  </li>
                ))}
                {/* The designed page hides these two channels behind a dropdown;
                    <details> keeps the same content with no JavaScript. */}
                <li>
                  <details>
                    <summary>{t("youtube.title")}</summary>
                    <ul>
                      {youtubeChannels.map((channel) => (
                        <li key={channel.name}>
                          <a href={channel.url} target="_blank" rel="noopener noreferrer">
                            {channel.name} [{channel.lang.toUpperCase()}]
                          </a>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              </ul>

              {/* Typing animation replaced by the finished text of the same lines */}
              <div className="term">
                <div className="term-title">about.txt</div>
                <pre>
                  {[
                    t("terminal.line1"),
                    t("terminal.line2"),
                    t("terminal.line3"),
                    t("terminal.line4"),
                    t("terminal.line5"),
                    t("terminal.line6"),
                    t("terminal.line7"),
                    t("terminal.line8"),
                    t("terminal.line9"),
                  ].join("\n")}
                </pre>
              </div>
            </section>

            {/* About */}
            <section id="about">
              <p className="label">{t("about.title")}</p>
              <h2>{withEmphasis(t("about.heading"))}</h2>

              {/* Infobox with the counters of the designed page */}
              <aside className="infobox">
                <div className="infobox-title">{t("about.title")}</div>
                {highlightKeys.map((key) => (
                  <div key={key}>
                    <div className="infobox-row">
                      <span className="infobox-key">{t(`highlight.${key}`)}</span>
                      <span className="infobox-value">
                        {t(`highlight.${key}.num`)}
                        {t(`highlight.${key}.suffix`)}
                      </span>
                    </div>
                    <p className="infobox-desc">{t(`highlight.${key}.desc`)}</p>
                  </div>
                ))}
              </aside>

              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>
            </section>

            {/* Services */}
            <section id="services">
              <p className="label">{t("services.title")}</p>
              <h2>{withEmphasis(t("services.heading"))}</h2>
              <p>{t("services.description")}</p>

              <ul>
                {serviceKeys.map((key) => (
                  <li key={key}>
                    <h3>{t(`service.${key}.title`)}</h3>
                    <p>{t(`service.${key}.desc`)}</p>
                    <ul>
                      {[1, 2, 3, 4].map((n) => (
                        <li key={n}>{t(`service.${key}.detail${n}`)}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </section>

            {/* Projects */}
            <section id="projects">
              <p className="label">{t("projects.title")}</p>
              <h2>{withEmphasis(t("projects.heading"))}</h2>
              <p>{t("projects.description")}</p>

              <ul>
                {projectEntries.map((project) => (
                  <li key={project.key}>
                    <h3>{t(`project.${project.key}.title`)}</h3>
                    <p>{t(`project.${project.key}.desc`)}</p>
                    {/* Tech pills of the designed page, comma separated */}
                    <p className="tech">{project.tech.join(", ")}</p>
                    <ul>
                      {[1, 2, 3].map((n) => (
                        <li key={n}>{t(`project.${project.key}.detail${n}`)}</li>
                      ))}
                    </ul>
                    <p>
                      <a href={project.href} target="_blank" rel="noopener noreferrer">
                        {t(project.linkKey)}
                      </a>
                    </p>
                  </li>
                ))}
              </ul>
            </section>

            {/* Contact */}
            <section id="contact">
              <p className="label">{t("contact.title")}</p>
              <h2>{withEmphasis(t("contact.heading"))}</h2>
              <p>{t("contact.text")}</p>
              <p>
                <a className="cta cta-primary" href={env("NEXT_PUBLIC_TELEGRAM_URL")} target="_blank" rel="noopener noreferrer">
                  {t("contact.button")}
                </a>
                <a className="cta cta-secondary" href={`mailto:${env("NEXT_PUBLIC_EMAIL")}`}>
                  {t("contact.email_button")}
                </a>
              </p>
            </section>
          </main>
        </div>

        {/* ─── Footer ──────────────────────────────────────────────────── */}
        <footer className="footer">
          <p>
            <a className="logo" href="#home">
              {t("hero.name")}~
            </a>
          </p>
          <p>
            © {year} {t("hero.name")}. {t("footer.rights")}
          </p>
          {/* Stands in for the floating scroll-to-top button, which needs JS */}
          <p>
            <a href="#home">{t("aria.scrollToTop")}</a>
          </p>
        </footer>
      </div>
    </div>
  );
}
