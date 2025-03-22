import { memo, useCallback, useEffect, useState } from "react";
import { usePerformanceMetrics } from "../../hooks/usePerformanceMetrics";

interface CountryCardProps {
  name: string;
  flagUrl: string;
  population: number;
  region: string;
}
const VISITED_COUNTRIES_KEY = "visitedCountries";

export const CountryCard = memo(
  ({ name, flagUrl, population, region }: CountryCardProps) => {
    usePerformanceMetrics(`CountryCard-${name}`);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisited, setIsVisited] = useState(false);

    useEffect(() => {
      const visitedCountries = JSON.parse(
        localStorage.getItem(VISITED_COUNTRIES_KEY) || "[]",
      );
      setIsVisited(visitedCountries.includes(name));
    }, [name]);

    const toggleVisited = useCallback(() => {
      const visitedCountries = JSON.parse(
        localStorage.getItem(VISITED_COUNTRIES_KEY) || "[]",
      );
      if (!visitedCountries.includes(name)) {
        const updatedVisited = [...visitedCountries, name];
        localStorage.setItem(
          VISITED_COUNTRIES_KEY,
          JSON.stringify(updatedVisited),
        );
        setIsVisited(true);
      }
      setIsExpanded((prev) => !prev);
    }, [name]);

    return (
      <div
        className={`country-card ${isExpanded ? "expanded" : ""} ${
          isVisited ? "visited" : ""
        }`}
        onClick={toggleVisited}
      >
        <img src={flagUrl} alt={`Flag ${name}`} className="country-flag" />
        <div className="country-title">
          <h2>{name}</h2>
          {isVisited && <span className="visited-mark">✓ Visited</span>}
        </div>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
      </div>
    );
  },
);

CountryCard.displayName = "CountryCard";
