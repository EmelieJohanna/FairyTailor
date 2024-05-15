"use client";

import Link from "next/link";
import { useAuth } from "./contexts/AuthContext";
import Button from "./components/Button";
import Image from "next/image";
import storyBear from "/public/storyBear.png";

export default function Home() {
  const { isLoggedIn } = useAuth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <Image className="w-[300px] md:w-[400px] h-auto" src={storyBear}></Image>
      {/* <h1 className="text-4xl font-bold mb-2 text-white">TestTailor</h1> */}
      <svg height="100" width="440">
        <defs>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Poetsen+One&display=swap');
          </style>
        </defs>
        <text
          x="50"
          y="60"
          fill="white"
          stroke="#7dd1b9"
          font-size="72"
          font-family="Poetsen One"
          font-weight="bold"
        >
          FairyTailor
        </text>
      </svg>
      <p className="mb-10 text-xl text-[#abe3d5]">This is a storytelling app</p>
      <Button>
        <Link className="no-underline text-[#9d3b19]" href="/storyTeller">
          <span>Start a Story</span>
        </Link>
      </Button>
      <Button>
        <Link className="no-underline text-[#9d3b19]" href="/login">
          <span>Log in</span>
        </Link>
      </Button>
      <Link href="/createAccount" className="text-blue-500 hover:text-blue-700">
        Create Account
      </Link>
      {/* <Link href="/savedStories" className="text-blue-500 hover:text-blue700">Saved stories</Link> */}
      {/* Conditional rendering for Saved Stories link */}

      {isLoggedIn ? (
        <Link
          href="/savedStories"
          className="text-blue-500 hover:text-blue-700"
        >
          Saved Stories
        </Link>
      ) : (
        <button
          onClick={() => alert("You need to be logged in to access this page")}
          className="underline text-blue-500 hover:text-blue-700"
        >
          Saved Stories
        </button>
      )}
    </main>
  );
}
