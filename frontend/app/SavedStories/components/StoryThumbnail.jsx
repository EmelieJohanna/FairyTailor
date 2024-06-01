"use client";

import DeleteStoryBtn from "./DeleteStoryBtn";

const StoryThumbnail = ({ story, onClick, isEditing, onDelete }) => {
  return (
    <div
      className="relative story-thumbnail cursor-pointer"
      onClick={() => onClick(story)}
    >
      {story.image_url && (
        <img
          src={story.image_url}
          alt="Thumbnail"
          className="w-36 h-36 object-cover rounded-lg border-solid border-4 border-dark-green"
        />
      )}
      {isEditing && (
        <DeleteStoryBtn
          onClick={(e) => {
            e.stopPropagation();
            onDelete(story.id);
          }}
        />
      )}
    </div>
  );
};

export default StoryThumbnail;
