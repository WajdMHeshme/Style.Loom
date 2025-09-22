import React from "react";

type LoaderProps = {
  size?: string;       
  center?: boolean;     
  color?: string;        
};

const Loader: React.FC<LoaderProps> = ({
  size = "w-12 h-12",
  center = true,
  color = "var(--color-brown60)",   
}) => {
  const spinner = (
    <div role="status" aria-live="polite" className={`relative ${size}`}>
      {/* Outer neon ring */}
      <div
        className="absolute inset-0 rounded-full border-4"
        style={{
          borderColor: "rgba(174,155,132,0.2)", // brown60 مع شفافية
          boxShadow: `0 0 14px ${color}, 0 0 28px ${color}, inset 0 0 12px ${color}40`,
        }}
      />

      {/* Rotating arc */}
      <div
        className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
        style={{
          borderTopColor: color,
          boxShadow: `0 0 10px ${color}, 0 0 18px ${color}`,
        }}
      />

      {/* Inner pulsing dot */}
      <div
        className="absolute m-auto rounded-full animate-ping"
        style={{
          width: "0.625rem",
          height: "0.625rem",
          backgroundColor: color,
          boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
        }}
      />
    </div>
  );

  if (!center) return spinner;

  return (
    <div className="flex items-center justify-center w-full h-full">
      {spinner}
    </div>
  );
};

export default Loader;
