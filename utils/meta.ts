import { fromFileUrl } from "std/path/mod.ts";

export const staticRootURL = new URL("../static/", import.meta.url);
export const staticRoot = fromFileUrl(staticRootURL);
