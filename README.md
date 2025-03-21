


## Performance Profiling

### Initial Performance Metrics

Performance metrics were collected using React Dev Tools Profiler:

#### Commit Duration
- Initial render: ~19.81ms
- Average commit: ~9.90ms
- Peak commit: ~98.60ms

#### Component Render Times
1. App: ~96.70ms
2. CountriesGrid: ~92.90ms
3. App: ~89.10ms
4. CountriesGrid: ~87.10ms
5. App: ~45.90ms
6. CountriesGrid: ~45.20ms
7. CountriesGrid: ~31.90ms
8. App: ~31.90ms
9. CountryCard-South Georgia: ~24.80ms
10. CountryCard-South Georgia: ~11.00ms
  #### User Interactions
- user-changed-filter

#### Performance Summary
- Total components rendered: 1465
- Average render duration: 0.59ms
- Average base duration: 0.47ms
- Potential wasted renders: 452

#### Flame Graph Analysis
Long Rendering Components (>16ms):
- CountryCard-South Georgia (24.80ms)
- CountriesGrid (92.90ms)
- App (96.70ms)
- CountriesGrid (31.90ms)
- App (31.90ms)
- CountriesGrid (87.10ms)
- App (89.10ms)
- CountriesGrid (45.20ms)
- App (45.90ms)
    
