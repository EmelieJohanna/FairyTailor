"use client";
import { useState } from "react";
import axios from "axios";
import { useStory } from "../contexts/StoryContext";
import StarsLoader from "./StarsLoader";
import "../globals.css";
import Button from "./Button";

export default function StoryInput() {
  const {
    storyType,
    setStoryType,
    storyHappening,
    setStoryHappening,
    handleStorySubmit,
  } = useStory();
  const [isLoading, setIsLoading] = useState(false);

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9 ]/g, "");

  const fetchStory = async () => {
    try {
      setIsLoading(true);
      const sanitizedStoryType = sanitizeInput(storyType);
      const sanitizedStoryHappening = sanitizeInput(storyHappening);
      const storyResponse = await fetch("http://localhost:3008/storyTeller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sanitizedStoryType, sanitizedStoryHappening }),
      });
      const storyData = await storyResponse.json();
      const storyText = storyData.story;

      const imageResponse = await axios.post(
        "http://localhost:3008/generateImage",
        {
          prompt: sanitizedStoryHappening,
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
        <div
          className="text-center flex flex-col h-[600px] justify-between md:max-w-lg rounded-lg px-48 py-24"
          // style={{
          //   backgroundImage: "url('/bg_hearts.png')",
          //   backgroundSize: "cover",
          //   backgroundPosition: "center",
          // }}
        >
          <div className="flex flex-col">
            <h2 className="mb-8 text-[#2f856b] text-2xl font-bold">
              Generate a Story
            </h2>
            <input
              type="text"
              value={storyType}
              onChange={(e) => setStoryType(sanitizeInput(e.target.value))}
              placeholder="Enter a story type"
              className="p-2 mb-4 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b]"
            />
            <input
              type="text"
              value={storyHappening}
              onChange={(e) => setStoryHappening(sanitizeInput(e.target.value))}
              placeholder="What is the main event?"
              className="p-2 mb-4 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b]"
            />
          </div>

          <div>
            <Button
              onClick={fetchStory}
              className="p-3 bg-[#9bf2d9] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b]"
            >
              Tell Me a Story
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
