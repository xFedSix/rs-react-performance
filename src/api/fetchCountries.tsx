import { useState, useEffect } from "react";

interface Country {
  name: {
    common: string;
  };
  flags: {
    png: string;
  };
  population: number;
  region: string;
}

export const useFetchCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to load data");
        }
        const data = await response.json();
        setCountries(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error has occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { countries, isLoading, error };
};
