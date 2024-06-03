"use client";

import Link from "next/link";
import { useAuth } from "./contexts/AuthContext";
import { useStory } from "./contexts/StoryContext";
import Button from "./components/Button";
import Image from "next/image";
import storyBear from "/public/storyBear_transparent.png";
import heart from "/public/heart.png";

export default function Home() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const { setIsStoryFetched, setStoryType, setStoryHappening } = useStory();

  const handleClick = () => {
    setIsStoryFetched(false);
    setStoryType("");
    setStoryHappening("");
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen overflow-hidden">
      <svg
        className="w-[600px] sm:w-[800px] md:w-[800px] lg:w-[800px] xl:w-[800px] h-auto"
        viewBox="0 0 440 100"
      >
        <defs>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
          </style>
        </defs>
        <text
          x="50%"
          y="60"
          fill="white"
          stroke="#2f856b"
          fontSize="2.5rem"
          fontFamily="Poetsen One"
          fontWeight="bold"
          textAnchor="middle"
        >
          FairyTailor
        </text>
      </svg>
      <p className="opacity-75 mb-10 text-xl text-[#5bba9d]">
        Create your own stories
      </p>

      <Image
        className="w-[240px] sm:w-[300px] md:w-[300] h-auto mb-10"
        src={storyBear}
        alt="Cute bear cartoon"
        priority
      ></Image>
      {/* <h1 className="text-4xl font-bold mb-2 text-white">TestTailor</h1> */}

      <div className="flex flex-col space-y-6">
        <Button onClick={handleClick}>
          <Link className="no-underline text-black" href="/storyTeller">
            <span>Start a Story</span>
          </Link>
        </Button>

        {/* <Link href="/savedStories" className="text-blue-500 hover:text-blue700">Saved stories</Link> */}
        {/* Conditional rendering for Saved Stories link */}

        {isLoggedIn ? (
          <div className="flex flex-col items-center">
            <button className="p-3 w-[200px] text-center text-[16px] bg-[#d6fff3] text-black border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer active:shadow-none">
              <span className="flex justify-center items-center">
                <Image
                  className="w-[18px] h-auto mr-2"
                  src={heart}
                  alt="A heart"
                  priority
                ></Image>
                <Link
                  href="/savedStories"
                  className="text-[#2f856b] hover:text-[#3da284] no-underline"
                >
                  Saved Stories
                </Link>
              </span>
            </button>
            <button
              className="text-[#2f856b] hover:text-[#3da284] no-underline mt-8 text-[16px] bg-transparent border-none cursor-pointer"
              onClick={() => setIsLoggedIn(false)}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Button>
              <Link className="no-underline text-black" href="/login">
                <span>Log in</span>
              </Link>
            </Button>
            <Link
              href="/createAccount"
              className="mt-2 mb-2 no-underline text-[14px] text-[#2f856b] hover:text-[#3da284]"
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
