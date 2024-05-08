"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCreateAccount = async () => {
    try {
      const response = await fetch("http://localhost:3009/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok && password !== "" && username !== "") {
        alert("Grattis! Du har skapat ett konto i Arbetarbaken.");
        router.push("/Login");
      } else {
        alert("Glöm inte att fylla i användarnamn och lösenord.");
      }
    } catch (error) {
      console.error("Något gick fel.", error);
    } finally {
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center p-24"
      style={{
        backgroundImage: "url('/three.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col items-center">
        <div className="flex flex-col bg-pink-300 bg-opacity-50 justify-content items-center w-96 h-96 text-yellow-50 rounded">
          <p className="mt-8">Create Account</p>
          <label htmlFor="username" className="mt-20">
            Username:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password" className="mt-8">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onClick={handleCreateAccount}
            className="bg-white text-black rounded-full px-5 py-2 cursor-pointer mt-8"
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}
