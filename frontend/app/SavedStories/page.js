"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const SavedStories = () => {
  const { isLoggedIn } = useAuth();
  const [savedStories, setSavedStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      const fetchSavedStories = async () => {
        try {
          const token = localStorage.getItem("sessionId");
          const response = await fetch(
            "http://localhost:3008/getSavedStories",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setSavedStories(data);
        } catch (error) {
          console.error("Error fetching saved stories", error);
        }
      };

      fetchSavedStories();
    }
  }, [isLoggedIn]);

  return (
    <div className="saved-stories p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Stories</h2>
      <div className="story-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedStories.map((story) => (
          <div
            key={story.id}
            className="story-thumbnail cursor-pointer"
            onClick={() => {
              console.log("Selected Story:", story);
              setSelectedStory(story);
            }}
          >
            {story.image_url && (
              <img
                src={story.image_url}
                alt="Thumbnail"
                className="w-24 h-24 object-cover"
              />
            )}
          </div>
        ))}
      </div>
      {selectedStory && (
        <div className="story-details mt-4 p-4 border rounded bg-gray-100">
          <p>{selectedStory.story_text}</p>
          {selectedStory.image_url && (
            <img
              src={selectedStory.image_url}
              alt="Full Image"
              className="h-48 w-full object-cover mt-2"
            />
          )}
          <button
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => setSelectedStory(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedStories;
