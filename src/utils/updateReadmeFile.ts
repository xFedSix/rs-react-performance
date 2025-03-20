import * as fs from "fs";
import * as path from "path";

const README_PATH = path.resolve(process.cwd(), "README.md");

export function updateReadmeFile(metrics: string): void {
  try {
    const currentContent = fs.readFileSync(README_PATH, "utf8");
    const performanceSection = /## Performance Profiling[\s\S]*?(?=##|$)/;

    const newContent = performanceSection.test(currentContent)
      ? currentContent.replace(performanceSection, metrics)
      : `${currentContent}\n${metrics}`;

    fs.writeFileSync(README_PATH, newContent, "utf8");
    console.log("README.md успешно обновлен");
  } catch (error) {
    console.error("Ошибка при обновлении README.md:", error);
  }
}
