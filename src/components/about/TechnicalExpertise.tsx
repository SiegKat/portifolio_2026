import { useTranslation } from "react-i18next";

export default function TechnicalExpertiseSection() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{t("skills.heading")}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-2 p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all">
          <h3 className="text-xl font-semibold mb-4">{t("skills.coreSkills")}</h3>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{t("skills.categoryAiMl")}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  {t("skills.levelAdvanced")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Supervised / Unsupervised ML",
                  "Deep Learning",
                  "LLMs",
                  "RAG",
                  "Multi-Agent Systems",
                  "NLP",
                  "Prompt Engineering",
                  "Model Evaluation",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{t("skills.categoryLibs")}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  {t("skills.levelAdvanced")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "PyTorch",
                  "scikit-learn",
                  "pandas",
                  "NumPy",
                  "matplotlib",
                  "LangChain",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium">{t("skills.categoryDataTools")}</h4>
                <span className="text-xs px-2 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                  {t("skills.levelProficient")}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Exploratory Data Analysis",
                  "Data Visualization",
                  "Git / GitHub",
                  "Vector DBs",
                  "Ollama",
                  "Chroma",
                  "FAISS",
                  "Prototyping",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs rounded-md bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)]">
          <h3 className="text-xl font-semibold mb-4">{t("skills.programmingLangs")}</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Python</span>
                <span className="text-xs">95%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">SQL</span>
                <span className="text-xs">80%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">C / C++</span>
                <span className="text-xs">65%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "65%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">HTML / LaTeX</span>
                <span className="text-xs">60%</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4 mt-8">{t("skills.spokenLangs")}</h3>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Portuguese</span>
                <span className="text-xs">{t("skills.native")}</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">English</span>
                <span className="text-xs">{t("skills.fluent")}</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium">Spanish</span>
                <span className="text-xs">{t("skills.intermediate")}</span>
              </div>
              <div className="h-2 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)]"
                  style={{ width: "55%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
