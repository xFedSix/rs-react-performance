import { memo } from "react";

interface FiltersProps {
  searchQuery: string;
  selectedRegion: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onSortChange: (value: string) => void;
}
const regions = [
  { value: "", label: "All regions" },
  { value: "Africa", label: "Africa" },
  { value: "Americas", label: "America" },
  { value: "Asia", label: "Asia" },
  { value: "Europe", label: "Europe" },
  { value: "Oceania", label: "Oceania" },
] as const;

const sortOptions = [
  { value: "", label: "Sorting" },
  { value: "name-asc", label: "By name (A-Z)" },
  { value: "name-desc", label: "By name (Z-A)" },
  { value: "population-asc", label: "By population (increase)" },
  { value: "population-desc", label: "By population (decreasing)" },
] as const;

export const Filters = memo(
  ({
    searchQuery,
    selectedRegion,
    sortBy,
    onSearchChange,
    onRegionChange,
    onSortChange,
  }: FiltersProps) => {
    return (
      <div className="filters">
        <input
          type="text"
          placeholder="Country search..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />

        <select
          value={selectedRegion}
          onChange={(e) => onRegionChange(e.target.value)}
          className="region-select"
        >
          {regions.map(({ value, label }) => (
            <option key={`region-${value || "all"}`} value={value}>
              {label}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="sort-select"
        >
          {sortOptions.map(({ value, label }) => (
            <option key={`sort-${value || "default"}`} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);

Filters.displayName = "Filters";
