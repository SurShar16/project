export default function decorate(block) {
  const items = block.querySelectorAll("div");

  items.forEach(item => {
    const [questionContainer] = item.children;
    if (!questionContainer) return;

    const p = questionContainer.querySelector("p");
    if (!p) return;

    const html = p.innerHTML.split("<br>");
    if (html.length < 2) return;

    const [question, answer] = html;
    p.innerHTML = question;

    const answerDiv = document.createElement("div");
    answerDiv.innerHTML = answer;
    answerDiv.style.display = "none";
    p.after(answerDiv);

    // Toggle answer + icon
    p.addEventListener("click", () => {
      const isVisible = answerDiv.style.display === "block";
      answerDiv.style.display = isVisible ? "none" : "block";
      p.classList.toggle("active", !isVisible); // <-- this toggles the icon
    });
  });
}
