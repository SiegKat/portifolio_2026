import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import FilterDropdown from "../components/FilterDropdown";
import ProjectCard, { Project } from "../components/ProjectCard";
import { CONTENT_BASE_URL } from "../config";
import { useTranslation } from "react-i18next";

export default function Projects() {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        setProjects(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch projects",
        );
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

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] space-y-4">
        <p className="text-lg text-red-500">{t("projects.errorPrefix")}{error}</p>
        <p className="text-sm">{t("projects.refreshHint")}</p>
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
