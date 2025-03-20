import { readFileSync } from "fs";
import { resolve } from "path";

export interface MetricsData {
  timestamp: number;
  metrics: string;
}

export const getStoredMetrics = (): MetricsData | null => {
  try {
    const data = readFileSync(
      resolve(process.cwd(), "metrics-temp.json"),
      "utf8",
    );
    return JSON.parse(data);
  } catch {
    return null;
  }
};
