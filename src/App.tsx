import { useState } from "react";
import "./App.css";
import { useFetchCountries } from "./api/fetchCountries";
import { Filters } from "./components/filters/filters";
import { CountryCard } from "./components/countryCard/countryCard";
import { ProfileWrapper } from "./utils/profiler";

function App() {
  const { countries, isLoading, error } = useFetchCountries();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [sortBy, setSortBy] = useState("");

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredCountries = countries
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

  return (
    <ProfileWrapper id="App">
      <div className="container">
        <ProfileWrapper id="Filters">
          <Filters
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
            sortBy={sortBy}
            onSearchChange={setSearchQuery}
            onRegionChange={setSelectedRegion}
            onSortChange={setSortBy}
          />
        </ProfileWrapper>
        <ProfileWrapper id="CountriesGrid">
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <ProfileWrapper
                id={`CountryCard-${country.name.common}`}
                key={country.name.common}
              >
                <CountryCard
                  key={country.name.common}
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
