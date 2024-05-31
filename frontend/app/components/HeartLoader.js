import "./HeartLoader.css";

const HeartLoader = () => {
  return (
    <div>
      <div className="loader">
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
        <img src="/heart.png" alt="Loading..." />
      </div>
      <p className="loader-text">
        Writing your story
        <span className="dot1">.</span>
        <span className="dot2">.</span>
        <span className="dot3">.</span>
      </p>{" "}
    </div>
  );
};

export default HeartLoader;
