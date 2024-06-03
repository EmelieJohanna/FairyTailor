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
    <main className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <div
        className="flex flex-col items-center justify-center w-full h-screen"
        style={{
          backgroundImage: "url('/bg_hearts.png')",
          backgroundSize: "repeat",
          backgroundPosition: "center",
        }}
      >
        <button
          onClick={() => router.push("/")}
          className="p-4 fixed top-2 left-0 bg-transparent border-none"
        >
          <MdKeyboardArrowLeft className="text-4xl text-dark-green left-6" />
        </button>
        {!isStoryFetched ? <StoryInput /> : <StoryOutput />}
      </div>
    </main>
  );
}
