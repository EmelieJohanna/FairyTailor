import { FaPlus } from "react-icons/fa6";

function AddStoryBtn() {
  return (
    <>
      <div className="flex justify-center items-center">
        <button className=" flex justify-center items-center h-28 w-28 rounded-full bg-medium-green shadow-lg border-none">
          <FaPlus className="h-20 w-20 text-dark-green" />
        </button>
      </div>
    </>
  );
}

export default AddStoryBtn;
