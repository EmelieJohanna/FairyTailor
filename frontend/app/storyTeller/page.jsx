"use client";

import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function StoryTeller() {
  const [storyType, setStoryType] = useState("");
  const [storyHappening, setStoryHappening] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();

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
    fetchImage();
  };

  // Not finished
  const fetchImage = async () => {
    const response = await fetch("http://localhost:3008/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ storyHappening }),
    });
    const data = await response.json();
    setImageUrl(data.imageUrl);
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
      {isLoggedIn ? (
        <button
          onClick={saveStory}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Save story
        </button>
      ) : (
        <button onClick={() => alert("You need to be logged in to save your story.")} className="p-2 bg-blue-500 text-white rounded">
          Save story
        </button>
      )}
      <div className="m-4 flex w-full max-w-md h-52 bg-teal-500 bg-opacity-50 rounded-lg p-4 overflow-auto">
        {story}
      </div>
      {/* <div className=" bg-white h-56 w-80">
        {imageUrl && (
          <img
            src={imageUrl}
            width={100}
            height={100}
            alt="Story Image"
            className="mt-6 max-h-40 rounded"
          />
        )}
      </div>
      <button onClick={fetchImage}>Create image</button> */}
    </main>
  );
}
