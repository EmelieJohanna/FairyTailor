"use client";

import { useEffect, useState } from "react";
import StoryCard from "../components/StoryCard";

function SavedStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    async function fetchStories() {
      try {
        const response = await fetch("http://localhost:3008/allStories");
        if (!response.ok) {
          throw new Error("Failed to fetch all stories");
        }
        const data = await response.json();

        setStories(data);
        console.log("FEtchh:", stories);
        console.log("data:", data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error("Error fetching all stories", error);
      }
    }

    fetchStories();
  }, []);

  useEffect(() => {
    console.log("Updated stories", stories);
  }, [stories]);

  // console.log(
  //   "Loading:",
  //   loading,
  //   "Error:",
  //   error,
  //   "Stories Length:",
  //   stories.length
  // );

  return (
    <div className="bg-teal-600 min-h-screen">
      <h1 className="text-white flex">My Fairy Tale Stories</h1>
      <div className="flex gap-2 flex-wrap">
        {loading ? (
          <p>Loading stories...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : stories.length > 0 ? (
          stories.map((story) => <StoryCard key={story.id} story={story} />)
        ) : (
          <p>No stories found.</p>
        )}
      </div>
    </div>
  );
}

export default SavedStories;

// const stories = [
//   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
//   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
//   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
// ];
