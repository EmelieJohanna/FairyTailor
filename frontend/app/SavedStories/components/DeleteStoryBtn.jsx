import { MdDeleteOutline } from "react-icons/md";

function DeleteStoryBtn() {
  return (
    <>
      <button className="flex items-center justify-center w-10 h-10 border-2 border-dark-green rounded-md border-solid">
        <MdDeleteOutline className="text-dark-pink h-8 w-8" />
      </button>
    </>
  );
}

export default DeleteStoryBtn;
