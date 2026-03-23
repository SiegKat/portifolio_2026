import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function NavigationBar() {
  const { t } = useTranslation();

  return (
    <div className="top-0">
      <nav className="border-b border-[color-mix(in_oklch,var(--color-primary)_5%,transparent)] bg-background/80 backdrop-blur-sm relative z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <div className="flex gap-6 mx-auto">
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                }
              >
                {t("nav.about")}
              </NavLink>
              <NavLink
                to="/projects"
                className={({ isActive }) =>
                  `transition-all ${isActive ? "font-bold border-b-2 border-current" : "hover:text-[var(--color-primary)]"}`
                }
              >
                {t("nav.projects")}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
