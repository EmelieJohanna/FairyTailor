import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

function AddStoryBtn() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href={"/storyTeller"}>
          <button className="flex justify-center items-center h-16 w-16 rounded-full bg-dark-pink text-white shadow-lg border-[3px] border-solid border-dark-green cursor-pointer">
            <FaPlus className="w-16 h-10 text-white" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default AddStoryBtn;
