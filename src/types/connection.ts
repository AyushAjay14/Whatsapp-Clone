import { Dispatch } from "react";

export type Connection = {
  id: number;
  name: string;
  profileImg: string;
};
export type ConnectionsContextType = {
  connectionState: { connections: Connection[] };
  connectionDispatch: Dispatch<any>;
};
