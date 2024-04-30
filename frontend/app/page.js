import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>FairyTailor</h1>
      <p>This is a storytelling app</p>
      <button>Create Account</button>
      <button>Log in</button>
      <button>Start a story</button>
    </main>
  );
}
