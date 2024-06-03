// in construction

export default function DeleteStoryModal({
  isOpen,
  onClose,
  onConfirm,
  story_title,
}) {
  if (!isOpen) return null;
  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-pink bg-opacity-75"
    >
      <div className="bg-light-pink p-6 w-60 border-solid border-dark-pink shadow-lg">
        <h2
          id="modal-title"
          className=" text-center text-lg font-semibold mb-4"
        >
          Delete story
        </h2>
        <p id="modal-description" className="mb-6 text-center">
          Are you sure you want to delete {story_title}? This action cannot be
          undone.
        </p>
        <div className="flex justify-evenly space-x-2">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 border-solid border-red-300"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 hover:bg-gray-400 border-solid border-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
