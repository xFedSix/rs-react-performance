import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

export interface MetricsData {
  timestamp: number;
  metrics: string;
}

export const getStoredMetrics = (): MetricsData | null => {
  const filePath = resolve(process.cwd(), "metrics-temp-before.json");

  if (!existsSync(filePath)) {
    return null;
  }

  try {
    const data = readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading metrics:", error);
    return null;
  }
};
