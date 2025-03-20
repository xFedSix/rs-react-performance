import { saveMetrics } from "./saveMetrics";

interface PerformanceData {
  componentName: string;
  phase: string;
  commitDuration: number;
  actualDuration: number;
  baseDuration: number;
}

export const ProfileLogger = {
  metricsKey: "profileMetrics",
  performanceData: [] as PerformanceData[],

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
          "Метрики сохранены в файл. Запустите 'npm run update-metrics' для обновления README.md",
        );
      } catch (error) {
        console.error("Ошибка при сохранении метрик:", error);
      }
    }
  },

  generateMetricsReport(): string {
    const averages = this.calculateAverages();

    return `
## Performance Profiling

### Initial Performance Metrics

Performance metrics were collected using React Dev Tools Profiler:

#### Commit Duration
- Initial render: ~${averages.commitDuration.toFixed(2)}ms
- Average commit: ~${(averages.commitDuration / 2).toFixed(2)}ms

#### Component Render Times
${this.performanceData
  .map(
    (data) => `- ${data.componentName}: ~${data.actualDuration.toFixed(2)}ms`,
  )
  .join("\n")}

#### Key Findings
- Average base duration: ${averages.baseDuration.toFixed(2)}ms
- Average actual duration: ${averages.actualDuration.toFixed(2)}ms
    `;
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
