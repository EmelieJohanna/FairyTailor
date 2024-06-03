"use client";

import { useStory } from "../contexts/StoryContext";
import StoryInput from "../components/StoryInput";
import StoryOutput from "../components/StoryOutput";

export default function StoryTeller() {
  const { isStoryFetched } = useStory();

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <div
        className="flex flex-col items-center justify-center w-full h-screen"
        style={{
          backgroundImage: "url('/bg_hearts.png')",
          backgroundSize: "repeat",
          backgroundPosition: "center",
        }}
      >
        {!isStoryFetched ? <StoryInput /> : <StoryOutput />}
      </div>
    </main>
  );
}
