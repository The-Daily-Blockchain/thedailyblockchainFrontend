import { formatNumberWithCommas } from "@/app/_components/utils/formatamount";
import { formatChartingDateWithTime } from "@/app/_components/utils/formattingDate";

export const Tooltip = ({
  time,
  volume,
  value,
  x,
  y,
  togglerNo,
  high,
  low,
  open,
  close,
}: any) => {
  return (
    <div
      style={{
        width:
          togglerNo === "1"
            ? "160px"
            : togglerNo === "2"
            ? "160px"
            : togglerNo === "2"
            ? "140"
            : "240px",
        height:
          togglerNo === "1"
            ? "80px"
            : togglerNo === "2"
            ? "130px"
            : togglerNo === "3"
            ? "70px"
            : "180px",
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
        borderRadius: "8px",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Trebuchet MS', Roboto, Ubuntu, sans-serif",
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
        background: "white",
        color: "black",
        borderColor: "rgba(38, 166, 154, 1)",
        boxShadow: "2px 12px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ color: "rgba(38, 166, 154, 1)" }}></div>
      {togglerNo == "1" && (
        <div style={{ color: "black" }}>
          Price: ${formatNumberWithCommas(value)}
        </div>
      )}
      {togglerNo == "2" && (
        <div>
          <div style={{ color: "black" }}>
            High: ${formatNumberWithCommas(high)}
          </div>
          <div style={{ color: "black" }}>
            Low: ${formatNumberWithCommas(low)}
          </div>
          <div style={{ color: "black" }}>
            Open: ${formatNumberWithCommas(open)}
          </div>
          <div style={{ color: "black" }}>
            Close: ${formatNumberWithCommas(close)}
          </div>
        </div>
      )}
      {togglerNo == "3" && (
        <div style={{ color: "black" }}>
          High: ${formatNumberWithCommas(value)}
        </div>
      )}
      <div style={{ color: "black" }}>
        Volume: {formatNumberWithCommas(volume)}
      </div>
      <div style={{ marginTop: "1px", color: "black" }}>
        {formatChartingDateWithTime(time)}
      </div>
    </div>
  );
};
