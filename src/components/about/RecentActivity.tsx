import { useTranslation } from "react-i18next";

export default function RecentActivity() {
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
          {t("recentActivity.heading")}
        </h2>
      </div>

      <div className="flex flex-col items-center gap-8 mb-12">
        <div className="w-full max-w-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">{t("recentActivity.hackathonTitle")}</h3>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
              {t("recentActivity.tagAward")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("recentActivity.tagMultiAgent")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("recentActivity.tagHackathon")}
            </span>
          </div>

          <p className="text-lg mb-4">
            {t("recentActivity.hackathonBody")}
          </p>
          <div className="mt-4 rounded-xl overflow-hidden border border-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
            <img
              src="/assets/About/hackathon-award.jpg"
              alt={t("recentActivity.hackathonTitle")}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">{t("recentActivity.speechTitle")}</h3>
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_20%,transparent)]">
              {t("recentActivity.tagAward")}
            </span>
            <span className="px-3 py-1 rounded-full text-xs bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]">
              {t("recentActivity.tagPublicSpeaking")}
            </span>
          </div>

          <p className="text-lg mb-4">
            {t("recentActivity.speechBody")}
          </p>
        </div>
      </div>
    </section>
  );
}
