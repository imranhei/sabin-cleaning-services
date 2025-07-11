import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // or any icon you like

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed animate-bounce duration-1000 bottom-6 right-6 z-50 bg-[#79c043] hover:bg-[#5ea132] text-white p-3 rounded-full shadow-lg transition"
    >
      <ArrowUp className="size-5" />
    </button>
  );
};

export default GoToTopButton;
