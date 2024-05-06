"use client";

export default function StoryTeller() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundImage: "url('/storypage.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex w-64 h-52 bg-teal-500 rounded-lg">
        There was once a...
      </div>
    </main>
  );
}
