import React from "react";
import Link from "next/link";

export default function SaveStoryModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-pink bg-opacity-75"
    >
      <div className="bg-light-pink p-6 w-80 border-solid border-dark-pink shadow-lg">
        <h2
          id="modal-title"
          className=" text-center text-lg font-semibold mb-4"
        >
          Save story
        </h2>
        <p id="modal-description" className="mb-6 text-center">
          You need to be logged in to save your story.
        </p>
        <div className="flex justify-between">
          <Link
            href="/createAccount"
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 border-solid border-red-300 no-underline"
          >
            Create Account
          </Link>
          <Link
            href="/login"
            className="bg-red-500 text-white px-4 py-2  hover:bg-red-600 border-solid border-red-300 no-underline"
          >
            Log in
          </Link>
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 hover:bg-gray-400 border-solid border-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
