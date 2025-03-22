import { useCallback, useMemo, useState } from "react";
import "./App.css";
import { useFetchCountries } from "./api/fetchCountries";
import { Filters } from "./components/filters/filters";
import { CountryCard } from "./components/countryCard/countryCard";
import { ProfileWrapper } from "./utils/profiler";
// import { ProfileLogger } from "./utils/profileLogger";

function App() {
  const { countries, isLoading, error } = useFetchCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortBy, setSortBy] = useState("");

  //This comment for myself: Use for update ReadmeFile of React metrics.
  //Add to the package.json
  // "dev:server": "ts-node --project tsconfig.node.json src/server/index.ts",
  // "dev:vite": "vite",
  // "dev:init": "npm run update-metrics && wait-on tcp:3001",
  // "dev": "concurrently \"npm run dev:init\" \"npm run dev:server\" \"npm run dev:vite\"",

  // useEffect(() => {
  //   // ProfileLogger.clearMetrics();
  //   return () => {
  //     ProfileLogger.updateReadme().catch(console.error);
  //   };
  // }, []);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const handleRegionChange = useCallback((value: string) => {
    setSelectedRegion(value);
  }, []);

  const handleSortChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  const filteredCountries = useMemo(() => {
    return countries
      .filter((country) => {
        const matchesSearch = country.name.common
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
        const matchesRegion = selectedRegion
          ? country.region === selectedRegion
          : true;
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "name-asc":
            return a.name.common.localeCompare(b.name.common);
          case "name-desc":
            return b.name.common.localeCompare(a.name.common);
          case "population-asc":
            return a.population - b.population;
          case "population-desc":
            return b.population - a.population;
          default:
            return 0;
        }
      });
  }, [countries, searchQuery, selectedRegion, sortBy]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ProfileWrapper id="App">
      <div className="container">
        <ProfileWrapper id="Filters" interaction="user-changed-filter">
          <Filters
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            sortBy={sortBy}
            onSearchChange={handleSearchChange}
            onRegionChange={handleRegionChange}
            onSortChange={handleSortChange}
          />
        </ProfileWrapper>
        <ProfileWrapper id="CountriesGrid">
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <ProfileWrapper
                key={country.name.common}
                id={`CountryCard-${country.name.common}`}
              >
                <CountryCard
                  name={country.name.common}
                  flagUrl={country.flags.png}
                  population={country.population}
                  region={country.region}
                />
              </ProfileWrapper>
            ))}
          </div>
        </ProfileWrapper>
      </div>
    </ProfileWrapper>
  );
}

export default App;
