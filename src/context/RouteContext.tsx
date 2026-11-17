import React, { createContext, useContext, useState, useEffect } from "react";
import { scrollToTarget } from "@/lib/scroll";

export const CLIENT_REDIRECTS: Record<string, string> = {
  "/services/technical-seo": "/services/seo",
  "/services/custom-website-design": "/services",
  "/services/website-design": "/services",
  "/services/3d-website-development": "/services",
  "/services/custom-web-development": "/services/web-app-development",
  "/services/landing-page-development": "/services/business-website-development",
  "/services/website-performance-optimization": "/services/website-development",
  "/services/website-maintenance": "/services/website-development",
  "/industries/startups": "/industries/saas",
  "/terms-and-conditions": "/terms",
  "/terms-of-service": "/terms",
};

export const normalizePath = (p: string): string => {
  if (p.length > 1 && p.endsWith("/")) {
    return p.slice(0, -1);
  }
  return p;
};

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
      const raw = normalizePath(window.location.pathname || "/");
      const redirectTarget = CLIENT_REDIRECTS[raw];
      if (redirectTarget) {
        window.history.replaceState({}, "", redirectTarget + (window.location.hash || ""));
        return redirectTarget;
      }
      return raw;
    }
    return "/";
  });

  const scrollToAnchor = (hash: string) => {
    scrollToTarget(hash, { offset: -85, duration: 1.1 });
  };

  useEffect(() => {
    const handlePopState = () => {
      const raw = normalizePath(window.location.pathname || "/");
      const redirectTarget = CLIENT_REDIRECTS[raw];
      const target = redirectTarget || raw;
      if (redirectTarget) {
        window.history.replaceState({}, "", redirectTarget + (window.location.hash || ""));
      }
      setCurrentPath(target);
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
    const cleanTargetPath = normalizePath(targetPath || "/");
    const resolvedPath = CLIENT_REDIRECTS[cleanTargetPath] || cleanTargetPath;

    if (resolvedPath === currentPath) {
      if (hash) {
        window.history.pushState({}, "", `${resolvedPath}#${hash}`);
        scrollToAnchor(`#${hash}`);
      }
      return;
    }

    const fullNextUrl = hash ? `${resolvedPath}#${hash}` : resolvedPath;
    window.history.pushState({}, "", fullNextUrl);
    setCurrentPath(resolvedPath);

    if (hash) {
      setTimeout(() => {
        scrollToAnchor(`#${hash}`);
      }, 150);
    } else {
      // Scroll to top immediately on route change without hash
      scrollToTarget(0, { immediate: true });
      if (typeof window !== "undefined" && window.__lenis) {
        requestAnimationFrame(() => window.__lenis?.resize());
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

    // If default was prevented or external/special link, bail
    if (e.defaultPrevented) return;
    if (target === "_blank" || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    if (href.startsWith("http://") || href.startsWith("https://") || href.startsWith("tel:") || href.startsWith("mailto:")) return;

    e.preventDefault();
    navigate(href);
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
