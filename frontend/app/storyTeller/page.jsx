"use client";

import { useStory } from "../contexts/StoryContext";
import StoryInput from "../components/StoryInput";
import StoryOutput from "../components/StoryOutput";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useRouter } from "next/navigation";

export default function StoryTeller() {
  const { isStoryFetched } = useStory();
  const router = useRouter();

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen overflow-hidden"
      style={{
        backgroundImage: "url('/bg_hearts.png')",
        backgroundSize: "repeat",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col items-center justify-center w-full">
        <button
          onClick={() => router.push("/")}
          className="p-4 fixed top-3 left-0 lg:left-32 lg:mt-10 bg-transparent border-none"
        >
          <MdKeyboardArrowLeft className="text-4xl lg:text-6xl text-dark-green left-6 cursor-pointer" />
        </button>
        {!isStoryFetched ? <StoryInput /> : <StoryOutput />}
      </div>
    </div>
  );
}
