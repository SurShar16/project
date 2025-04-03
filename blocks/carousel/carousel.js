import { createOptimizedPicture } from "../../scripts/aem.js";

function updateCarousel(currentSlideIndex, ul) {
  [...ul.children].forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.style.display = "block"; // Show the current slide
    } else {
      slide.style.display = "none"; // Hide the other slides
    }
  });
}

function dotsActive(currentSlideIndex, dots) {
  [...dots.children].forEach((dot, index) => {
    if (index === currentSlideIndex) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}

export default function decorate(block) {
  // Create the unordered list for the carousel items
  const ul = document.createElement("ul");
  let currentSlideIndex = 0;

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

  const leftButton = document.createElement("button");
  leftButton.className = "left-button"; // Corrected class assignment
  const rightButton = document.createElement("button");
  rightButton.className = "right-button"; // Added right button class
  const leftIcon = document.createElement("img");
  leftIcon.src = "../../icons/right-arrow.png";
  leftIcon.alt = "Description of the image";
  leftIcon.style.transform = "rotate(180deg)";
  leftButton.appendChild(leftIcon);
  const rightIcon = document.createElement("img");
  rightIcon.src = "../../icons/right-arrow.png";
  rightIcon.alt = "Description of the image";
  rightButton.appendChild(rightIcon);

  const dots = document.createElement("div");
  dots.className = "carousel-dots";
  // Create a dot for each slide
  [...ul.children].forEach(() => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dots.appendChild(dot);
  });
  dotsActive(currentSlideIndex, dots);

  leftButton.addEventListener("click", () => {
    if (currentSlideIndex > 0) {
      currentSlideIndex--;
      updateCarousel(currentSlideIndex, ul);
      dotsActive(currentSlideIndex, dots);
    } else {
      currentSlideIndex = ul.children.length - 1;
      updateCarousel(currentSlideIndex, ul);
      dotsActive(currentSlideIndex, dots);
    }
    console.log(currentSlideIndex);
  });
  rightButton.addEventListener("click", () => {
    if (currentSlideIndex < ul.children.length - 1) {
      currentSlideIndex++;
      updateCarousel(currentSlideIndex, ul);
      dotsActive(currentSlideIndex, dots);
    } else {
      currentSlideIndex = 0;
      dotsActive(currentSlideIndex, dots);
      updateCarousel(currentSlideIndex, ul);
    }
    console.log(currentSlideIndex);
  });

  [...dots.children].forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlideIndex = index;
      updateCarousel(currentSlideIndex, ul, dots);
      dotsActive(currentSlideIndex, dots);
    });
  });

  // Create the nav container and add buttons to it
  const nav = document.createElement("div");
  nav.className = "nav-button";
  nav.appendChild(leftButton);
  nav.appendChild(rightButton);
  nav.appendChild(dots);

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
