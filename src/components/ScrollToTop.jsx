import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // This forces the browser to the top-left coordinate (0, 0)
    window.scrollTo(0, 0);
  }, [pathname]); // This runs every time the URL path changes

  return null; // This component doesn't render any HTML
};

export default ScrollToTop;