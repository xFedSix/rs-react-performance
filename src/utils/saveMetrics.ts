import { saveMetricsToServer } from "./api";

export const saveMetrics = async (metricsData: string): Promise<void> => {
  try {
    await saveMetricsToServer(metricsData);
    console.log("Metrics saved successfully");
  } catch (error) {
    console.error("Error saving metrics:", error);
    throw error;
  }
};
