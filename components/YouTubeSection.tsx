"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Youtube } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionBadge from "./SectionBadge";
import { useLanguage } from "@/components/LanguageProvider";

export default function YouTubeSection() {
  const { t, lang } = useLanguage();
  const [videoId, setVideoId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLatestVideo() {
      try {
        const channel = lang === "ru" ? "kusokmedi" : "kexbytes";
        const res = await fetch(`/api/youtube?channel=${channel}`);
        const data = await res.json();
        if (data.videoId) setVideoId(data.videoId);
      } catch (error) {
        console.error("Failed to fetch video:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchLatestVideo();
  }, [lang]);

  return (
    <AnimatedSection id="youtube" className="relative py-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 -left-32 w-72 h-72 bg-red-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 -right-32 w-72 h-72 bg-red-600/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <SectionBadge icon={Youtube} label={t("youtube.title")} />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("youtube.latest")}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {loading ? (
            <div className="aspect-video rounded-2xl glass flex items-center justify-center">
              <div className="text-white/40">Loading...</div>
            </div>
          ) : videoId ? (
            <div className="relative aspect-video rounded-2xl overflow-hidden glass gradient-border">
              <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Latest video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          ) : (
            <div className="aspect-video rounded-2xl glass flex items-center justify-center">
              <div className="text-white/40">Video not available</div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
