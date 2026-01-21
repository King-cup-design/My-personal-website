document.querySelectorAll(".level-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const level = btn.getAttribute("data-level");
    window.location.href = `${level}/index.html`;
  });
});
