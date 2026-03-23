import { useTranslation } from "react-i18next";

export default function WorkExperienceSection() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{t("work.heading")}</h2>

      <div className="grid grid-cols-1 gap-8">
        {/* NET - AI Engineer */}
        <div
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src="/assets/logos/net.png" alt="NET" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm mt-2 opacity-75">{t("work.netDate")}</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">{t("work.netCompany")}</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                {t("work.netRole")}
              </p>

              <p className="mt-3 text-sm/relaxed">
                {t("work.netDescP1")}
              </p>
              <p className="mt-2 text-sm/relaxed">
                {t("work.netDescP2")}
              </p>
            </div>
          </div>
        </div>

        {/* SIEG IA */}
        <div
          className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] hover:shadow-lg"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-4">
            <div className="md:w-1/4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img src="/assets/logos/siegia.png" alt="SIEG IA" className="w-full h-full object-cover" />
              </div>
              <p className="text-sm mt-2 opacity-75">{t("work.siegDate")}</p>
            </div>

            <div className="md:w-3/4">
              <h3 className="text-xl font-semibold">{t("work.siegCompany")}</h3>
              <p className="text-base font-medium text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
                {t("work.siegRole")}
              </p>

              <p className="mt-3 text-sm/relaxed">
                {t("work.siegDesc")}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href="https://www.instagram.com/sieg.ia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs px-3 py-1 rounded-full bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)] hover:bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)] transition-colors"
                >
                  <span>{t("work.siegLink")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
