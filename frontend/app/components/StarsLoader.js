import React, { useEffect } from "react";
import { useRef } from "react";
import styles from "./StarsLoader.module.css";

const StarsLoader = ({ count }) => {
  const starsContainerRef = useRef(null);

  useEffect(() => {
    const starsContainer = starsContainerRef.current;
    if (!starsContainer) return;

    // Clear existing stars
    starsContainer.innerHTML = "";

    const containerWidth = starsContainer.offsetWidth;
    const containerHeight = starsContainer.offsetHeight;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("img");
      // Randomly select between star.png and little_star.png
      const starType = Math.random() < 0.5 ? "star.png" : "little_star.png";
      star.src = `/${starType}`; // Path to the selected star image
      star.alt = "Star";
      star.className = styles.star;

      // Random position within container width and height
      const xPos = Math.random() * (containerWidth - 20); // Subtract 20 to ensure the star's size doesn't exceed the container
      const yPos = Math.random() * (containerHeight - 20); // Subtract 20 to ensure the star's size doesn't exceed the container

      const size = Math.random() * 2 + 0.5; // Random size between 0.5 and 2
      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;
      star.style.width = `${size}em`;

      // Random animation delay for twinkling effect
      const delay = Math.random() * 3; // Random delay between 0 and 3 seconds
      star.style.animationDelay = `-${delay}s`;

      starsContainer.appendChild(star);
    }
  }, [count]);

  return (
    <div className="flex flex-col items-center">
      <div ref={starsContainerRef} className={styles.starsContainer}></div>
      <p className="loader-text text-yellow-600 text-xl italic font-sans">
        Writing your Story...
      </p>
    </div>
  );
};

export default StarsLoader;
