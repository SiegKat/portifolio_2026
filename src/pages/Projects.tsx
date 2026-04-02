import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ProjectCard, { Project } from "../components/ProjectCard";
import { CONTENT_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";

const EXTRA_PROJECTS: Project[] = [
  {
    id: "portifolio-2026",
    title: "Personal Portfolio",
    description:
      "Bilingual (EN/PT) portfolio built with React, TypeScript, Vite, and Tailwind CSS. Features i18n with auto locale detection, dark/light themes, Framer Motion animations, and AWS Amplify backend integration.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "i18n"],
    githubLink: "https://github.com/SiegKat/portifolio_2026",
  },
  {
    id: "chess-model",
    title: "Chess Engine (Deep Learning)",
    description:
      "A chess engine powered by a residual CNN with dual-head (policy + value), trained via supervised imitation learning on expert human games.",
    tags: ["AI", "Deep Learning", "PyTorch", "Chess"],
    githubLink: "https://github.com/SiegKat/chess-model",
  },
  {
    id: "btc-lstm-forecast",
    title: "Crypto Price Prediction (LSTM + RL)",
    description:
      "End-to-end BTC/USDT forecasting with Bidirectional LSTM, MC-Dropout uncertainty estimation, and a PPO reinforcement learning trading agent trained on Binance data.",
    tags: ["AI", "Deep Learning", "TensorFlow", "Reinforcement Learning", "Finance"],
    githubLink: "https://github.com/SiegKat/btc-lstm-forecast",
  },
  {
    id: "rl-project",
    title: "Actor-Critic for CartPole",
    description:
      "A portfolio-ready PyTorch Actor-Critic agent for CartPole-v1, refactored from coursework into a reproducible ML project with CLI, tests, saved artifacts, and documentation.",
    tags: ["AI", "Reinforcement Learning", "PyTorch", "Gymnasium"],
    githubLink: "https://github.com/SiegKat/rl_project",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${CONTENT_BASE_URL}/projects.json`,
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const base = Array.isArray(data) ? (data as Project[]) : [];
        const withExtras = [
          ...base,
          ...EXTRA_PROJECTS.filter(
            (extra) => !base.some((p) => p?.id === extra.id),
          ),
        ];
        setProjects(withExtras);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching remote projects:", err);
        setProjects(EXTRA_PROJECTS);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (!selectedTag) return projects;
    return projects.filter((project) => project.tags.includes(selectedTag));
  }, [projects, selectedTag]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">{t("projects.loading")}</p>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">{t("projects.empty")}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Projects</h1>
        <FilterDropdown
          options={availableTags}
          selectedOption={selectedTag}
          onSelect={setSelectedTag}
          label={t("projects.filterByTag")}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredProjects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
