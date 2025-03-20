import { saveMetricsToServer } from "./api";

export const saveMetrics = async (metricsData: string): Promise<void> => {
  try {
    await saveMetricsToServer(metricsData);
    console.log("Метрики успешно сохранены");
  } catch (error) {
    console.error("Ошибка при сохранении метрик:", error);
    throw error;
  }
};
