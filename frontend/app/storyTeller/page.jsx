"use client";

import { useState } from "react";
import axios from "axios";

export default function StoryTeller() {
  const [storyType, setStoryType] = useState("");
  const [storyHappening, setStoryHappening] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetchStory = async () => {
    const response = await fetch("http://localhost:3008/storyTeller", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storyType, storyHappening }),
    });
    const data = await response.json();
    setStory(data.story);
    generateImage();
  };

  //v.3 --------------------
  const generateImage = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3008/generateImage2",
        {
          prompt: storyHappening,
        }
      );
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Error generating image: ", error);
    }
  };

  const saveStory = async () => {
    const response = await fetch("http://localhost:3008/saveStory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storyType, storyHappening, storyText: story }),
    });
    const data = await response.json();
    console.log(data.message);
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundImage: "url('/storypage.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
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
      <button
        onClick={saveStory}
        className="p-2 bg-blue-500 text-white rounded"
      >
        Save story
      </button>
      <div className="m-4 flex w-full max-w-md h-52 bg-teal-500 bg-opacity-50 rounded-lg p-4 overflow-auto">
        {story}
        {imageUrl && <img src={imageUrl} alt="Generated" />}
      </div>
    </main>
  );
}
