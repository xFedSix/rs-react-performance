## Performance Profiling

### Initial Performance Metrics

Performance metrics were collected using React Dev Tools Profiler:

#### Commit Duration

- Initial render: ~50ms
- Filter updates: ~15ms
- Sort updates: ~20ms

#### Component Render Times

- App: ~45ms
- Filters: ~5ms
- CountryCard: ~2ms per card

#### Key Findings

- Main bottleneck: Initial data fetch and rendering of country cards
- Filter operations are relatively fast
- Sort operations show moderate performance impact

### Performance Improvements

- Implemented React.memo for CountryCard components
- Added debouncing for search input
- Optimized sorting algorithm
- Used virtualization for country grid
