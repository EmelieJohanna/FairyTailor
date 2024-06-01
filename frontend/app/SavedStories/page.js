"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStory } from "../contexts/StoryContext";
import { useRouter } from "next/navigation";

const SavedStories = () => {
  const { isLoggedIn } = useAuth();
  const {
    setStory,
    setImageUrl,
    setStoryType,
    setStoryHappening,
    setCurrentPage,
    setIsStoryFetched,
  } = useStory();
  const [savedStories, setSavedStories] = useState([]);
  const router = useRouter();

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
           console.log("Data received from backend:", data); 
        
          setSavedStories(data);
        } catch (error) {
          console.error("Error fetching saved stories", error);
        }
      };
       console.log("Fetching saved stories...");
      fetchSavedStories();
    }
  }, [isLoggedIn]);

  const loadStory = (story) => {
    console.log("Loading story:", story);
    setStory(story.story_text || "");
    setImageUrl(story.image_url || "");
    setStoryType(story.story_type || "");
    setStoryHappening(story.story_happening || "");
    setCurrentPage(story.current_page || 0);
    setIsStoryFetched(true);
    router.push("/storyTeller");
  };

  return (
    <div className="saved-stories p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Stories</h2>
      <div className="story-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {savedStories.map((story) => (
          <div
            key={story.id}
            className="story-thumbnail cursor-pointer"
            onClick={() => loadStory(story)}
          >
            {story.image_url && (
              <img
                src={story.image_url}
                alt="Thumbnail"
                className="w-24 h-24 object-cover rounded-lg"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedStories;
