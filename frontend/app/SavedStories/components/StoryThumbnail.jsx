"use client";

import DeleteStoryBtn from "./DeleteStoryBtn";

const StoryThumbnail = ({
  story,
  onLoadFromSavedPage,
  onLoadFromStart,
  onDelete,
  isEditing,
}) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center">
        <img
          src={story.image_url}
          alt={story.story_title}
          className="w-[160px] h-auto md:w-[200px] object-cover rounded-lg border-solid border-dark-green"
        />
        <div className="flex flex-col items-center mt-4">
          <button
            className="p-1 md:p-2 w-[160px] md:w-[200px] md:text-[16px] text-center bg-[#9bf2d9] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer active:shadow-none"
            onClick={onLoadFromSavedPage}
          >
            Continue
          </button>
          <button
            className="p-1 md:p-2  mt-2 w-[160px] md:w-[200px] md:text-[16px] text-center bg-[#9bf2d9] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer active:shadow-none"
            onClick={onLoadFromStart}
          >
            Start from beginning
          </button>
        </div>
      </div>
      {isEditing && (
        <div className="absolute -top-5 right-4">
          <DeleteStoryBtn
            onClick={(e) => {
              e.stopPropagation();
              onDelete(story.id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default StoryThumbnail;
