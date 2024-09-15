export type Connection = {
  id: number;
  name: string;
  profileImg: string;
};
export type ConnectionsContextType = {
  connections: Connection[];
  setConnections: (connections: Connection[]) => void;
};
