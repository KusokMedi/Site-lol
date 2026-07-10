"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  BookOpen,
  GitCommit,
  Database,
} from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const CACHE_KEY = "github-commits";
const CACHE_DURATION = 60 * 60 * 1000;

interface GitHubCache {
  timestamp: number;
  contributions: string | null;
}

const pinnedRepos = [
  {
    name: "Site-lol",
    description: "Исходный код этого сайта",
    url: "https://github.com/KusokMedi/Site-lol",
    lang: "TypeScript",
  },
  {
    name: "DonDuration",
    description: "Плагин на плейсхолдер чтобы отобразить на сколько выдан донат (LuckPerms)",
    url: "https://github.com/KusokMedi/DonDuration",
    lang: "Java",
  },
  {
    name: "server-control-python",
    description: "Безопасная система удаленного управления компьютером через веб-интерфейс с поддержкой множественных пользователей, ролей и аудита действий на Windows 11",
    url: "https://github.com/KusokMedi/server-control-python",
    lang: "Python",
  },
];

function SkeletonBlock() {
  return (
    <div className="flex flex-col items-center gap-3 py-4 animate-pulse">
      <div className="w-8 h-8 rounded-full bg-white/[0.04]" />
      <div className="h-6 w-16 rounded bg-white/[0.04]" />
      <div className="h-3 w-20 rounded bg-white/[0.03]" />
    </div>
  );
}

export default function GitHubRepos() {
  const [contributions, setContributions] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchFromCache = useCallback((): GitHubCache | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: GitHubCache = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_DURATION) {
          return parsed;
        }
      }
    } catch {}
    return null;
  }, []);

  const saveToCache = useCallback((data: GitHubCache) => {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    } catch {}
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const cached = fetchFromCache();
      if (cached) {
        setContributions(cached.contributions);
        setLoading(false);
        return;
      }

      let contribs: string | null = null;

      try {
        const commitRes = await fetch(
          "https://api.github.com/search/commits?q=author:kusokmedi&per_page=1"
        );
        if (!commitRes.ok) {
          const text = await commitRes.text();
          console.warn("GitHub API commits error:", commitRes.status, text);
          throw new Error(`GitHub API error: ${commitRes.status}`);
        }
        const commitData = await commitRes.json();
        if (commitData.total_count != null) {
          contribs = commitData.total_count.toLocaleString();
          setContributions(contribs);
        }
      } catch (err) {
        console.warn("Failed to fetch commits:", err);
        setError(true);
      }

      saveToCache({ timestamp: Date.now(), contributions: contribs });
      setLoading(false);
    }

    fetchData();
  }, [fetchFromCache, saveToCache]);

  const stats = [
    {
      icon: BookOpen,
      label: "Репозитории",
      value: "10+",
    },
    {
      icon: Database,
      label: "Технологии",
      value: "20+",
    },
    {
      icon: GitCommit,
      label: "Обновлений",
      value: contributions ? `${contributions}+` : (error ? "N/A" : "Загрузка..."),
    },
  ];

  return (
    <AnimatedSection id="github" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-500/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-accent-700/3 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-medium text-white/50 tracking-wide"
          >
            <Github className="w-3 h-3 text-accent-400" />
            GitHub
          </motion.div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Открытый{" "}
            <span className="gradient-accent-text">код</span>
          </h2>
          <p className="text-white/40 max-w-2xl mx-auto text-base sm:text-lg">
            Мои проекты на GitHub.
          </p>
        </div>

        <div className="flex justify-center gap-8 sm:gap-16 mb-12">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => <SkeletonBlock key={i} />)
            : stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-4 h-4 text-accent-400 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl font-bold gradient-accent-text">
                    {stat.value}
                  </div>
                  <div className="text-xs text-white/40 mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {pinnedRepos.map((repo, i) => (
            <motion.a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="group p-4 rounded-xl glass glass-hover gradient-border transition-all duration-300 w-full sm:w-auto sm:max-w-xs flex-1 basis-[200px] hover:glow-sm"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2 min-w-0">
                  <BookOpen className="w-3.5 h-3.5 text-accent-400 shrink-0" />
                  <span className="text-sm font-medium text-white/80 group-hover:text-accent-400 transition-colors truncate">
                    {repo.name}
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-white/20 group-hover:text-white/50 transition-colors shrink-0" />
              </div>
              <p className="text-xs text-white/40 line-clamp-2 mb-3">
                {repo.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-white/30">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-accent-400/60" />
                  {repo.lang}
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <a
            href="https://github.com/kusokmedi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm text-white/60 hover:text-white hover:bg-white/[0.08] transition-all duration-300"
          >
            <Github className="w-4 h-4" />
            Профиль GitHub
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}