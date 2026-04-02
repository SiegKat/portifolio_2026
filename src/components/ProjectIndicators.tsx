import React, { useState, useEffect, useRef } from "react";
import { Brain, Rocket, Lightbulb } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../styles/animations.css";
import NumberDisplay from "./NumberDisplay";

const COUNTS_KEY = "projectIndicatorCounts";
const INTERACTIONS_KEY = "projectIndicators";

let amplifyClient: any = null;

async function getAmplifyClient() {
  if (amplifyClient !== undefined && amplifyClient !== null) return amplifyClient;
  try {
    const { generateClient } = await import("aws-amplify/data");
    amplifyClient = generateClient();
    return amplifyClient;
  } catch {
    amplifyClient = null;
  }
  return null;
}

function getLocalCount(indicatorId: string): number {
  try {
    const raw = localStorage.getItem(COUNTS_KEY);
    const counts = raw ? JSON.parse(raw) : {};
    return counts[indicatorId] ?? 0;
  } catch {
    return 0;
  }
}

function setLocalCount(indicatorId: string, value: number) {
  try {
    const raw = localStorage.getItem(COUNTS_KEY);
    const counts = raw ? JSON.parse(raw) : {};
    counts[indicatorId] = value;
    localStorage.setItem(COUNTS_KEY, JSON.stringify(counts));
  } catch { /* ignore */ }
}

type IndicatorType = "clever" | "launch" | "inspired";

type AnimatedIndicatorProps = {
  icon: React.ElementType;
  label: string;
  color: string;
  animationClass: string;
  indicatorType: IndicatorType;
  projectId: string;
  compact?: boolean;
};

const AnimatedIndicator: React.FC<AnimatedIndicatorProps> = ({
  icon: Icon,
  label,
  color,
  animationClass,
  indicatorType,
  projectId,
  compact = false,
}) => {
  const [count, setCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);
  const [showCountIndicator, setShowCountIndicator] = useState<boolean>(false);
  const clientRef = useRef<any>(null);

  const indicatorId = `${projectId}_${indicatorType}`;

  useEffect(() => {
    let isMounted = true;

    async function init() {
      const localCount = getLocalCount(indicatorId);
      if (isMounted) setCount(localCount);

      try {
        const client = await getAmplifyClient();
        if (client && isMounted) {
          clientRef.current = client;
          const response = await client.models.ProjectIndicator.get({ id: indicatorId });
          if (isMounted && response.data) {
            const remoteCount = response.data.count ?? 0;
            const best = Math.max(remoteCount, localCount);
            setCount(best);
            setLocalCount(indicatorId, best);
          }
        }
      } catch {
        // Amplify unavailable; localStorage counts are used
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    init();
    return () => { isMounted = false; };
  }, [indicatorId]);

  const handleClick = async () => {
    if (isLoading) return;

    const newCount = count + 1;

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    setShowCountIndicator(true);
    setTimeout(() => setShowCountIndicator(false), 2000);

    setCount(newCount);
    setLocalCount(indicatorId, newCount);

    try {
      const raw = localStorage.getItem(INTERACTIONS_KEY);
      const interactions = raw ? JSON.parse(raw) : {};
      interactions[indicatorId] = true;
      localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(interactions));
    } catch { /* ignore */ }

    if (clientRef.current) {
      try {
        await clientRef.current.models.ProjectIndicator.update({
          id: indicatorId,
          count: newCount,
          indicatorType,
          projectId,
        });
      } catch {
        // Remote sync failed; local count is preserved
      }
    }
  };

  return (
    <div className="flex items-center justify-center relative">
      <div className="relative flex items-center">
        {showCountIndicator && (
          <div
            className={`absolute -top-${compact ? "6" : "8"} left-${compact ? "3" : "5"} transform px-2 py-${compact ? "0.5" : "1"} rounded-full ${compact ? "text-[10px]" : "text-xs"} animate-fade-up`}
            style={{ color: color, fontWeight: "bold" }}
          >
            +1
          </div>
        )}
        <div>
          <button
            className={`flex items-center justify-center rounded-full ${compact ? "p-2" : "p-3"} transition-transform cursor-pointer ${isAnimating ? "scale-110" : ""}`}
            onClick={handleClick}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            disabled={isLoading}
          >
            <Icon
              stroke={color}
              size={compact ? 18 : 24}
              style={{ fill: "none" }}
              className={`transition-all duration-300 ${isAnimating ? animationClass : ""}`}
            />

            {showTooltip && (
              <span
                className={`absolute left-0 bottom-full ${compact ? "mb-1" : "mb-2"} px-2 py-1 bg-gray-800 text-white ${compact ? "text-[10px]" : "text-xs"} rounded whitespace-nowrap z-10`}
              >
                {label}
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-800"></span>
              </span>
            )}
          </button>
        </div>

        <div className={`ml-${compact ? "2" : "3"}`}>
          <NumberDisplay value={count} />
        </div>
      </div>
    </div>
  );
};

// Main component with the three indicators
interface ProjectIndicatorsProps {
  projectId: string;
  compact?: boolean;
}

const ProjectIndicators: React.FC<ProjectIndicatorsProps> = ({
  projectId,
  compact = false,
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`flex items-center justify-center ${compact ? "space-x-6" : "space-x-10"}`}
    >
      <AnimatedIndicator
        icon={Brain}
        label={t("projectIndicators.clever")}
        color="#059669"
        animationClass="animate-rotate"
        indicatorType="clever"
        projectId={projectId}
        compact={compact}
      />
      <AnimatedIndicator
        icon={Rocket}
        label={t("projectIndicators.launchIt")}
        color="#8b5cf6"
        animationClass="animate-fly-up"
        indicatorType="launch"
        projectId={projectId}
        compact={compact}
      />
      <AnimatedIndicator
        icon={Lightbulb}
        label={t("projectIndicators.inspired")}
        color="#f59e0b"
        animationClass="animate-pulse-expand"
        indicatorType="inspired"
        projectId={projectId}
        compact={compact}
      />
    </div>
  );
};

export default ProjectIndicators;
