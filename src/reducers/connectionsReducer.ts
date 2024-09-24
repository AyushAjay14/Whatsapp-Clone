import { PORFILE_IMG } from "@/constant";
import { ConnectionAction, ConnectionStateType } from "@/types/reducer";
import { updateConnectionsInLocalStorage } from "@/utils";

export function connectionReducer(state: ConnectionStateType, action: ConnectionAction) {
  switch (action.type) {
    case "LOAD_CONNECTIONS":
      return { ...state, connections: action.payload };
    case "DELETE_CONVERSATION": {
      const newConnections = state.connections.filter((connection) => connection.id !== action.payload);
      updateConnectionsInLocalStorage(newConnections);
      return { ...state, connections: newConnections };
    }
    case "CREATE_CONVERSATION": {
      let id = 0;
      if (state.connections && state.connections.length) {
        id = state.connections[state.connections.length - 1].id + 1;
      }
      const newConnectionArray = [...state.connections, { id, name: action.payload.editText, profileImg: PORFILE_IMG }];
      updateConnectionsInLocalStorage(newConnectionArray);
      return { ...state, connections: newConnectionArray };
    }
    default:
      return state;
  }
}
