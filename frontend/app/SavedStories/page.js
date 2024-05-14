import StoryCard from "../components/StoryCard";

function SavedStories() {
  const stories = [
    { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
    { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
    { title: "The Magic Forest", imageUrl: "/unicorn.webp" },
  ];

  return (
 
      <div className="bg-teal-600 min-h-screen">
        <h1 className="text-white flex">My Fairy Tale Stories</h1>
        <StoryCard stories={stories} />
      </div>
    
  );
}

export default SavedStories;
