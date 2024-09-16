import { MessagesUtils } from "@/context";
import "./tooltip.css";
import { Connection } from "@/types";

function Tooltip({ connection }: { connection: Connection }) {
  const { messages } = MessagesUtils();
  return <p className="tooltip">{messages[connection.id]?.at(-1)?.text}</p>;
}

export default Tooltip;
