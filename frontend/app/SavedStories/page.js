// pages/SavedStoriesPage.js
"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const SavedStoriesPage = () => {
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
    <div className="saved-stories">
      <h2>Saved Stories</h2>
      <div className="story-list">
        {savedStories.map((story) => (
          <div key={story.id} className="story-thumbnail">
            <h3>{story.storyType}</h3>
            <p>{story.storyHappening}</p>
            {story.imageUrl && <img src={story.imageUrl} alt="Thumbnail" />}
            <button onClick={() => {console.log('Selected Story:', story);setSelectedStory(story)}}>View Story</button>
          </div>
        ))}
      </div>
      {selectedStory && (
        <div className="story-details">
          <h3>{selectedStory.storyType}</h3>
          <p>{selectedStory.storyHappening}</p>
          <p>{selectedStory.storyText}</p>
          {selectedStory.imageUrl && (
            <img src={selectedStory.imageUrl} alt="Full Image" />
          )}
          <button onClick={() => setSelectedStory(null)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default SavedStoriesPage;

// "use client";

// import { useEffect, useState } from "react";
// import StoryCard from "../components/StoryCard";

// function SavedStories() {
//   const [stories, setStories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setLoading(true);
//     async function fetchStories() {
//       try {
//         const response = await fetch("http://localhost:3008/getSavedStories");
//         if (!response.ok) {
//           throw new Error("Failed to fetch all stories");
//         }
//         const data = await response.json();

//         setStories(data);
//         console.log("fetch:", stories);
//         console.log("data:", data);
//         setLoading(false);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching all stories", error);
//       }
//     }

//     fetchStories();
//   }, []);

//   useEffect(() => {
//     console.log("Updated stories", stories);
//   }, [stories]);

//   // console.log(
//   //   "Loading:",
//   //   loading,
//   //   "Error:",
//   //   error,
//   //   "Stories Length:",
//   //   stories.length
//   // );

//   return (
//     <div className="bg-teal-600 min-h-screen">
//       <h1 className="text-white flex">My Fairy Tale Stories</h1>
//       <div className="flex gap-2 flex-wrap">
//         {loading ? (
//           <p>Loading stories...</p>
//         ) : error ? (
//           <p>Error: {error}</p>
//         ) : stories.length > 0 ? (
//           stories.map((story) => <StoryCard key={story.id} story={story} />)
//         ) : (
//           <p>No stories found.</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SavedStories;

// // const stories = [
// //   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
// //   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
// //   { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
// // ];
