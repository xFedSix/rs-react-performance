import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

interface ProfileData {
  timelineData: Array<{
    schedulingEvents: Array<{
      componentName?: string;
      timestamp: number;
      type: string;
      warning: string | null;
      componentStack: string;
    }>;
  }>;
}

function analyzeProfile(filepath: string) {
  try {
    const data = readFileSync(filepath, "utf8");
    const profile: ProfileData = JSON.parse(data);

    const componentStats = new Map<
      string,
      {
        updates: number;
        warnings: string[];
        avgTimeBetweenUpdates: number;
        lastUpdateTime: number;
      }
    >();

    profile.timelineData[0].schedulingEvents.forEach((event) => {
      if (event.componentName) {
        const stats = componentStats.get(event.componentName) || {
          updates: 0,
          warnings: [],
          avgTimeBetweenUpdates: 0,
          lastUpdateTime: 0,
        };

        stats.updates++;

        if (event.warning) {
          stats.warnings.push(event.warning);
        }

        if (stats.lastUpdateTime > 0) {
          const timeDiff = event.timestamp - stats.lastUpdateTime;
          stats.avgTimeBetweenUpdates =
            (stats.avgTimeBetweenUpdates * (stats.updates - 1) + timeDiff) /
            stats.updates;
        }

        stats.lastUpdateTime = event.timestamp;

        componentStats.set(event.componentName, stats);
      }
    });

    console.log("\nАнализ производительности компонентов:");
    console.log("=====================================");

    componentStats.forEach((stats, component) => {
      console.log(`\nКомпонент: ${component}`);
      console.log(`Количество обновлений: ${stats.updates}`);
      console.log(
        `Среднее время между обновлениями: ${stats.avgTimeBetweenUpdates.toFixed(2)}ms`,
      );

      if (stats.warnings.length > 0) {
        console.log("Предупреждения:", stats.warnings);
      }
    });

    const frequentUpdates = [...componentStats.entries()]
      .filter(([, stats]) => stats.updates > 10)
      .map(([name]) => name);

    if (frequentUpdates.length > 0) {
      console.log("\nКомпоненты с частыми обновлениями (>10):");
      frequentUpdates.forEach((name) => console.log(`- ${name}`));
      console.log(
        "\nРекомендации: Рассмотрите использование React.memo или useMemo для этих компонентов",
      );
    }
  } catch (error) {
    console.error("Ошибка при анализе профиля:", error);
  }
}

function analyzeProfiles() {
  try {
    const profileFiles = [
      "profiling-data.20.03.2025.22-55-09.json",
      "profiling-data.21.03.2025.11-29-52.json",
    ];

    profileFiles.forEach((filename) => {
      const filepath = resolve(process.cwd(), filename);

      if (!existsSync(filepath)) {
        console.log(`Файл ${filename} не найден`);
        return;
      }

      console.log(`\nАнализ файла: ${filename}`);
      console.log("=====================================");

      analyzeProfile(filepath);
    });
  } catch (error) {
    console.error("Ошибка при анализе профилей:", error);
  }
}
analyzeProfiles();
