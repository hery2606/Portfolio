import { lazy } from "react";
import { PROJECT_META_BY_SLUG } from "../data/projectMeta";

const PROJECT_DETAIL_COMPONENTS = {
  "smart-clinic": lazy(() => import("./SmartClinic")),
  "tagana-squence": lazy(() => import("./TaganaSquence")),
};

export function getProjectRouteConfig(slug) {
  const metadata = PROJECT_META_BY_SLUG[slug];
  if (!metadata) return null;

  return {
    ...metadata,
    Component: PROJECT_DETAIL_COMPONENTS[slug],
  };
}
