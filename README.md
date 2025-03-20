


## Performance Profiling

### Initial Performance Metrics

Performance metrics were collected using React Dev Tools Profiler:

#### Commit Duration
- Initial render: ~25.41ms
- Average commit: ~12.71ms
- Peak commit: ~48.50ms

#### Component Render Times
1. App: ~43.40ms
2. CountriesGrid: ~43.00ms
3. CountryCard-Georgia: ~0.80ms
4. CountryCard-New Caledonia: ~0.50ms
5. CountryCard-Mozambique: ~0.50ms
6. CountryCard-Falkland Islands: ~0.40ms
7. CountryCard-Chad: ~0.40ms
8. CountryCard-Panama: ~0.40ms
9. CountryCard-Anguilla: ~0.40ms
10. Filters: ~0.30ms
  #### User Interactions
- user-changed-filter

#### Performance Summary
- Total components rendered: 253
- Average render duration: 0.46ms
- Average base duration: 0.45ms
- Potential wasted renders: 154

#### Flame Graph Analysis
Long Rendering Components (>16ms):
- CountriesGrid (43.00ms)
- App (43.40ms)
    
