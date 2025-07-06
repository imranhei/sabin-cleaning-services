import { useLocation } from "react-router-dom";

export const useBreadcrumbJson = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const breadcrumbs = [];

  // Always start with Home
  breadcrumbs.push({ type: "link", label: "Home", to: "/" });

  segments.forEach((segment, index) => {
    const path = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;

    // Format label: e.g., 'floor-cleaning' -> 'Floor Cleaning'
    const label = decodeURIComponent(segment)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    // Add separator before each item (except home)
    breadcrumbs.push({ type: "separator" });

    if (isLast) {
      breadcrumbs.push({ type: "page", label });
    } else {
      breadcrumbs.push({ type: "link", label, to: path });
    }
  });

  return breadcrumbs;
};
