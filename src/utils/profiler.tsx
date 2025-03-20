import { Profiler, ProfilerOnRenderCallback, ReactNode } from "react";

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
  console.table({
    id,
    phase,
    actualDuration: `${actualDuration.toFixed(2)}ms`,
    baseDuration: `${baseDuration.toFixed(2)}ms`,
    startTime: `${startTime.toFixed(2)}ms`,
    commitTime: `${commitTime.toFixed(2)}ms`,
  });
};

export const ProfileWrapper = ({ id, children }: ProfileWrapperProps) => {
  return (
    <Profiler id={id} onRender={onRender}>
      {children}
    </Profiler>
  );
};
