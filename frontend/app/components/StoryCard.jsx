"use client";

// import "./StoryCard.css";
// import Image from "next/image";

function StoryCard({ story }) {
  console.log("Story Happening:", story);
  return (
    <div className="story-card bg-slate-400">
      {/* <Image
            src={story.imageUrl}
            alt={story.title}
            className="story-image"
            width={100}
            height={100}
            layout="responsive"
          /> */}
      <p className="story-title">Test:{story.story_type}</p>
    </div>
  );
}

export default StoryCard;
