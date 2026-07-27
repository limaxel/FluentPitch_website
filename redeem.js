/* Browser fallback for an event Universal Link. Never render query input as
 * HTML: the code is forwarded only to the app, which validates it server-side.
 */
(() => {
  const copy = window.FLUENTPITCH_SITE_COPY?.redeem || {};
  const params = new URLSearchParams(window.location.search);
  const rawCode = params.get('code') || '';
  const code = rawCode.trim().toUpperCase();
  const valid = /^[A-Z0-9-]{1,64}$/.test(code);
  const openApp = document.getElementById('open-app');
  const title = document.getElementById('redeem-title');
  const body = document.getElementById('redeem-body');
  const kicker = document.getElementById('redeem-kicker');
  const note = document.getElementById('redeem-note');
  const home = document.getElementById('redeem-home');

  title.textContent = copy.title || title.textContent;
  body.textContent = copy.body || body.textContent;
  openApp.textContent = copy.open || openApp.textContent;
  note.textContent = copy.note || note.textContent;
  home.textContent = copy.home || home.textContent;
  kicker.textContent = copy.kicker || kicker.textContent;

  if (!valid) {
    title.textContent = copy.invalidTitle || 'This offer link is incomplete.';
    body.textContent = copy.invalidBody || 'Ask the event organiser for a fresh FluentPitch offer link.';
    openApp.hidden = true;
    return;
  }

  // Universal Links open the app directly on supported iPhones. This is only
  // the browser fallback, so a deliberate click is kinder than forcing a
  // custom-scheme redirect on a device without the app.
  openApp.href = `fluentpitch://redeem?code=${encodeURIComponent(code)}`;
})();
