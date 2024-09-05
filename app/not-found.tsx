import React from "react";

const NotFound: React.FC = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1 style={{ fontSize: "3rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem" }}>Page Not Found</p>
      <p>
        The page you are looking for does not exist.
        <a href="/" style={{ color: "blue" }}>
          {" "}
          Return to the homepage
        </a>
        .
      </p>
    </div>
  );
};

export default NotFound;
