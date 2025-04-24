"use client";

import { useEffect, useState } from "react";

export const useTheme = () => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    const savedTheme = useUniversalStorage("theme") as "light" | "dark" | null;
    setTheme(savedTheme || "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setValue("theme", newTheme);
    document.body.classList.toggle("light-mode", newTheme === "light");
  };

  return { theme, toggleTheme };
};

function useUniversalStorage(arg0: string): "light" | "dark" | null {
  throw new Error("Function not implemented.");
}


function setValue(arg0: string, newTheme: string) {
  throw new Error("Function not implemented.");
}