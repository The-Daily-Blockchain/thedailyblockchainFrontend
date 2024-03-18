export const Tooltip = ({ time, value, volume, x, y }: any) => {
  return (
    <div
      style={{
        width: "100px",
        height: "80px",
        position: "absolute",
        display: "block",
        padding: "8px",
        boxSizing: "border-box",
        fontSize: "12px",
        textAlign: "left",
        zIndex: "1000",
        top: `${y}px`,
        left: `${x}px`,
        pointerEvents: "none",
        border: "1px solid",
        borderRadius: "2px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        background: "white",
        color: "black",
        borderColor: "rgba(38, 166, 154, 1)",
      }}
    >
      <div style={{ color: "rgba(38, 166, 154, 1)" }}></div>
      <div style={{ margin: "4px 0px", color: "black" }}>Price: {value}</div>
      <div style={{ color: "black" }}>volume: {volume}</div>
      <div style={{ color: "black" }}>{time}</div>
    </div>
  );
};
