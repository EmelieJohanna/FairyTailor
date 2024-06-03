"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "../components/Button";
import Image from "next/image";
import crown from "/public/crown.png";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleCreateAccount = async () => {
    try {
      const response = await fetch("http://localhost:3008/users", {
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

  return (
    <div
      className="flex flex-col items-center"
      style={{
        backgroundImage: "url('/bg_hearts.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex flex-col justify-content items-center px-48 py-24">
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
          onChange={(e) => setUsername(e.target.value)}
          className="p-2 w-[180px] mt-2 focus:outline-none bg-[#fff0eb] text-black border-[2px] border-solid shadow-md shadow-[#abc8c0] border-[#2f856b]"
        />
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
