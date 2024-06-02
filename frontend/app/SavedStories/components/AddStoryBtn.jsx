import { FaPlus } from "react-icons/fa6";
import Link from "next/link";

function AddStoryBtn() {
  return (
    <>
      <div className="flex justify-center items-center">
        <Link href={"/storyTeller"}>
          <button className=" flex justify-center items-center h-28 w-28 rounded-full bg-medium-green shadow-lg border-none">
            <FaPlus className="h-20 w-20 text-dark-green" />
          </button>
        </Link>
      </div>
    </>
  );
}

export default AddStoryBtn;
