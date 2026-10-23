import { SubpageConfig } from "@/components/templates/GenericSubpage";
import { commercialPages } from "./commercial";
import { servicePages } from "./services";
import { industryPages } from "./industries";
import { pricingPages } from "./pricing";
import { conversionPages } from "./conversion";
import { geoHubPages } from "./geo-hubs";
import { internetMarketingPages } from "./internet-marketing";

export const allSubpages: Record<string, SubpageConfig> = {
  ...commercialPages,
  ...servicePages,
  ...industryPages,
  ...pricingPages,
  ...conversionPages,
  ...geoHubPages,
  ...internetMarketingPages,
};

export const getSubpageConfig = (pathname: string): SubpageConfig | undefined => {
  // Normalize trailing slash
  const cleanPath = pathname.length > 1 && pathname.endsWith("/")
    ? pathname.slice(0, -1)
    : pathname;
  return allSubpages[cleanPath];
};

export const getAllSubpageRoutes = (): string[] => {
  return Object.keys(allSubpages);
};
