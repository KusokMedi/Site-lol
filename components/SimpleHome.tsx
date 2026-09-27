import { getDict } from "@/lib/dictionaries";
import { defaultLanguage } from "@/lib/languages";
import { env } from "@/lib/env";
import {
  highlightKeys,
  projectEntries,
  serviceKeys,
  socialEntries,
  youtubeChannels,
} from "@/lib/content";

/**
 * The site in its simplest form — the exact same content as the designed page,
 * with only plain formatting: the site's dark background and gold accent, but
 * no Tailwind, no icons, no animation, no client JS. Lives at /simple/ for
 * reading, translating and checking the copy.
 *
 * Everything here is a server component on purpose: the static HTML is the
 * whole page, so it renders with scripting disabled and without hydration.
 */

const dict = getDict(defaultLanguage);
const t = (key: string) => dict[key] ?? key;

/**
 * Renders the `**highlighted**` markers of the locale files. The designed page
 * turns them into gradient spans, the simple copy colours them — same words.
 * split() with a capture group keeps unmatched asterisks intact.
 */
function withEmphasis(text: string): React.ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part,
  );
}

export default function SimpleHome() {
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t("nav.home"), href: "#home" },
    { label: t("nav.about"), href: "#about" },
    { label: t("nav.services"), href: "#services" },
    { label: t("nav.projects"), href: "#projects" },
    { label: t("nav.contacts"), href: "#contact" },
  ];

  return (
    <>
      <header className="nav">
        <nav>
          <ul>
            {/* Logo of the designed header, same destination */}
            <li>
              <a className="logo" href="#home">
                {t("hero.name")}~
              </a>
            </li>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main>
        {/* ─── Hero ─────────────────────────────────────────────────────── */}
        <section id="home">
          <h1>{t("hero.name")}</h1>
          <p>{t("hero.description")}</p>

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

        {/* ─── About ────────────────────────────────────────────────────── */}
        <section id="about">
          <p className="label">{t("about.title")}</p>
          <h2>{withEmphasis(t("about.heading"))}</h2>
          <p>{t("about.text1")}</p>
          <p>{t("about.text2")}</p>

          <ul>
            {highlightKeys.map((key) => (
              <li key={key}>
                {/* The count-up animation of the designed page is a static
                    number here — the number and its suffix are the same keys. */}
                <div className="stat-num">
                  {t(`highlight.${key}.num`)}
                  {t(`highlight.${key}.suffix`)}
                </div>
                <div>{t(`highlight.${key}`)}</div>
                <div>{t(`highlight.${key}.desc`)}</div>
              </li>
            ))}
          </ul>
        </section>

        {/* ─── Services ─────────────────────────────────────────────────── */}
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

        {/* ─── Projects ─────────────────────────────────────────────────── */}
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
                <p>{project.tech.join(", ")}</p>
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

        {/* ─── Contact ──────────────────────────────────────────────────── */}
        <section id="contact">
          <p className="label">{t("contact.title")}</p>
          <h2>{withEmphasis(t("contact.heading"))}</h2>
          <p>{t("contact.text")}</p>
          <p>
            <a href={env("NEXT_PUBLIC_TELEGRAM_URL")} target="_blank" rel="noopener noreferrer">
              {t("contact.button")}
            </a>{" "}
            <a href={`mailto:${env("NEXT_PUBLIC_EMAIL")}`}>
              {t("contact.email_button")}
            </a>
          </p>
        </section>
      </main>

      <footer>
        <p>
          <a href="#home">{t("hero.name")}~</a>
        </p>
        <p>
          © {year} {t("hero.name")}. {t("footer.rights")}
        </p>
        {/* Stands in for the floating scroll-to-top button, which needs JS */}
        <p>
          <a href="#home">{t("aria.scrollToTop")}</a>
        </p>
      </footer>
    </>
  );
}
