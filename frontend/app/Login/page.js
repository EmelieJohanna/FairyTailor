"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Loggain() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
   

    try {
      const response = await fetch("http://localhost:3008/sessions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        router.push("/");
      } else {
        alert("Wrong username or password.");
      }
    } catch (error) {
      console.error("Något gick fel:", error);
      alert("Något gick fel vid inloggning.");
    } finally {
      setIsLoggedIn(true);
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col bg-black justify-content items-center w-96 h-96 text-yellow-50 rounded">
        <p className="mt-8">Log in</p>
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
          onClick={handleLogin}
          className="bg-white text-black rounded-full px-5 py-2 cursor-pointer mt-8"
        >
          Log in
        </button>
      </div>
    </div>
  );
}
