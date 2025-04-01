import { createOptimizedPicture } from "../../scripts/aem.js";

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement("ul");
  [...block.children].forEach((row) => {
    console.log(row);
    const li = document.createElement("li");
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector("picture"))
        div.className = "slides-slide-image";
      else div.className = "slides-slide-body";
    });
    ul.append(li);
  });
  ul.querySelectorAll("picture > img").forEach((img) =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "1000" }])
      )
  );
//   let leftButton = document.createElement("button");
//   leftButton.class = "left-button";
//   let rightButton = document.createElement("button");
//   leftButton.innerHTML = "<";
//   rightButton.innerHTML = ">";
//   leftButton.addEventListener("click", () => leftClick());
//   rightButton.addEventListener("click", () => rightClick());
//   const nav = document.createElement("div");
  //   nav.class = "nav"
//   let slideIndex = 1;
  
  
//   nav.appendChild(leftButton);
//   nav.appendChild(rightButton);
//   nav.className = "nav-button";
  block.textContent = "";
  block.append(ul);
//   block.appendChild(nav);
}
