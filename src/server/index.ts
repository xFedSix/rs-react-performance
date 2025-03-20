import express from "express";
import { writeFileSync } from "fs";
import { resolve } from "path";

const app = express();
app.use(express.json());

app.post("/api/metrics", (req, res) => {
  try {
    const { metrics } = req.body;
    writeFileSync(resolve(process.cwd(), "metrics-temp.json"), metrics, "utf8");
    res.json({ success: true });
  } catch (error) {
    console.error("Ошибка сохранения метрик:", error);
    res.status(500).json({ error: String(error) });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Сервер метрик запущен на порту ${PORT}`);
});
