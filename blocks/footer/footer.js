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

  const footerLinks = document.createElement("div");
  const footerText = document.createElement("div");
  footerLinks.id = "footer-link";
  footerText.id = "footer-text";
  const links = ["brand", "sections", "social"];
  links.forEach((c, i) => {
    const section = footer.children[i];
    if (section) section.classList.add(`footer-${c}`);
  });
  // footer.appendChild(footerText)
  const text1 = document.createElement("div");
  text1.id = "text1";
  text1.innerHTML = "Ⓒ 2019,  WKND Site.";
  const text2 = document.createElement("div");
  text2.id = "text2";
  text2.innerHTML =
    "WKND is a fictitious adventure and travel website created by Adobe to demonstrate how anyone can use Adobe Experience Manager to build a beautiful, feature-rich website over a single weekend. This site is built entirely with Adobe Experience Manager Core Components and Archetype that are available as open source code to the public. The entire site source code is available as open source as well and is accompanied with a detailed tutorial on how to recreate the site.";
  const text3 = document.createElement("div");
  text3.id = "text3";
  text3.innerHTML =
    "Many of the beautiful images in the WKND site are available for purchase via Adobe Stock.";
  footerText.appendChild(text1);
  footerText.appendChild(text2);
  footerText.appendChild(text3);
  // footer.appendChild(footerLink

  const footerWrap = document.createElement("div");
  footerWrap.class = "footer-wrap";
  footerWrap.appendChild(footer);
  footerWrap.appendChild(footerText);
  block.append(footerWrap);
}
