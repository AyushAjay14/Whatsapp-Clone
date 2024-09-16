export type DeleteDialogContextType = {
  showDeleteDialog: boolean;
  setShowDeleteDialog: (showDeleteDialog: boolean) => void;
  confirmDelete: boolean;
  setConfirmDelete: (confirmDelete: boolean) => void;
};

export type CompactModeContextType = {
  isCompactMode: boolean;
  setIsCompactMode: (isCompactMode: boolean) => void;
};
