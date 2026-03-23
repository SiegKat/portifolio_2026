import { useTranslation } from "react-i18next";

export default function EducationSection() {
  const { t } = useTranslation();
  return (
    <section className="space-y-6">
      <h2 className="text-3xl font-bold">{t("education.heading")}</h2>

      {/* FAU - M.S. in AI */}
      <div
        id="education"
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <img src="/assets/logos/fau.png" alt="FAU" className="w-full h-full object-contain" />
            </div>
            <div className="mt-4 text-center">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                {t("education.fauYears")}
              </span>
            </div>
          </div>

          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
              {t("education.fauSchool")}
            </h3>
            <p className="text-lg font-semibold mt-1">
              {t("education.fauDegree")}
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="font-medium">{t("education.fauAchievement1Title")}</p>
                  <p className="text-sm opacity-75">
                    {t("education.fauAchievement1Body")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <div>
                  <p className="font-medium">{t("education.fauFocusTitle")}</p>
                  <p className="text-sm opacity-75">
                    {t("education.fauFocusBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UFF - Mechanical Engineering */}
      <div
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <img src="/assets/logos/uff.png" alt="UFF" className="w-full h-full object-contain" />
            </div>
            <div className="mt-4 text-center">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                {t("education.uffMeYears")}
              </span>
            </div>
          </div>

          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
              {t("education.uffSchool")}
            </h3>
            <p className="text-lg font-semibold mt-1">
              {t("education.uffMeDegree")}
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                <div>
                  <p className="font-medium">{t("education.uffMeAchievement1Title")}</p>
                  <p className="text-sm opacity-75">
                    {t("education.uffMeAchievement1Body")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                <div>
                  <p className="font-medium">{t("education.uffMeAchievement2Title")}</p>
                  <p className="text-sm opacity-75">
                    {t("education.uffMeAchievement2Body")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* UFF - Computational Physics */}
      <div
        className="p-6 rounded-xl border border-transparent hover:border hover:border-[color-mix(in_oklch,var(--color-primary)_30%,transparent)] transition-all hover:shadow-lg"
      >
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4 flex flex-col items-center">
            <div className="w-32 h-32 rounded-lg overflow-hidden relative">
              <img src="/assets/logos/uff.png" alt="UFF" className="w-full h-full object-contain" />
            </div>
            <div className="mt-4 text-center">
              <span className="px-2 py-1 text-xs rounded-full bg-[color-mix(in_oklch,var(--color-primary)_15%,transparent)]">
                {t("education.uffCpYears")}
              </span>
            </div>
          </div>

          <div className="md:w-3/4">
            <h3 className="text-2xl font-bold text-[color-mix(in_oklch,var(--color-primary)_90%,currentColor)]">
              {t("education.uffSchool")}
            </h3>
            <p className="text-lg font-semibold mt-1">
              {t("education.uffCpDegree")}
            </p>
            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[var(--color-primary)] mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div>
                  <p className="font-medium">{t("education.uffCpNoteTitle")}</p>
                  <p className="text-sm opacity-75">
                    {t("education.uffCpNoteBody")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
