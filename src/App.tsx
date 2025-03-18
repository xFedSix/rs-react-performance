import "./App.css";
import { useFetchCountries } from "./api/fetchCountries";

function App() {
  const { countries, isLoading, error } = useFetchCountries();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="countries-grid">
      {countries.map((country) => (
        <div key={country.name.common} className="country-card">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="country-flag"
          />
          <h2>{country.name.common}</h2>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Region: {country.region}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
