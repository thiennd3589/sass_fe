import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface ScrollTopProps {
  children: JSX.Element;
}

const ScrollToTop = (props: ScrollTopProps) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return props.children;
};

export default ScrollToTop;
