import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // load footer as fragment
  alert('hii')
  const rendercardsMeta = getMetadata("rendercards");
  const rendercardsPath = rendercardsMeta
    ? new URL(rendercardsMeta, window.location).pathname
    : "/rendercards";
  const fragment = await loadFragment(rendercardsPath);

  // decorate footer DOM
  block.textContent = "";
  const rendercards = document.createElement("div");
  rendercards.className = "rendercards-wrapper";
  while (fragment.firstElementChild)
    rendercards.append(fragment.firstElementChild);
  const buttonRed = document.getElementsByClassName("rendercards-red");
  const textChange = document.getElementsByClassName("text-color");
  buttonRed.addEventListener("click", function () {
    // Changing the color style of the paragraph
    textChange.style.color = "blue";
  });

  block.append(rendercards);
}
