import { Profiler, ProfilerOnRenderCallback, ReactNode } from "react";
import { ProfileLogger } from "./profileLogger";

interface ProfileWrapperProps {
  id: string;
  children: ReactNode;
}

const onRender: ProfilerOnRenderCallback = (
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
  });
};

export const ProfileWrapper = ({ id, children }: ProfileWrapperProps) => {
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};
