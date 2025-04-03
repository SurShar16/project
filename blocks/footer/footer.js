import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  // console.log([...block.children])
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  footer.id = "footer-container";
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const links = ["brand", "link", "social", "text"];
  links.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`footer-${c}`);
  });
  console.log(document.querySelector(".footer-social"));

  const footerWrap = document.createElement("div");
  footerWrap.class = "footer-wrap";
  footerWrap.appendChild(footer);
  block.append(footerWrap);
}
