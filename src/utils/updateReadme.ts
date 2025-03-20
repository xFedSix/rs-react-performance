import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
import { getStoredMetrics } from "./metrics-temp";

config();

const README_PATH = path.resolve(process.cwd(), "README.md");

function updateReadmeFile(): void {
  try {
    const metricsData = getStoredMetrics();

    if (!metricsData) {
      console.error("Метрики не найдены");
      return;
    }

    const currentContent = fs.readFileSync(README_PATH, "utf8");
    const performanceSection = /## Performance Profiling[\s\S]*?(?=##|$)/;

    const newContent = performanceSection.test(currentContent)
      ? currentContent.replace(performanceSection, metricsData.metrics)
      : `${currentContent}\n${metricsData.metrics}`;

    fs.writeFileSync(README_PATH, newContent, "utf8");
    console.log("README.md успешно обновлен");
  } catch (error) {
    console.error("Ошибка при обновлении README.md:", error);
  }
}

updateReadmeFile();
