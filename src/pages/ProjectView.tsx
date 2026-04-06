import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MarkdownRenderer from "../components/MarkdownRenderer";
import ProjectIndicators from "../components/ProjectIndicators";
import { CONTENT_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";

const EXTRA_PROJECT_META: Record<
  string,
  Omit<Project, "content"> & { contentUrl: string }
> = {
  "net-edu": {
    id: "net-edu",
    title: "N.E.T. (Neurodiverse Educational Testing)",
    description:
      "A multi-agent AI platform that orchestrates specialized LLM workflows, from conversational intake to adaptive assessment to document generation, helping families identify learning differences and produce actionable accommodation plans in under 15 minutes.",
    tags: ["React", "TypeScript", "Supabase", "n8n", "Claude API", "NLP", "Accessibility"],
    demoLink: "https://net-dev.vercel.app/onboarding",
    contentUrl: "/content/projects/net-edu.md",
  },
  "sieg-ai": {
    id: "sieg-ai",
    title: "SIEG AI",
    description:
      "AI tools discovery and evaluation platform with 80+ cataloged tools, multi-language support for 17 languages, and integrated AI chat. Built with React, TypeScript, and Supabase.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "i18next", "Vite"],
    demoLink: "https://siegai.com",
    contentUrl: "/content/projects/sieg-ai.md",
  },
  "portifolio-2026": {
    id: "portifolio-2026",
    title: "Personal Portfolio",
    description:
      "Bilingual (EN/PT) portfolio built with React, TypeScript, Vite, and Tailwind CSS. Features i18n with auto locale detection, dark/light themes, Framer Motion animations, and AWS Amplify backend integration.",
    tags: ["React", "TypeScript", "Tailwind CSS", "Vite", "i18n"],
    githubLink: "https://github.com/SiegKat/portifolio_2026",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/portifolio_2026/main/README.md",
  },
  "chess-model": {
    id: "chess-model",
    title: "Chess Engine (Deep Learning)",
    description:
      "A chess engine powered by a residual CNN with dual-head (policy + value), trained via supervised imitation learning on expert human games.",
    tags: ["AI", "Deep Learning", "PyTorch", "Chess"],
    githubLink: "https://github.com/SiegKat/chess-model",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/chess-model/main/README.md",
  },
  "btc-lstm-forecast": {
    id: "btc-lstm-forecast",
    title: "Crypto Price Prediction (LSTM + RL)",
    description:
      "End-to-end BTC/USDT forecasting with Bidirectional LSTM, MC-Dropout uncertainty estimation, and a PPO reinforcement learning trading agent trained on Binance data.",
    tags: ["AI", "Deep Learning", "TensorFlow", "Reinforcement Learning", "Finance"],
    githubLink: "https://github.com/SiegKat/btc-lstm-forecast",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/btc-lstm-forecast/main/README.md",
  },
  "rl-project": {
    id: "rl-project",
    title: "Actor-Critic for CartPole",
    description:
      "A portfolio-ready PyTorch Actor-Critic agent for CartPole-v1, refactored from coursework into a reproducible ML project with CLI, tests, saved artifacts, and documentation.",
    tags: ["AI", "Reinforcement Learning", "PyTorch", "Gymnasium"],
    githubLink: "https://github.com/SiegKat/rl_project",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/rl_project/main/README.md",
  },
};

interface Project {
  id: string;
  title: string;
  content: string;
  description: string;
  demoLink?: string;
  githubLink?: string;
  tags: string[];
}

export default function ProjectView() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const extra = id ? EXTRA_PROJECT_META[id] : undefined;

        // Prefer built-in projects (for deploy portability)
        if (extra) {
          const contentRes = await fetch(extra.contentUrl);
          if (!contentRes.ok) throw new Error("Project not found");
          const content = await contentRes.text();
          setProject({ ...extra, content });
          setLoading(false);
          return;
        }

        const response = await fetch(`${CONTENT_BASE_URL}/projects/${id}.md`);
        if (!response.ok) throw new Error("Project not found");
        const content = await response.text();

        // Fetch project metadata
        const metaResponse = await fetch(`${CONTENT_BASE_URL}/projects.json`);
        if (!metaResponse.ok)
          throw new Error("Failed to fetch project metadata");
        const projects = await metaResponse.json();
        const projectMeta = projects.find((p: Project) => p.id === id);

        if (!projectMeta) throw new Error("Project metadata not found");

        setProject({ ...projectMeta, content });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch project",
        );
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-lg">Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">
          {t("projectView.errorPrefix")}{error || t("projectView.notFound")}
        </p>
        <a
          href="/projects"
          className="text-sm hover:text-[var(--color-primary)] transition-colors"
        >
          {t("projectView.backToProjects")}
        </a>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div className="space-y-4">
        <a
          href="/projects"
          className="text-sm hover:text-[var(--color-primary)] transition-colors"
        >
          {t("projectView.backToProjects")}
        </a>
        <h1 className="text-4xl font-bold">{project.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags?.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              {t("projectView.github")}
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:text-[var(--color-primary)] transition-colors"
            >
              {t("projectView.liveDemo")}
            </a>
          )}
        </div>

        {/* Project Indicators */}
        <div className="mt-6">
          <ProjectIndicators projectId={project.id} />
        </div>
      </div>

      <MarkdownRenderer content={project.content} className="mt-8" />
    </motion.article>
  );
}
