import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  const titleMeta = getMetadata("title");
  const titlePath = titleMeta;
    ? new URL(titleMeta, window.location).pathname
    : "/title";
  const fragment = await loadFragment(titlePath);
  
  block.textContent = "";
  const title = document.createElement("div");
  while (fragment.firstElementChild) title.append(fragment.firstElementChild);

  block.append(title);
}
