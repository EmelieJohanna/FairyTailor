const StoryDetails = ({ story, onClose }) => {
  return (
    <div className="story-details mt-4 p-4 border rounded bg-gray-100">
      <p>{story.story_text}</p>
      {story.image_url && (
        <img
          src={story.image_url}
          alt="Full Image"
          className="h-48 w-full object-cover mt-2"
        />
      )}
      <button
        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  );
};

export default StoryDetails;
