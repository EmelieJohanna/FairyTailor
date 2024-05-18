import React, { createContext, useContext, useState } from "react";

const StoryContext = createContext();

export const StoryProvider = ({ children }) => {
  const [story, setStory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [storyType, setStoryType] = useState("");
  const [storyHappening, setStoryHappening] = useState("");
  const [isStoryFetched, setIsStoryFetched] = useState(false);

  const handleStorySubmit = (storyText, image) => {
    setStory(storyText);
    setImageUrl(image);
    setIsStoryFetched(true);
  };

  return (
    <StoryContext.Provider
      value={{
        story,
        imageUrl,
        isStoryFetched,
        storyType,
        setStoryType,
        storyHappening,
        setStoryHappening,
        handleStorySubmit,
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};

export const useStory = () => useContext(StoryContext);
