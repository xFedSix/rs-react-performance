import { Profiler, ProfilerOnRenderCallback, ReactNode } from "react";
import { ProfileLogger } from "./profileLogger";

interface ProfileWrapperProps {
  id: string;
  children: ReactNode;
  interaction?: string;
}

export const ProfileWrapper = ({
  id,
  children,
  interaction,
}: ProfileWrapperProps) => {
  const handleRender: ProfilerOnRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime,
  ) => {
    ProfileLogger.logPerformance({
      componentName: id,
      phase,
      commitDuration: commitTime - startTime,
      actualDuration,
      baseDuration,
      interaction,
    });
  };

  return (
    <Profiler id={id} onRender={handleRender}>
      {children}
    </Profiler>
  );
};
