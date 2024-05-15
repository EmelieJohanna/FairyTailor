"use client";

// import "./StoryCard.css";
import Image from "next/image";

function StoryCard({ story }) {
  console.log("Story Happening:", story);
  return (
    <div className="story-card bg-slate-400 w-28 h-28">
      <Image
        src={story.imageUrl}
        alt={story_type}
        className="story-image"
        // width={10}
        // height={10}
        layout="responsive"
      />
      <p className="story-title">Test:{story.story_type}</p>
    </div>
  );
}

export default StoryCard;
