import { MessagesUtils } from "@/context";
import "./tooltip.css";
import { Connection } from "@/types";

function Tooltip({ connection, tooltipPosition }: { connection: Connection; tooltipPosition: { top: number; left: number } }) {
  const { messages } = MessagesUtils();
  return (
    <div className="tooltip" style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
      {messages[connection.id]?.at(-1)?.text}
    </div>
  );
}

export default Tooltip;
