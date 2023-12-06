"use client";

import { useEffect, useRef } from "react";

const Theme = () => {
  const themeToggleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const themeToggle = themeToggleRef.current;

    function toggleTheme() {
      const htmlTag = document.documentElement;
      const currentTheme = htmlTag.getAttribute("data-theme");

      // Toggle the theme
      if (currentTheme === "night") {
        htmlTag.setAttribute("data-theme", "lofi");
        localStorage.setItem("theme", "lofi");
      } else {
        htmlTag.setAttribute("data-theme", "night");
        localStorage.setItem("theme", "night");
      }
    }

    if (themeToggle) {
      themeToggle.addEventListener("change", toggleTheme);

      // On page load, check the user's preferred theme
      if (localStorage.getItem("theme") === "night") {
        document.documentElement.setAttribute("data-theme", "night");
        themeToggle.checked = true; // Set the checkbox state accordingly
      } else {
        document.documentElement.setAttribute("data-theme", "lofi");
      }
    }

    return () => {
      if (themeToggle) {
        themeToggle.removeEventListener("change", toggleTheme);
      }
    };
  }, []);

  return (
    <input
      type="checkbox"
      id="theme-controller"
      value="night"
      ref={themeToggleRef}
    />
  );
};

export default Theme;
