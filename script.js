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

function setupPlaybackDemo() {
  const markers = Array.from(document.querySelectorAll('[data-moment-index]'));
  const time = document.querySelector('[data-playback-time]');
  const label = document.querySelector('[data-playback-label]');
  const title = document.querySelector('[data-playback-title]');
  const body = document.querySelector('[data-playback-body]');
  const video = document.querySelector('[data-playback-video]');
  const moments = copy?.sample?.moments;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeIndex = 0;
  let previewTimer;

  if (!markers.length || !time || !label || !title || !body || !Array.isArray(moments)) return;

  markers.forEach((marker, index) => {
    const position = moments[index]?.position;
    if (typeof position === 'string') marker.style.setProperty('--position', position);
  });

  function selectMoment(index) {
    const moment = moments[index];
    if (!moment) return;

    activeIndex = index;
    time.textContent = moment.time;
    label.textContent = moment.label;
    title.textContent = moment.title;
    body.textContent = moment.body;

    if (video && Number.isFinite(moment.seekAt)) {
      video.currentTime = Math.min(moment.seekAt, video.duration || moment.seekAt);
      video.play().catch(() => {});
    }

    markers.forEach((marker, markerIndex) => {
      const active = markerIndex === index;
      marker.classList.toggle('is-active', active);
      marker.classList.toggle('is-muted', !active);
      marker.setAttribute('aria-selected', String(active));
    });

  }

  function startPreview() {
    if (reducedMotion || previewTimer) return;
    previewTimer = window.setInterval(() => {
      selectMoment((activeIndex + 1) % moments.length);
    }, 3000);
  }

  function pausePreview() {
    if (!previewTimer) return;
    window.clearInterval(previewTimer);
    previewTimer = undefined;
  }

  markers.forEach((marker) => {
    marker.addEventListener('click', () => {
      selectMoment(Number(marker.dataset.momentIndex));
      pausePreview();
      startPreview();
    });
    marker.addEventListener('keydown', (event) => {
      const currentIndex = Number(marker.dataset.momentIndex);
      let nextIndex = currentIndex;

      if (event.key === 'ArrowRight') nextIndex = Math.min(currentIndex + 1, markers.length - 1);
      if (event.key === 'ArrowLeft') nextIndex = Math.max(currentIndex - 1, 0);
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = markers.length - 1;
      if (nextIndex === currentIndex) return;

      event.preventDefault();
      selectMoment(nextIndex);
      pausePreview();
      startPreview();
      markers[nextIndex].focus();
    });
  });

  function initialisePreview() {
    if (reducedMotion) {
      video.pause();
      return;
    }
    selectMoment(0);
    startPreview();
  }

  if (video?.readyState >= HTMLMediaElement.HAVE_METADATA) {
    initialisePreview();
  } else {
    video?.addEventListener('loadedmetadata', initialisePreview, { once: true });
  }
}

setupPlaybackDemo();

window.addEventListener("load", () => {
  document.querySelectorAll(".swash").forEach((el) => el.classList.add("draw"));
});
