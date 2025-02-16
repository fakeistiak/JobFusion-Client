import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode, MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

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
      className="flex items-center gap-2 text-black"
    >
      {theme === "dark" ? <MdOutlineLightMode  size={28} /> : <MdOutlineDarkMode    size={28} />}
      {/* {theme === "dark" ? "Light Mode" : "Dark Mode"} */}
    </button>
  );
}
