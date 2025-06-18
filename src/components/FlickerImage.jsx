// src/components/FlickerImage.jsx
import React, { useState, useEffect } from "react";

export default function FlickerImage({
  withImage,
  withoutImage,
  interval = 1000,
}) {
  const [showWith, setShowWith] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowWith((prev) => !prev);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  return (
    <div>
      <img
        src={withImage}
        alt="With megaphone"
        className={`absolute inset-0 w-full  object-contain md:object-cover  duration-700 ${
          showWith ? "opacity-100" : "opacity-0"
        }`}
        draggable={false}
      />
      <img
        src={withoutImage}
        alt="Without megaphone"
        className={`absolute inset-0 w-full object-contain md:object-cover  duration-700 ${
          showWith ? "opacity-0" : "opacity-100"
        }`}
        draggable={false}
      />
    </div>
  );
}
