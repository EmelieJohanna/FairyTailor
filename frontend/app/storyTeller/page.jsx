"use client";

<<<<<<< HEAD
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

export default function StoryTeller() {
  const [storyType, setStoryType] = useState("");
  const [storyHappening, setStoryHappening] = useState("");
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const [prompt, setPrompt] = useState("");

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
    // fetchImage();
  };

  // Not finished v.1
  // const fetchImage = async () => {
  //   const response = await fetch("http://localhost:3008/generateImage", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ storyHappening }),
  //   });
  //   const data = await response.json();
  //   setImageUrl(data.imageUrl);
  //   console.log(data.imageUrl);
  // };

  // v.2
  const generateImage2 = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3008/generateImage2",
        {
          prompt: prompt,
        }
      );
      setImageUrl(response.data.image_url);
    } catch (error) {
      console.error("Error generating image: ", error);
    }
  };

  const saveStory = async () => {
    // Get the token from localStorage or wherever it's stored
    const token = localStorage.getItem("sessionId");

    try {
      const response = await fetch("http://localhost:3008/saveStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the Authorization header with the token
        },
        body: JSON.stringify({ storyType, storyHappening, storyText: story }),
      });

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error("Error saving story:", error);
      // Handle error as needed
    }
  };
=======
import { useStory } from "../contexts/StoryContext";
import StoryInput from "../components/StoryInput";
import StoryOutput from "../components/StoryOutput";

export default function StoryTeller() {
  const { isStoryFetched } = useStory();
>>>>>>> ef6eb77445c5d06089be9cc50fe81d28085e231a


  return (
    <>
      <main>{!isStoryFetched ? <StoryInput /> : <StoryOutput />}</main>
    </>
  );
}
