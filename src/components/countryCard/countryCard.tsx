interface CountryCardProps {
  name: string;
  flagUrl: string;
  population: number;
  region: string;
}

export const CountryCard = ({
  name,
  flagUrl,
  population,
  region,
}: CountryCardProps) => {
  return (
    <div className="country-card">
      <img src={flagUrl} alt={`Flag ${name}`} className="country-flag" />
      <h2>{name}</h2>
      <p>Population: {population.toLocaleString()}</p>
      <p>Region: {region}</p>
    </div>
  );
};
