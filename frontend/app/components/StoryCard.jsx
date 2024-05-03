import "./StoryCard.css";
import Image from "next/image";

function StoryCard({ stories }) {
  return (
    <div className="story-grid ">
      {stories.map((story, index) => (
        <div key={index} className="story-card">
          <Image
            src={story.imageUrl}
            alt={story.title}
            className="story-image"
            width={100}
            height={100}
            layout="responsive"
          />
          <div className="story-title">{story.title}</div>
        </div>
      ))}
    </div>
  );
}

export default StoryCard;
