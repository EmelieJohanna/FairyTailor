import React, { createContext, useContext, useState } from "react";

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [storyType, setStoryType] = useState("");
  const [storyHappening, setStoryHappening] = useState("");
  const [isStoryFetched, setIsStoryFetched] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const handleStorySubmit = (storyText, image) => {
    setStory(storyText);
    setImageUrl(image);
    setIsStoryFetched(true);
  };

  return (
    <StoryContext.Provider
      value={{
        story,
        setStory,
        imageUrl,
        setImageUrl,
        isStoryFetched,
        setIsStoryFetched,
        storyType,
        setStoryType,
        storyHappening,
        setStoryHappening,
        handleStorySubmit,
        currentPage,
        setCurrentPage,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => useContext(StoryContext);
