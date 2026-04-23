import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import "react-medium-image-zoom/dist/styles.css";

import { Project as ProjectType } from "../components/ProjectCard";
import { WhatDrivesMe, WhoDrivesMe } from "../components/about/DrivesMe";
import TLDR from "../components/tldr";
import AboutSection from "../components/about/AboutSec";
import ProjectsSection from "../components/about/ProjectSec";
import WorkExperienceSection from "../components/about/WorkExperience";
import EducationSection from "../components/about/Education";
import TechnicalExpertiseSection from "../components/about/TechnicalExpertise";
import RecentActivity from "../components/about/RecentActivity";
import Socials from "../components/about/Socials";
import ImportantDocuments from "../components/about/ImportantDocuments";

import GitHubChart from "../components/Git";
import { CONTENT_BASE_URL, GITHUB_USERNAME } from "../config";

const currentProjectIds: string[] = [];

const SHOW_GITHUB_CHART = false;

export default function About() {
  const [currentProjects, setCurrentProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add a class to the document to ensure dark mode is respected
    document.documentElement.classList.add("color-scheme-adaptive");

    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${CONTENT_BASE_URL}/projects.json`,
        );
        if (!response.ok) throw new Error("Failed to fetch projects");
        const allProjects = await response.json();
        const filteredProjects = allProjects.filter((project: ProjectType) =>
          currentProjectIds.includes(project.id),
        );
        setCurrentProjects(filteredProjects);
      } catch {
        setCurrentProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();

    // Cleanup function
    return () => {
      document.documentElement.classList.remove("color-scheme-adaptive");
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto space-y-16 pb-12 w-full"
    >
      <TLDR />
      <ImportantDocuments />
      <AboutSection />
      <WorkExperienceSection />
      <EducationSection />
      {SHOW_GITHUB_CHART && <GitHubChart username={GITHUB_USERNAME} />}
      <ProjectsSection
        projects={currentProjects}
        loading={loading}
        error={null}
      />
      <Socials />
      <WhatDrivesMe />
      <WhoDrivesMe />
      <RecentActivity />
      <TechnicalExpertiseSection />
    </motion.div>
  );
}
