"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import crown from "/public/crown.png";
import { MdKeyboardArrowLeft } from "react-icons/md";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameUnique, setIsUsernameUnique] = useState(true);
  const router = useRouter();

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9]/g, "");

  const checkUsernameUniqueness = async (username) => {
    try {
      const sanitizedUsername = sanitizeInput(username);
      const response = await fetch(
        `http://localhost:3008/users/check/${sanitizedUsername}`
      );
      const data = await response.json();
      setIsUsernameUnique(data.available);
    } catch (error) {
      console.error("Error checking username availability", error);
    }
  };

  const handleCreateAccount = async () => {
    if (!isUsernameUnique) {
      alert("Username is already taken. Please choose another one.");
      return;
    }

    const sanitizedUsername = sanitizeInput(username);
    const sanitizedPassword = sanitizeInput(password);

    try {
      const response = await fetch("http://localhost:3008/users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: sanitizedUsername,
          password: sanitizedPassword,
        }),
      });

      if (response.ok && password !== "" && username !== "") {
        alert("Welcome! You can now create and save stories.");
        router.push("/login");
      } else {
        alert("Don't forget to enter name and password.");
      }
    } catch (error) {
      console.error("Something went wrong.", error);
    } finally {
      setPassword("");
      setUsername("");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    checkUsernameUniqueness(e.target.value);
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
        <p className="mt-8 text-[#2f856b] text-2xl font-bold">Create Account</p>
        <Image
          className="w-[90px] h-auto mt-6"
          src={crown}
          alt="A yellow crown"
          priority
        ></Image>
        <label htmlFor="username" className="mt-8 text-[#2f856b]">
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          className="p-2 w-[180px] mt-2 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-[#abc8c0] border-[#2f856b]"
        />
        {!isUsernameUnique && (
          <p className="text-red-500">Username is already taken</p>
        )}
        <label htmlFor="password" className="mt-8 text-[#2f856b]">
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 w-[180px] mb-10 mt-2 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-[#abc8c0] border-[#2f856b]"
        />
        <Button onClick={handleCreateAccount}>Create Account</Button>
      </div>
    </div>
  );
}
