import { DeleteDialogUtils } from "@/context";
import "./deleteDialog.css";

function DeleteDialog() {

  const { setShowDeleteDialog, setConfirmDelete } = DeleteDialogUtils();
  
  return (
    <div className="dialog__container">
      <h2 className="dialog__heading">Are you sure you want to Delete?</h2>
      <div className="dialog__btn__container">
        <button className="dialog__btn" onClick={() => setShowDeleteDialog(false)}>
          Cancel
        </button>
        <button className="dialog__btn" onClick={() => setConfirmDelete(true)}>
          Yes
        </button>
      </div>
    </div>
  );
}

export default DeleteDialog;
