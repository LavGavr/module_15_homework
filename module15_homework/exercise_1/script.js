const btn = document.querySelector(".btn-main");

btn.addEventListener("click", (e) => {
  const icon = document.querySelector("#icon");
  let iconEl = icon.children[0].children[0];

  iconEl.getAttribute("href") === "#arrow-left"
    ? iconEl.setAttribute("href", "#arrow-right")
    : iconEl.setAttribute("href", "#arrow-left");
});