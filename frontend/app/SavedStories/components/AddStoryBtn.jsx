import { FaPlus } from "react-icons/fa6";

function AddStoryBtn() {
  return (
    <>
      <button className=" flex justify-center items-center h-36 w-36 rounded-full bg-medium-green shadow-lg border-none">
        <FaPlus className="h-20 w-20 text-dark-green" />
      </button>
    </>
  );
}

export default AddStoryBtn;
