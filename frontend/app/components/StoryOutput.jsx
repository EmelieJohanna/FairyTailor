"use client";

import { useAuth } from "../contexts/AuthContext";
import { useStory } from "../contexts/StoryContext";

export default function StoryOutput() {
  
  const { isLoggedIn } = useAuth();
  const { story, imageUrl, storyType, storyHappening } = useStory();
  // Save story function
  const saveStory = async () => {
    const token = localStorage.getItem("sessionId");

    console.log("Saving Story:", {
      storyType,
      storyHappening,
      storyText: story,
    }); // Debugging line

    try {
      const response = await fetch("http://localhost:3008/saveStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ storyType, storyHappening, storyText: story }),
      });
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving story", error);
    }
  };

  return (
    <div className="m-4 flex w-full max-w-md h-52 bg-teal-500 bg-opacity-50 rounded-lg p-4 overflow-auto">
      <p>{story}</p>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
      {isLoggedIn ? (
      <button
        onClick={saveStory}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Save story
      </button>
      ) : (
        <button
          onClick={() => alert("You need to be logged in to save your story.")}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Save story
        </button>
      )}
    </div>
  );
}
