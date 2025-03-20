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

    let currentContent = fs.readFileSync(README_PATH, "utf8");

    const performanceSections = [
      /## Performance Profiling[\s\S]*?(?=##|$)/,
      /### Initial Performance Metrics[\s\S]*?(?=###|$)/,
      /#### Commit Duration[\s\S]*?(?=####|$)/,
      /#### Component Render Times[\s\S]*?(?=####|$)/,
      /#### Performance Summary[\s\S]*?(?=####|$)/,
      /#### Flame Graph Analysis[\s\S]*?(?=##|$)/,
      /#### User Interactions[\s\S]*?(?=####|$)/,
    ];

    performanceSections.forEach((section) => {
      currentContent = currentContent.replace(section, "");
    });

    const cleanedContent = currentContent.replace(/\n{3,}/g, "\n\n").trim();

    const newContent = `${cleanedContent}\n\n${metricsData.metrics}\n`;

    fs.writeFileSync(README_PATH, newContent, "utf8");
    console.log("README.md successfully updated with new metrics");
  } catch (error) {
    console.error("Ошибка при обновлении README.md:", error);
  }
}

updateReadmeFile();
