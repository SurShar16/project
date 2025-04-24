export default function decorate(block) {
  const tabList = block.querySelectorAll("ul > li");
  const allSections = document.querySelectorAll(".cards-container");

  const normalize = str =>
    str
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const tabLabels = Array.from(tabList).map(tab => normalize(tab.textContent));

  function activateTab(index) {
    const selectedLabel = tabLabels[index];

    // Update active tab styling
    tabList.forEach((tab, i) => {
      tab.classList.toggle("active-tab", i === index);
    });

    // Show/hide content sections
    allSections.forEach(section => {
      const sectionClasses = Array.from(section.classList).map(normalize);

      const showSection =
        selectedLabel === "all"
          ? sectionClasses.includes("all") // Show ONLY `.tab-card.all`
          : sectionClasses.includes(selectedLabel); // Show matching section

      section.style.display = showSection ? "block" : "none";
    });
  }

  // Attach click events to tabs
  tabList.forEach((tab, index) => {
    tab.addEventListener("click", () => activateTab(index));
  });

  // Activate first tab on load
  activateTab(0);
}
