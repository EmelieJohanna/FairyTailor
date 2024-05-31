// in construction

export default function DeleteStoryModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="bg-teal-500 p-4 w-48"
    >
      <div>
        <h2 id="modal-title">Delete story</h2>
        <p id="modal-description">
          Are you sure you want to delete this story? This action can not be
          undone.
        </p>
        <button onClick={onConfirm}>Delete</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
