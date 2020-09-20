import { getConfig } from "hkclient-ts/selectors/entities/general";
import { GlobalState } from "hkclient-ts/types/store";

export function getBasePath(state: GlobalState) {
  const config = getConfig(state);

  if (config.SiteURL) {
    return new URL(config.SiteURL).pathname;
  }

  return (window as any).basename || "/";
}
