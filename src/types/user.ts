export type User = {
  id: number;
  name: string;
  profileImg: string;
};
export type SelectedUserContextType = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};
