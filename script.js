// The one animation "moment": the coach's swash draws in once on load.
// Everything else is static. Reduced-motion is honored by the stylesheet.
document.documentElement.classList.add("js");

const copy = window.FLUENTPITCH_SITE_COPY;

function getCopyValue(path) {
  return path.split('.').reduce((value, key) => value?.[key], copy);
}

function applyCopy() {
  if (!copy) return;
  document.title = copy.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', copy.description);
  document.querySelectorAll('[data-copy]').forEach((element) => {
    const value = getCopyValue(element.dataset.copy);
    if (typeof value === 'string') element.textContent = value;
  });
  document.querySelectorAll('[data-copy-html]').forEach((element) => {
    const value = getCopyValue(element.dataset.copyHtml);
    if (typeof value === 'string') {
      // The catalogue contains only version-controlled markup for the hero.
      element.innerHTML = value.replace(
        '</span>.',
        '<svg class="swash" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true"><path d="M3 10 C 40 4, 80 12, 118 7 S 180 6, 197 9" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg></span>.'
      );
    }
  });
}

applyCopy();

window.addEventListener("load", () => {
  document.querySelectorAll(".swash").forEach((el) => el.classList.add("draw"));
});
