import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-2 text-white"
    >
      {theme === "dark" ? <MdLightMode size={28} /> : <MdDarkMode   size={28} />}
      {/* {theme === "dark" ? "Light Mode" : "Dark Mode"} */}
    </button>
  );
}
