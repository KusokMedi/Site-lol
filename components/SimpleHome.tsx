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
    <div className="page" id="top">
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

              {/* Typing animation replaced by the finished text of the same lines.
                  The last line the main site types is the About heading, which
                  follows right after this block, so it is left out here. */}
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
                  ].join("\n")}
                </pre>
              </div>
            </section>

            {/* About */}
            <section id="about">
              <h2>{withEmphasis(t("about.heading"))}</h2>
              <p>{t("about.text1")}</p>
              <p>{t("about.text2")}</p>

              {/* Counters of the designed page as a summary table. It used to
                  float next to the lead text like a Wikipedia infobox, but it
                  stole ~300px of the column and the socials row ran into it,
                  so it now sits full width in the section it describes. */}
              <table className="infobox">
                <caption>{t("hero.name")}</caption>
                <tbody>
                  {highlightKeys.map((key) => (
                    <tr key={key}>
                      <th scope="row">{t(`highlight.${key}`)}</th>
                      <td className="value">
                        {t(`highlight.${key}.num`)}
                        {t(`highlight.${key}.suffix`)}
                      </td>
                      <td className="note">{t(`highlight.${key}.desc`)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>

            {/* Services */}
            <section id="services">
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

          {/* ─── Sidebar: contents + appearance ─────────────────────────── */}
          <aside className="sidebar">
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

            {/* Wikipedia's Appearance panel: Color (Automatic/Light/Dark) and
                Text (Small/Standard/Large). The radios drive the page through
                CSS `:has()`; a small inline script only remembers the choice. */}
            <form className="box appearance" aria-label={t("appearance.title")}>
              <h2 className="box-title">{t("appearance.title")}</h2>
              <div className="appearance-group">
                <div className="appearance-label">{t("appearance.color")}</div>
                {(["auto", "light", "dark"] as const).map((value, i) => (
                  <label className="radio" key={value}>
                    <input
                      type="radio"
                      name="theme"
                      id={`theme-${value}`}
                      value={value}
                      defaultChecked={i === 0}
                    />
                    <span className="radio-icon" />
                    <span className="radio-text">{t(`appearance.color.${value}`)}</span>
                  </label>
                ))}
              </div>
              <div className="appearance-group">
                <div className="appearance-label">{t("appearance.text")}</div>
                {(["small", "standard", "large"] as const).map((value, i) => (
                  <label className="radio" key={value}>
                    <input
                      type="radio"
                      name="size"
                      id={`size-${value}`}
                      value={value}
                      defaultChecked={i === 1}
                    />
                    <span className="radio-icon" />
                    <span className="radio-text">{t(`appearance.text.${value}`)}</span>
                  </label>
                ))}
              </div>
            </form>
          </aside>
        </div>

        {/* ─── Footer ──────────────────────────────────────────────────── */}
        <footer className="footer">
          <p>
            <a className="logo" href="#top">
              {t("hero.name")}~
            </a>
          </p>
          <p>
            © {year} {t("hero.name")}. {t("footer.rights")}
          </p>
          <p>
            <a href="#top">{t("aria.scrollToTop")}</a>
          </p>
        </footer>
      </div>

      {/* Stands in for the floating scroll-to-top button of the main site.
          Plain anchor to the very top of the page, so it works without JS; the
          fade-in is tied to the scroll position in CSS. */}
      <a className="to-top" href="#top" aria-label={t("aria.scrollToTop")} title={t("aria.scrollToTop")}>
        ↑
      </a>
    </div>
  );
}
