//in construction

"use client";

import { useState } from "react";
import Image from "next/image";
import DeleteStoryModal from "./DeleteStoryModal";

function StoryCard({ story, onDelete }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleDeleteStory = async (id) => {
    try {
      const response = await fetch(`http://localhost:3008//userStories/:id`, {
        method: "DELETE",
      });
      if (response.ok) {
        await onDelete(story.id);
        closeModal();
        setStories((currentStories) =>
          currentStories.filter((story) => story.id !== id)
        );
      } else {
        throw new Error("Failed to delete the story");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };

  const handleDelete = async () => {
    await onDelete(story.id);
    closeModal();
  };
  return (
    <div className=" bg-slate-400 w-28 h-28">
      {story.imageUrl && (
        <Image
          src={story.imageUrl}
          alt={story.story_type}
          className="rounded"
          width={50}
          height={50}
          // layout="responsive"
        />
      )}
      <p className="text-lg font-bold">Test:{story.story_type}</p>
      <button onClick={openModal}>Delete</button>
      <DeleteStoryModal
        isOpen={modalIsOpen}
        onClose={closeModal}
        onConfirm={handleDeleteStory}
      />
    </div>
  );
}

export default StoryCard;

// function StoryCard({ story }) {
//   console.log("Story Happening:", story);
//   return (
//     <div className="story-card bg-slate-400 w-28 h-28">
//       <Image
//         src={story.imageUrl}
//         alt={story_type}
//         className="story-image"
//         // width={10}
//         // height={10}
//         layout="responsive"
//       />
//       <p className="story-title">Test:{story.story_type}</p>
//     </div>
//   );
// }
