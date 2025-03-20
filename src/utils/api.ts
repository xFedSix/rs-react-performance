export const saveMetricsToServer = async (metrics: string): Promise<void> => {
  try {
    const response = await fetch("/api/metrics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ metrics }),
    });

    if (!response.ok) {
      throw new Error("Ошибка сохранения метрик");
    }
  } catch (error) {
    console.error("Ошибка при отправке метрик:", error);
    throw error;
  }
};
