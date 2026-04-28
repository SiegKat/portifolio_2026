import { useTranslation } from "react-i18next";

export default function TLDR() {
  const { t } = useTranslation();
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{t("tldr.heading")}</h2>
      <p>
        <b>{t("tldr.currently")}</b> <br />
        <a
          onClick={() => scrollToSection("education")}
          className="text-[var(--color-primary)] hover:underline cursor-pointer"
        >
          {t("tldr.degreeLink")}
        </a>
        {t("tldr.buildingAt")}{" "}
        <a
          href="https://www.instagram.com/sieg.ia/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          SIEG IA
        </a>
        {" "}{t("tldr.and")}{" "}
        <a
          href="https://net-support-n9at85egr-siegkats-projects.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-primary)] hover:underline"
        >
          NET
        </a>
        {t("tldr.followersEnd")}
      </p>
    </div>
  );
}
