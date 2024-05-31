"use client";

import { useStory } from "../contexts/StoryContext";
import StoryInput from "../components/StoryInput";
import StoryOutput from "../components/StoryOutput";
import Header from "../components/Header";

export default function StoryTeller() {
  const { isStoryFetched } = useStory();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!isStoryFetched ? <StoryInput /> : <StoryOutput />}
      </main>
    </>
  );
}
