"use client";
import { useState } from "react";
import axios from "axios";
import { useStory } from "../contexts/StoryContext";
import StarsLoader from "./StarsLoader";

export default function StoryInput() {
  const {
    storyType,
    setStoryType,
    storyHappening,
    setStoryHappening,
    handleStorySubmit,
  } = useStory();
  const [isLoading, setIsLoading] = useState(false);

  const fetchStory = async () => {
    try {
      setIsLoading(true);
      const storyResponse = await fetch("http://localhost:3008/storyTeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storyType, storyHappening }),
      });
      const storyData = await storyResponse.json();
      const storyText = storyData.story;

      const imageResponse = await axios.post(
        "http://localhost:3008/generateImage",
        {
          prompt: storyHappening,
        }
      );
      const imageUrl = imageResponse.data.image_url;
      handleStorySubmit(storyText, imageUrl);
    } catch (error) {
      console.error("Error fetching story: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <StarsLoader count={8} />
      ) : (
        <div>
          <input
            type="text"
            value={storyType}
            onChange={(e) => setStoryType(e.target.value)}
            placeholder="Enter a story type"
            className="mb-2 p-2 rounded"
          />
          <input
            type="text"
            value={storyHappening}
            onChange={(e) => setStoryHappening(e.target.value)}
            placeholder="What is the main event?"
            className="mb-4 p-2 rounded"
          />
          <button
            onClick={fetchStory}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Tell Me a Story
          </button>
        </div>
      )}
    </div>
  );
}
