import { useEffect, useRef, useState } from "react";

interface PerformanceMetrics {
  renderCount: number;
  lastRenderDuration: number;
  averageRenderDuration: number;
}

export const usePerformanceMetrics = (
  componentName: string,
): PerformanceMetrics => {
  const renderCount = useRef(0);
  const totalDuration = useRef(0);
  const startTime = useRef(performance.now());
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderCount: 0,
    lastRenderDuration: 0,
    averageRenderDuration: 0,
  });

  useEffect(() => {
    const endTime = performance.now();
    const duration = endTime - startTime.current;

    renderCount.current += 1;
    totalDuration.current += duration;

    const newMetrics = {
      renderCount: renderCount.current,
      lastRenderDuration: duration,
      averageRenderDuration: totalDuration.current / renderCount.current,
    };

    setMetrics(newMetrics);

    console.table({
      component: componentName,
      ...newMetrics,
    });

    startTime.current = performance.now();
  }, [componentName]);

  return metrics;
};
