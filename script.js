// The one animation "moment": the coach's swash draws in once on load.
// Everything else is static. Reduced-motion is honored by the stylesheet.
document.documentElement.classList.add("js");

window.addEventListener("load", () => {
  document.querySelectorAll(".swash").forEach((el) => el.classList.add("draw"));
});
