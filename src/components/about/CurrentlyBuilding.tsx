import { useTranslation } from "react-i18next";

export default function CurrentlyBuildingSection() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6 mb-12 pb-8 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
      <div className="flex items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center">
          <span className="inline-flex items-center justify-center w-8 h-8 mr-3 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
            <span className="animate-pulse relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[var(--color-primary)]"></span>
            </span>
          </span>
          {t("currentlyBuilding.heading")}
        </h2>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2 flex justify-center">
          <div className="w-full max-w-md rounded-lg overflow-hidden bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] flex items-center justify-center p-8">
            <img src="/assets/logos/net.png" alt="NET" className="max-w-[200px] h-auto object-contain" />
          </div>
        </div>

        <div className="md:w-1/2">
          <h3 className="text-2xl font-bold mb-2">{t("currentlyBuilding.projectTitle")}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] animate-pulse">
              {t("currentlyBuilding.tagInProgress")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("currentlyBuilding.tagMultiAgent")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("currentlyBuilding.tagRag")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("currentlyBuilding.tagEdtech")}
            </span>
          </div>

          <p className="text-lg mb-4">
            {t("currentlyBuilding.description")}
          </p>

          <a
            href="https://github.com/SiegKat"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[var(--color-primary)] hover:underline"
          >
            {t("currentlyBuilding.viewGithub")}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
