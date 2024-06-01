// import { useState } from "react";

function EditDoneBtn({ isEditing, toggleEditing }) {
  // const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   setIsEditing(isEditMode);
  // }, [isEditMode]);

  // const toggleEditing = () => {
  //   setIsEditing(!isEditing);
  // };

  return (
    <button
      onClick={toggleEditing}
      className="flex items-center justify-center px-6 py-2 bg-medium-green border-none text-dark-green font-bold rounded-full shadow-md"
    >
      {isEditing ? "Done" : "Edit"}
    </button>
  );
}

export default EditDoneBtn;
