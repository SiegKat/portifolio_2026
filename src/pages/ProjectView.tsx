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
      "Dual-head (policy + value) residual CNN trained via supervised imitation learning on expert human games. Investigates how far supervised pretraining alone can push play strength before self-play or search is added.",
    tags: ["AI", "Deep Learning", "PyTorch", "Chess"],
    githubLink: "https://github.com/SiegKat/chess-model",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/chess-model/main/README.md",
  },
  "btc-lstm-forecast": {
    id: "btc-lstm-forecast",
    title: "Crypto Price Prediction (LSTM + RL)",
    description:
      "BTC/USDT forecasting pipeline on 15-minute Binance Vision candles. Engineers indicators (RSI, MACD, Bollinger, ATR, OBV) and benchmarks Bidirectional vs. MC-Dropout LSTM with uncertainty quantification. MC-Dropout cuts 1-month RMSE from $921 to $364, alongside a PPO trading agent. Skill holds through roughly one month, then decays with regime drift.",
    tags: ["AI", "Deep Learning", "Time Series", "TensorFlow", "Reinforcement Learning", "Finance"],
    githubLink: "https://github.com/SiegKat/btc-lstm-forecast",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/btc-lstm-forecast/main/README.md",
  },
  "rl-project": {
    id: "rl-project",
    title: "Actor-Critic for CartPole",
    description:
      "Actor-Critic agent (PyTorch) for CartPole-v1, refactored from coursework into a reproducible ML pipeline: CLI, unit tests, saved checkpoints, and documentation. Intended as a minimal, verified baseline for future RL experiments.",
    tags: ["AI", "Reinforcement Learning", "PyTorch", "Gymnasium"],
    githubLink: "https://github.com/SiegKat/rl_project",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/rl_project/main/README.md",
  },
  "spotify-artist-network-analysis": {
    id: "spotify-artist-network-analysis",
    title: "Spotify Artist Network Analysis",
    description:
      "Graph analysis of roughly 156,000 Spotify artists and their connections. PySpark for distributed processing; NetworkX for centrality, clustering, and popularity prediction. Studies which centrality measures carry signal for downstream popularity forecasting.",
    tags: ["PySpark", "NetworkX", "Python", "Graph Analytics", "Data Science"],
    githubLink: "https://github.com/SiegKat/spotify-artist-network-analysis",
    contentUrl: "/content/projects/spotify-artist-network-analysis.md",
  },
  "prompt-strategy": {
    id: "prompt-strategy",
    title: "Prompt Strategy Lab",
    description:
      "Comparative testing framework for nine prompt engineering strategies (Chain-of-Thought, Reflection, Few-Shot, Self-Consistency, and more), evaluated under identical conditions on a local TinyLLaMA via Ollama. Captures latency, token usage, and qualitative output per strategy. Findings: Few-Shot wins for structured output; Self-Consistency triples latency with marginal gains; Reflection-on-CoT breaks down on small models, suggesting limited multi-step meta-reasoning at 1.1B parameters.",
    tags: ["AI", "LLMs", "Prompt Engineering", "Evaluation", "Python"],
    githubLink: "https://github.com/SiegKat/prompt-strategy",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/prompt-strategy/main/README.md",
  },
  "clinical-ai-tool-agent": {
    id: "clinical-ai-tool-agent",
    title: "Clinical AI Tool Agent",
    description:
      "LangChain ReAct agent that reasons about patient vitals, deciding when to invoke deterministic clinical calculators (BMI, MAP, Anion Gap) versus retrieve from a local FAISS-indexed medical knowledge base. Runs entirely on TinyLLaMA via Ollama with a custom text-based Action/Action Input protocol, since the model lacks native function calling. Key finding: the dominant failure mode was malformed LLM outputs, not calculation errors; lower temperature, explicit format examples, and token limits sharply reduced malformation rates.",
    tags: ["AI", "LLMs", "Agents", "RAG", "LangChain"],
    githubLink: "https://github.com/SiegKat/clinical-ai-tool-agent",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/clinical-ai-tool-agent/main/README.md",
  },
  "mcp-agent-blackboard": {
    id: "mcp-agent-blackboard",
    title: "MCP Research Collective",
    description:
      "Multi-agent research system on the Model Context Protocol (MCP). Three specialized agents (Planner, Researcher, Reasoner) coordinate exclusively through a thread-safe blackboard with TTL, regex querying, and tag filtering. No point-to-point messaging: forcing every state mutation through one chokepoint makes the system trivially observable and lets new agents drop in with only the blackboard contract. Ships both an in-process connector for tests and a FastMCP STDIO server for Claude Desktop integration.",
    tags: ["AI", "LLMs", "Multi-Agent", "MCP", "Orchestration"],
    githubLink: "https://github.com/SiegKat/mcp-agent-blackboard",
    contentUrl:
      "https://raw.githubusercontent.com/SiegKat/mcp-agent-blackboard/main/README.md",
  },
};

interface Project {
  id: string;
  title: string;
  content: string;
  contentUrl?: string;
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
          setProject({ ...extra, content, contentUrl: extra.contentUrl });
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

        setProject({
          ...projectMeta,
          content,
          contentUrl: `${CONTENT_BASE_URL}/projects/${id}.md`,
        });
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

      <MarkdownRenderer
        content={project.content}
        className="mt-8"
        sourceUrl={project.contentUrl}
      />
    </motion.article>
  );
}
