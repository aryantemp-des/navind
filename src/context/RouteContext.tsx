import React, { createContext, useContext, useState, useEffect } from "react";

interface RouteContextType {
  currentPath: string;
  navigate: (path: string) => void;
}

const RouteContext = createContext<RouteContextType>({
  currentPath: "/",
  navigate: () => {},
});

export const RouteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname || "/";
    }
    return "/";
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith("#")) {
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("tel:") || path.startsWith("mailto:")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    if (path !== currentPath) {
      window.history.pushState({}, "", path);
      setCurrentPath(path);
      
      // Scroll to top immediately on route change
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
    }
  };

  return (
    <RouteContext.Provider value={{ currentPath, navigate }}>
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);

export const Link: React.FC<{
  href: string;
  className?: string;
  children: React.ReactNode;
  title?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  style?: React.CSSProperties;
}> = ({ href, className, children, title, target, rel, onClick, style }) => {
  const { navigate } = useRoute();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (e.defaultPrevented) return;

    if (
      !target &&
      !e.ctrlKey &&
      !e.metaKey &&
      !e.shiftKey &&
      !e.altKey &&
      !href.startsWith("http") &&
      !href.startsWith("tel:") &&
      !href.startsWith("mailto:")
    ) {
      e.preventDefault();
      navigate(href);
    }
  };

  return (
    <a
      href={href}
      className={className}
      title={title}
      target={target}
      rel={rel}
      onClick={handleClick}
      style={style}
    >
      {children}
    </a>
  );
};
