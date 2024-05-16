"use client";

import { useStory } from "../contexts/StoryContext";
import StoryInput from "../components/StoryInput";
import StoryOutput from "../components/StoryOutput";

export default function StoryTeller() {
  const { isStoryFetched } = useStory();

  return (
    <>
      <main>{!isStoryFetched ? <StoryInput /> : <StoryOutput />}</main>
    </>
  );
}
