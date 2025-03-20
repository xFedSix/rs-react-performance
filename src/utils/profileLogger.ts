import { saveMetrics } from "./saveMetrics";

interface PerformanceData {
  componentName: string;
  phase: string;
  commitDuration: number;
  actualDuration: number;
  baseDuration: number;
  interaction?: string;
}

export const ProfileLogger = {
  metricsKey: "profileMetrics",
  performanceData: [] as PerformanceData[],

  // clearMetrics(): void {
  //   this.performanceData = [];
  //   localStorage.removeItem(this.metricsKey);
  // },

  logPerformance(data: PerformanceData): void {
    this.performanceData.push(data);
    const metrics = this.generateMetricsReport();

    localStorage.setItem(
      this.metricsKey,
      JSON.stringify({
        timestamp: Date.now(),
        metrics: metrics,
      }),
    );
  },

  async updateReadme(): Promise<void> {
    const metrics = localStorage.getItem(this.metricsKey);
    if (metrics) {
      try {
        saveMetrics(metrics);
        console.log(
          "Metrics are saved to file. Run 'npm run update-metrics' to update README.md",
        );
      } catch (error) {
        console.error("Error saving metrics:", error);
      }
    }
  },

  generateMetricsReport(): string {
    const averages = this.calculateAverages();
    const rankedComponents = this.getRankedComponents();
    const uniqueInteractions = this.getUniqueInteractions();

    return `
## Performance Profiling

### Initial Performance Metrics

Performance metrics were collected using React Dev Tools Profiler:

#### Commit Duration
- Initial render: ~${averages.commitDuration.toFixed(2)}ms
- Average commit: ~${(averages.commitDuration / 2).toFixed(2)}ms
- Peak commit: ~${Math.max(...this.performanceData.map((d) => d.commitDuration)).toFixed(2)}ms

#### Component Render Times
${rankedComponents
  .map(
    (data, index) =>
      `${index + 1}. ${data.componentName}: ~${data.actualDuration.toFixed(2)}ms`,
  )
  .join("\n")}
  #### User Interactions
${
  uniqueInteractions.length
    ? uniqueInteractions.map((int) => `- ${int}`).join("\n")
    : "- No recorded interactions"
}

#### Performance Summary
- Total components rendered: ${this.performanceData.length}
- Average render duration: ${averages.actualDuration.toFixed(2)}ms
- Average base duration: ${averages.baseDuration.toFixed(2)}ms
- Potential wasted renders: ${this.calculateWastedRenders()}

#### Flame Graph Analysis
Long Rendering Components (>16ms):
${this.getLongRenderingComponents()
  .map((c) => `- ${c.componentName} (${c.actualDuration.toFixed(2)}ms)`)
  .join("\n")}
    `;
  },

  getRankedComponents(): PerformanceData[] {
    return [...this.performanceData]
      .sort((a, b) => b.actualDuration - a.actualDuration)
      .slice(0, 10);
  },

  getUniqueInteractions(): string[] {
    return [
      ...new Set(
        this.performanceData
          .filter((d) => d.interaction)
          .map((d) => d.interaction)
          .filter(
            (interaction): interaction is string => interaction !== undefined,
          ),
      ),
    ];
  },

  calculateWastedRenders(): number {
    return this.performanceData.filter(
      (d) => d.actualDuration < 0.1 && d.phase !== "mount",
    ).length;
  },

  getLongRenderingComponents(): PerformanceData[] {
    return this.performanceData.filter((d) => d.actualDuration > 16);
  },

  calculateAverages() {
    const total = this.performanceData.reduce(
      (acc, data) => ({
        commitDuration: acc.commitDuration + data.commitDuration,
        actualDuration: acc.actualDuration + data.actualDuration,
        baseDuration: acc.baseDuration + data.baseDuration,
      }),
      { commitDuration: 0, actualDuration: 0, baseDuration: 0 },
    );

    const count = this.performanceData.length || 1;

    return {
      commitDuration: total.commitDuration / count,
      actualDuration: total.actualDuration / count,
      baseDuration: total.baseDuration / count,
    };
  },

  updatePerformanceSection(readme: string, metrics: string): string {
    const performanceSection = /## Performance Profiling[\s\S]*?(?=##|$)/;

    if (performanceSection.test(readme)) {
      return readme.replace(performanceSection, metrics);
    }

    return `${readme}\n${metrics}`;
  },
};
