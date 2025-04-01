import { createOptimizedPicture } from "../../scripts/aem.js";

let currentSlideIndex = 0; // This tracks the current slide index

function leftClick() {
  alert(currentSlideIndex);
  if (currentSlideIndex > 0) {
    alert(":left");
    currentSlideIndex--;
    updateCarousel(); // Move to the previous slide
  }
}

function rightClick() {
  alert(currentSlideIndex);
  if (currentSlideIndex < ul.children.length - 1) {
    currentSlideIndex++;
    updateCarousel(); // Move to the next slide
  }
}

function updateCarousel() {
  // Hide all slides
  [...ul.children].forEach((slide, index) => {
    slide.style.display = index === currentSlideIndex ? "block" : "none";
  });
}

export default function decorate(block) {
  // Create the unordered list for the carousel items
  const ul = document.createElement("ul");

  // Loop through all the children of the block and create carousel items (li elements)
  [...block.children].forEach(row => {
    const li = document.createElement("li");

    // Move all child elements from the row to the li
    while (row.firstElementChild) li.append(row.firstElementChild);

    // Add appropriate classes to divs inside the li
    [...li.children].forEach(div => {
      if (div.children.length === 1 && div.querySelector("picture")) {
        div.className = "slides-slide-image"; // For images
      } else {
        div.className = "slides-slide-body"; // For text/body content
      }
    });

    ul.append(li); // Add the li to the ul
  });

  // Optimize the images inside <picture> tags
  ul.querySelectorAll("picture > img").forEach(img =>
    img
      .closest("picture")
      .replaceWith(
        createOptimizedPicture(img.src, img.alt, false, [{ width: "1000" }])
      )
  );

  // Create the left and right navigation buttons
  let leftButton = document.createElement("button");
  leftButton.className = "left-button"; // Corrected class assignment
  let rightButton = document.createElement("button");
  rightButton.className = "right-button"; // Added right button class
  leftButton.innerHTML = "<"; // Left button symbol
  rightButton.innerHTML = ">"; // Right button symbol

  // Attach event listeners to buttons
  leftButton.addEventListener("click", leftClick);
  rightButton.addEventListener("click", rightClick);

  // Create the nav container and add buttons to it
  const nav = document.createElement("div");
  nav.className = "nav-button";
  nav.appendChild(leftButton);
  nav.appendChild(rightButton);

  // Clear the block content and add the new carousel structure
  block.textContent = "";
  block.append(ul);
  block.appendChild(nav);

  // Check if there is only one item in the carousel
  if (ul.children.length <= 1) {
    // Hide navigation buttons if there is only one item
    nav.style.display = "none";
  }

  // Initialize the carousel display to show the first slide
  updateCarousel();
}
