"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useStory } from "../contexts/StoryContext";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";
import Image from "next/image";
import SaveStoryModal from "./SaveStoryModal";

export default function StoryOutput() {
  const { isLoggedIn } = useAuth();
  const {
    story,
    imageUrl,
    storyType,
    storyHappening,
    currentPage,
    setCurrentPage,
  } = useStory();
  const [storyChunks, setStoryChunks] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    console.log("Story state in StoryOutput:", {
      story,
      imageUrl,
      storyType,
      storyHappening,
      currentPage,
    });

    const chunks = splitStoryIntoChunks(story);
    setStoryChunks(chunks);
  }, [story, imageUrl, storyType, storyHappening]);

  useEffect(() => {
    // Ensure the story is split into chunks when the story changes
    setStoryChunks(splitStoryIntoChunks(story));
  }, [story]);

  const splitStoryIntoChunks = (story = "", chunkSize = 200) => {
    if (!story) return []; // Return empty array if story is undefined or null

    const words = story.split(" ");
    const chunks = [];
    let chunk = "";

    words.forEach((word) => {
      if (chunk.length + word.length + 1 <= chunkSize) {
        chunk += (chunk ? " " : "") + word;
      } else {
        chunks.push(chunk);
        chunk = word;
      }
    });

    if (chunk) {
      chunks.push(chunk);
    }

    return chunks;
  };

  const nextPage = () => {
    if (currentPage < storyChunks.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const saveStory = async () => {
    const token = localStorage.getItem("sessionId");

    try {
      const response = await fetch("http://localhost:3008/saveStory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          storyType,
          storyHappening,
          storyText: story,
          image_url: imageUrl,
          currentPage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save story");
      }

      const data = await response.json();
      console.log(data.message);
      setSaveMessage("Your story has been saved");
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    } catch (error) {
      console.error("Error saving story", error);
      setSaveMessage("Failed to save story");

      // Set a timeout to clear the save message after 2 seconds
      setTimeout(() => {
        setSaveMessage("");
      }, 2000);
    }
  };

  const handleSaveStoryClick = () => {
    if (!isLoggedIn) {
      setIsModalOpen(true);
    } else {
      saveStory();
    }
  };

  const currentPageContent = storyChunks[currentPage] || "";

  return (
    <div className="flex flex-col items-center max-w-xs md:max-w-lg bg-white bg-opacity-50 rounded-lg p-10 overflow-auto">
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Generated"
          className="rounded-xl my-8 w-full"
        />
      )}
      <p className="text-xl font-serif">{currentPageContent}</p>

      <div className="flex w-full justify-between mt-8 mb-12">
        <div>
          <button
            onClick={prevPage}
            className="text-lg bg-transparent text-black border-none cursor-pointer"
            disabled={currentPage === 0}
          >
            <span className="flex items-center">
              <MdKeyboardArrowLeft className="text-2xl text-[#DE8888]" />
              Previous
            </span>
          </button>
        </div>
        <div>
          <button
            onClick={nextPage}
            className="text-lg bg-transparent text-black border-none cursor-pointer"
            disabled={currentPage >= storyChunks.length - 1}
          >
            <span className="flex items-center">
              Next <MdKeyboardArrowRight className="text-2xl text-[#DE8888]" />
            </span>
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div>
          {saveMessage && <p className="text-[#2f856b]">{saveMessage}</p>}
          <div className="flex space-x-4">
            {isLoggedIn ? (
              <button
                onClick={saveStory}
                className="p-3 w-[200px] bg-[#9bf2d9] text-[#2f856b] hover:text-[#3da284] border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer mt-2"
              >
                Save story
              </button>
            ) : (
              <button
                onClick={handleSaveStoryClick}
                className="p-3 w-[200px] bg-[#9bf2d9] text-[#2f856b] hover:text-[#3da284] border-[2px] border-solid shadow-md shadow-gray-400 border-[#2f856b] cursor-pointer mt-2"
              >
                Save story
              </button>
            )}
            <Link href="/" className="no-underline">
              <div
                className="p-3 w-[200px] text-center text-[14px] bg-[#9bf2d9] text-[#2f856b]
              hover:text-[#3da284] border-[2px] border-solid shadow-md
              shadow-gray-400 border-[#2f856b] cursor-pointer mt-2"
              >
                Kill story
              </div>
            </Link>
          </div>
        </div>
      </div>
      <SaveStoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

{/* // "use client";

// import { useAuth } from "../contexts/AuthContext";
// import { useStory } from "../contexts/StoryContext";

// export default function StoryOutput() {
//   const { isLoggedIn } = useAuth();
//   const { story, imageUrl, storyType, storyHappening } = useStory();

//   const saveStory = async () => {
//     const token = localStorage.getItem("sessionId");

//     try {
//       const response = await fetch("http://localhost:3008/saveStory", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           storyType,
//           storyHappening,
//           storyText: story,
//           image_url: imageUrl, // Send the generated image URL
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to save story");
//       }

//       const data = await response.json();
//       console.log(data.message);
//     } catch (error) {
//       console.error("Error saving story", error);
//     }
//   };

//   return (
//     <div className="m-4 flex w-full max-w-md h-52 bg-teal-500 bg-opacity-50 rounded-lg p-4 overflow-auto">
//       <p>{story}</p>
//       {imageUrl && <img src={imageUrl} alt="Generated" />}
//       {isLoggedIn ? (
//         <button
//           onClick={saveStory}
//           className="p-2 bg-blue-500 text-white rounded"
//         >
//           Save story
//         </button>
//       ) : (
//         <button
//           onClick={() => alert("You need to be logged in to save your story.")}
//           className="p-2 bg-blue-500 text-white rounded"
//         >
//           Save story
//         </button>
//       )}
//     </div>
//   );
// } */}
