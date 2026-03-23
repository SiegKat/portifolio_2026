import { useTranslation } from "react-i18next";

export function WhatDrivesMe() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{t("drives.whatTitle")}</h2>

      <div className="relative">
        <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
          <p className="text-xl italic font-light">
            {t("drives.whatQuote")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="leading-relaxed">
              {t("drives.whatP1")}
            </p>

            <p className="leading-relaxed">
              {t("drives.whatP2")}
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
            <img
              src="/assets/About/what-drives-me-v2.jpg"
              alt={t("drives.whatImageAlt")}
              className="w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export function WhoDrivesMe() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{t("drives.whoTitle")}</h2>

      <div className="relative">
        <div className="pl-6 border-l-4 border-[var(--color-primary)] py-1">
          <p className="text-xl italic font-light">
            {t("drives.whoQuote")}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="leading-relaxed">
              {t("drives.whoP1")}
            </p>

            <p className="leading-relaxed">
              {t("drives.whoP2")}
            </p>
          </div>

          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[color-mix(in_oklch,var(--color-primary)_20%,transparent)] to-transparent z-10"></div>
            <img
              src="/assets/About/drive.jpg"
              alt={t("drives.whoImageAlt")}
              className="w-full h-full"
              onError={(e) => {
                (e.target as HTMLImageElement).parentElement!.classList.add(
                  "bg-[color-mix(in_oklch,var(--color-primary)_10%,transparent)]",
                );
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
