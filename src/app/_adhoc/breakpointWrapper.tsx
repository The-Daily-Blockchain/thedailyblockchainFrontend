import React, { ReactNode, useState, useEffect } from "react";

interface BreakpointWrapperProps {
  children: ReactNode;
}

const BreakpointWrapper: React.FC<BreakpointWrapperProps> = ({ children }) => {
  const [breakpoint, setBreakpoint] = useState<string>(getBreakpoint());

  function getBreakpoint(): string {
    if (window.matchMedia("(max-width: 640px)").matches) return "xs";
    if (window.matchMedia("(max-width: 768px)").matches) return "sm";
    if (window.matchMedia("(max-width: 1024px)").matches) return "md";
    if (window.matchMedia("(max-width: 1280px)").matches) return "lg";
    return "xl";
  }

  useEffect(() => {
    const handleResize = () => {
      const newBreakpoint = getBreakpoint();
      if (newBreakpoint !== breakpoint) {
        setBreakpoint(newBreakpoint);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  // Use the breakpoint as a key to force re-render
  return <div key={breakpoint}>{children}</div>;
};

export default BreakpointWrapper;
