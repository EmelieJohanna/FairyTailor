import React, { useEffect } from "react";
import { useRef } from "react";
import styles from "./StarsLoader.module.css";

const StarsLoader = ({ count }) => {
  const starsContainerRef = useRef(null);

  useEffect(() => {
    const starsContainer = starsContainerRef.current;
    if (!starsContainer) return;

    starsContainer.innerHTML = "";

    const containerWidth = starsContainer.offsetWidth;
    const containerHeight = starsContainer.offsetHeight;

    for (let i = 0; i < count; i++) {
      const star = document.createElement("img");
      const starType = Math.random() < 0.5 ? "star.png" : "little_star.png";
      star.src = `/${starType}`;
      star.alt = "Star";
      star.className = styles.star;

      const xPos = Math.random() * (containerWidth - 20); // dela med 20 så de håller sig innanför containern
      const yPos = Math.random() * (containerHeight - 20);

      const size = Math.random() * 2 + 0.5;
      star.style.left = `${xPos}px`;
      star.style.top = `${yPos}px`;
      star.style.width = `${size}em`;

      const delay = Math.random() * 3;
      star.style.animationDelay = `-${delay}s`;

      starsContainer.appendChild(star);
    }
  }, [count]);

  return (
    <div className="flex flex-col items-center">
      <div ref={starsContainerRef} className={styles.starsContainer}></div>
      <p className="loader-text text-yellow-600 text-xl italic font-sans">
        Writing your story...
      </p>
    </div>
  );
};

export default StarsLoader;
