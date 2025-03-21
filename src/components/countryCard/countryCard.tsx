import { memo } from "react";
import { usePerformanceMetrics } from "../../hooks/usePerformanceMetrics";

interface CountryCardProps {
  name: string;
  flagUrl: string;
  population: number;
  region: string;
}

export const CountryCard = memo(
  ({ name, flagUrl, population, region }: CountryCardProps) => {
    usePerformanceMetrics(`CountryCard-${name}`);

    return (
      <div className="country-card">
        <img src={flagUrl} alt={`Flag ${name}`} className="country-flag" />
        <h2>{name}</h2>
        <p>Population: {population.toLocaleString()}</p>
        <p>Region: {region}</p>
      </div>
    );
  },
);

CountryCard.displayName = "CountryCard";
