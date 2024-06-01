"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import AddStoryBtn from "./components/AddStoryBtn";
import EditDoneButton from "./components/EditDoneBtn";
import StoryThumbnail from "./components/StoryThumbnail";
import StoryDetails from "./components/StoryDetails";

const SavedStories = () => {
  const { isLoggedIn } = useAuth();
  const [savedStories, setSavedStories] = useState([]);
  const [selectedStory, setSelectedStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode

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

  const handleDeleteStory = async (storyId) => {
    try {
      const token = localStorage.getItem("sessionId");
      await fetch(`http://localhost:3008/deleteStory/${storyId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setSavedStories(savedStories.filter((story) => story.id !== storyId));
    } catch (error) {
      console.error("Error deleting story", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-12 text-center text-2xl font-bold text-dark-green">
        Saved Stories
      </h2>
      <div className="flex place-content-end mb-8">
        <EditDoneButton onClick={() => setIsEditing(!isEditing)} />
      </div>
      <div className="story-list grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 content-evenly">
        <AddStoryBtn />
        {savedStories.map((story) => (
          <StoryThumbnail
            key={story.id}
            story={story}
            onClick={setSelectedStory}
            isEditing={isEditing}
            onDelete={handleDeleteStory}
          />
        ))}
      </div>
      {selectedStory && (
        <StoryDetails
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
        />
      )}
    </div>
  );
};

export default SavedStories;
