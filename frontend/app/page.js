import Link from "next/link";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundImage: "url('/front.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-4xl font-bold mb-2 text-white">FairyTailor</h1>
      <p className="mb-10 text-lg text-white">This is a storytelling app</p>
      <button className="bg-yellow-300 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-full mb-4 border-none">
        <Link href="/start-story">
          <span>Start a Story</span>
        </Link>
      </button>
      <button className="bg-teal-300 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-full mb-2 border-none">
        <Link href="/login">
          <span>Log in</span>
        </Link>
      </button>
      <Link href="/CreateAccount" className="text-blue-500 hover:text-blue-700">
        Create Account
      </Link>
      <Link href="/SavedStories" className="text-blue-500 hover:text-blue-700">
        Saved Stories
      </Link>
    </main>
  );
}
