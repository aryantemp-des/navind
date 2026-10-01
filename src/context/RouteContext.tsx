import React, { createContext, useContext, useState, useEffect } from "react";
import { scrollToTarget } from "@/lib/scroll";

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

  const scrollToAnchor = (hash: string) => {
    scrollToTarget(hash, { offset: -85, duration: 1.1 });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || "/");
      if (window.location.hash) {
        setTimeout(() => {
          scrollToAnchor(window.location.hash);
        }, 150);
      }
    };

    window.addEventListener("popstate", handlePopState);

    if (typeof window !== "undefined" && window.location.hash) {
      setTimeout(() => {
        scrollToAnchor(window.location.hash);
      }, 250);
    }

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (path.startsWith("#")) {
      scrollToAnchor(path);
      return;
    }

    if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("tel:") || path.startsWith("mailto:")) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    const [targetPath, hash] = path.split("#");
    const cleanTargetPath = targetPath || "/";

    if (cleanTargetPath === currentPath) {
      if (hash) {
        window.history.pushState({}, "", path);
        scrollToAnchor(`#${hash}`);
      }
      return;
    }

    window.history.pushState({}, "", path);
    setCurrentPath(cleanTargetPath);

    if (hash) {
      setTimeout(() => {
        scrollToAnchor(`#${hash}`);
      }, 150);
    } else {
      // Scroll to top immediately on route change without hash
      scrollToTarget(0, { immediate: true });
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
