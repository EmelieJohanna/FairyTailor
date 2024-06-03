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
      <div className="flex flex-col items-center ">
        <img
          src={story.image_url}
          alt={story.story_title}
          className="w-full h-48 object-cover"
        />
        <div className="flex flex-col items-center mt-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded mb-2"
            onClick={onLoadFromSavedPage}
          >
            Continue from where you left off
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={onLoadFromStart}
          >
            Start from the beginning
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
