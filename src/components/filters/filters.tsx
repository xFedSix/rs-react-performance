interface FiltersProps {
  searchQuery: string;
  selectedRegion: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onRegionChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

export const Filters = ({
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
        <option value="">All regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">America</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="">Sorting</option>
        <option value="name-asc">By name (A-Z)</option>
        <option value="name-desc">By name (Z-A)</option>
        <option value="population-asc">By population (increase)</option>
        <option value="population-desc">By population (decreasing)</option>
      </select>
    </div>
  );
};
