import { useTranslation } from "react-i18next";

const RESUME_FILES: Record<string, string> = {
  pt: "/assets/PDF/Thiago_Costa_Resume.pdf",
  en: "/assets/PDF/New_Resume_EN.pdf",
};

export default function ImportantDocuments() {
    const { t, i18n } = useTranslation();
    const resumeHref = i18n.language?.startsWith("pt")
      ? RESUME_FILES.pt
      : RESUME_FILES.en;

  return (
    <div className="mt-8 mb-8 pb-6 border-b border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
        <h3 className="text-lg font-semibold mb-4">{t("documents.heading")}</h3>
        <div className="flex flex-wrap gap-3">
            <a
            href={resumeHref}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm rounded-lg border border-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] transition-colors"
            >
            {t("documents.resumeLabel")}
            </a>
        </div>
    </div>
  );
}
