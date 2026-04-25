import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ProjectCard, { Project } from "../components/ProjectCard";
import { CONTENT_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";

const EXTRA_PROJECTS: Project[] = [
  {
    id: "net-edu",
    title: "N.E.T. (Neurodiverse Educational Testing)",
    description:
      "A multi-agent AI platform that orchestrates specialized LLM workflows, from conversational intake to adaptive assessment to document generation, helping families identify learning differences and produce actionable accommodation plans in under 15 minutes.",
    tags: ["React", "TypeScript", "Supabase", "n8n", "Claude API", "NLP", "Accessibility"],
    demoLink: "https://net-dev.vercel.app/onboarding",
  },
  {
    id: "sieg-ai",
    title: "SIEG AI",
    description:
      "AI tools discovery and evaluation platform with 80+ cataloged tools, multi-language support for 17 languages, and integrated AI chat. Built with React, TypeScript, and Supabase.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS", "i18next", "Vite"],
    demoLink: "https://siegai.com",
  },
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
      "Dual-head (policy + value) residual CNN trained via supervised imitation learning on expert human games. Investigates how far supervised pretraining alone can push play strength before self-play or search is added.",
    tags: ["AI", "Deep Learning", "PyTorch", "Chess"],
    githubLink: "https://github.com/SiegKat/chess-model",
  },
  {
    id: "btc-lstm-forecast",
    title: "Crypto Price Prediction (LSTM + RL)",
    description:
      "BTC/USDT forecasting pipeline on 15-minute Binance Vision candles. Engineers indicators (RSI, MACD, Bollinger, ATR, OBV) and benchmarks Bidirectional vs. MC-Dropout LSTM with uncertainty quantification. MC-Dropout cuts 1-month RMSE from $921 to $364, alongside a PPO trading agent. Skill holds through roughly one month, then decays with regime drift.",
    tags: ["AI", "Deep Learning", "Time Series", "TensorFlow", "Reinforcement Learning", "Finance"],
    githubLink: "https://github.com/SiegKat/btc-lstm-forecast",
  },
  {
    id: "rl-project",
    title: "Actor-Critic for CartPole",
    description:
      "Actor-Critic agent (PyTorch) for CartPole-v1, refactored from coursework into a reproducible ML pipeline: CLI, unit tests, saved checkpoints, and documentation. Intended as a minimal, verified baseline for future RL experiments.",
    tags: ["AI", "Reinforcement Learning", "PyTorch", "Gymnasium"],
    githubLink: "https://github.com/SiegKat/rl_project",
  },
  {
    id: "spotify-artist-network-analysis",
    title: "Spotify Artist Network Analysis",
    description:
      "Graph analysis of roughly 156,000 Spotify artists and their connections. PySpark for distributed processing; NetworkX for centrality, clustering, and popularity prediction. Studies which centrality measures carry signal for downstream popularity forecasting.",
    tags: ["PySpark", "NetworkX", "Python", "Graph Analytics", "Data Science"],
    githubLink: "https://github.com/SiegKat/spotify-artist-network-analysis",
  },
  {
    id: "prompt-strategy",
    title: "Prompt Strategy Lab",
    description:
      "Comparative testing framework for nine prompt engineering strategies (Chain-of-Thought, Reflection, Few-Shot, Self-Consistency, and more), evaluated under identical conditions on a local TinyLLaMA via Ollama. Captures latency, token usage, and qualitative output per strategy. Findings: Few-Shot wins for structured output; Self-Consistency triples latency with marginal gains; Reflection-on-CoT breaks down on small models, suggesting limited multi-step meta-reasoning at 1.1B parameters.",
    tags: ["AI", "LLMs", "Prompt Engineering", "Evaluation", "Python"],
    githubLink: "https://github.com/SiegKat/prompt-strategy",
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
