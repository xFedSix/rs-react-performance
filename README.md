## Performance Profiling before memorization

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

### Screenshots

![screenshot](./src/assets/Screenshot%202025-03-21_before.png)
![screenshot](./src/assets/Screenshot%202025-03-21%20_before_2.png)

## Performance Profiling after memorization

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

### Screenshots

![screenshot](./src/assets/Screenshot%202025-03-21%20120701.png)
![screenshot](./src/assets/Screenshot%202025-03-21%20120730.png)
