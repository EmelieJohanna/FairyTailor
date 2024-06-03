"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "../components/Button";
import Image from "next/image";
import bow from "/public/bow.png";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function Loggain() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setErrorMessage("Please enter both username and password"); // Set error message if fields are empty
        return;
      }

      const sanitizedUsername = username.replace(/[^a-zA-Z0-9]/g, "");
      const sanitizedPassword = password.replace(/[^a-zA-Z0-9]/g, "");

      const response = await fetch("http://localhost:3008/sessions", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: sanitizedUsername,
          password: sanitizedPassword,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login response data:", data);

        localStorage.setItem("sessionId", data.token);

        const sessionId = localStorage.getItem("sessionId");

        router.push("/");
        setIsLoggedIn(true);
        setErrorMessage(""); // Clear the error message on successful login
      } else {
        setErrorMessage("Wrong username or password"); // Set the error message
      }
    } catch (error) {
      console.error("Something went wrong:", error);
      setErrorMessage("Login failed"); // Set the error message for unexpected errors
    } finally {
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-full h-screen"
      style={{
        backgroundImage: "url('/bg_hearts.png')",
        backgroundSize: "repeat",
        backgroundPosition: "center",
      }}
    >
      <button
        onClick={() => router.push("/")}
        className="p-4 fixed top-3 left-0 lg:left-32 lg:mt-10 bg-transparent border-none"
      >
        <MdKeyboardArrowLeft className="text-4xl lg:text-6xl text-[#549d87] left-6 cursor-pointer" />
      </button>
      <div className="flex flex-col justify-content items-center">
        <p className="font-poetsen-one mt-8 text-[#2f856b] text-2xl font-bold">
          Login
        </p>
        <Image
          className="w-[80px] h-auto mt-8"
          src={bow}
          alt="A pink bowtie"
          priority
        ></Image>
        <label htmlFor="username" className="mt-20 text-[#2f856b]">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-[180px] mt-2 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-[#abc8c0] border-[#2f856b]"
        />
        <label htmlFor="password" className="mt-8 text-[#2f856b] ">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-[180px] mb-10 mt-2 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-[#abc8c0] border-[#2f856b]"
        />
        <Button onClick={handleLogin}>Log in</Button>
        {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
      </div>
    </div>
  );
}
