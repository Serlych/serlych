"use client";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <label className="mr-5 inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        value=""
        className="peer sr-only"
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <span className="text-3xl font-medium text-gray-900 dark:text-gray-300">
        ☀️
      </span>
      <div className="peer relative mx-3 h-7 w-14 rounded-full bg-gray-200 after:absolute after:start-[4px] after:top-0.5 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
      <span className="text-3xl font-medium text-gray-900 dark:text-gray-300">
        🌑
      </span>
    </label>
  );
}
