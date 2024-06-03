"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStory } from "../contexts/StoryContext";
import { useRouter } from "next/navigation";
import AddStoryBtn from "./components/AddStoryBtn";
import EditDoneButton from "./components/EditDoneBtn";
import StoryThumbnail from "./components/StoryThumbnail";
import StoryDetails from "./components/StoryDetails";
import DeleteStoryModal from "./components/DeleteStoryModal";
import HomeButton from "../components/HomeButton";

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
  const [selectedStory, setSelectedStory] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [storyToDelete, setStoryToDelete] = useState(null);

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

  const loadStory = (story, startFromSavedPage) => {
    console.log("Loading story:", story);
    setStory(story.story_text || "");
    setImageUrl(story.image_url || "");
    setStoryType(story.story_type || "");
    setStoryHappening(story.story_happening || "");
    setCurrentPage(startFromSavedPage ? story.current_page : 0);
    setIsStoryFetched(true);
    router.push("/storyTeller");
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    console.log("toggleEditing");
  };

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
      if (response.ok) {
        setSavedStories(savedStories.filter((story) => story.id !== storyId));
      } else {
        console.error("Error deleting story");
      }
    } catch (error) {
      console.error("Error deleting story", error);
    }
  };

  const openModal = (storyId) => {
    setStoryToDelete(storyId);
    setShowModal(true);
  };

  const closeModal = () => {
    setStoryToDelete(null);
    setShowModal(false);
  };

  const confirmDelete = async () => {
    if (storyToDelete) {
      await handleDeleteStory(storyToDelete);
      closeModal();
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full min-h-screen"
      style={{
        backgroundImage: "url('/bg_hearts.png')",
        backgroundSize: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-content items-center">
        <HomeButton />

        <div className="flex place-content-end mb-8 w-full">
          <EditDoneButton isEditing={isEditing} toggleEditing={toggleEditing} />
        </div>
        <div className="story-list grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 content-evenly">
          <AddStoryBtn />
          {savedStories.map((story) => (
            <StoryThumbnail
              key={story.id}
              className="story-thumbnail cursor-pointer"
              onLoadFromSavedPage={() => loadStory(story, true)}
              onLoadFromStart={() => loadStory(story, false)}
              story={story}
              isEditing={isEditing}
              onDelete={() => openModal(story.id)}
            />
          ))}
        </div>

        {selectedStory && (
          <StoryDetails
            story={selectedStory}
            onClose={() => setSelectedStory(null)}
          />
        )}
        <DeleteStoryModal
          isOpen={showModal}
          onClose={closeModal}
          onConfirm={confirmDelete}
          className="absolute"
        />
      </div>
    </div>
  );
};

export default SavedStories;
