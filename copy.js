/*
 * Public-site English copy.
 *
 * Keep customer-facing strings here so a future locale can replace one
 * catalogue instead of hunting through markup. The HTML retains English
 * fallbacks for visitors who disable JavaScript.
 */
window.FLUENTPITCH_SITE_COPY = Object.freeze({
  title: 'FluentPitch | AI interview coach',
  description: 'FluentPitch records your mock interview and hands it back annotated — pacing, eye contact, and whether your answer addressed the question.',
  hero: {
    kicker: 'interview coach',
    title: 'Rehearse it. Then<br>read the <span class="em">markup</span>.',
    lede: 'FluentPitch records your mock interview and hands it back annotated — where your pacing drifts, whether you held eye contact, and <strong>whether your answer actually addressed the question.</strong>',
    cta: 'Join TestFlight',
  },
  features: [
    {
      kicker: 'Delivery coaching',
      title: 'Notice the habits that are hard to catch',
      body: 'Track eye contact, posture, and pacing during practice, then review the patterns that show up under pressure.',
    },
    {
      kicker: 'Role alignment',
      title: 'Measure each answer against the job',
      body: 'Add a job description to see which claims need evidence, which questions you missed, and what landed well.',
    },
    {
      kicker: 'Privacy',
      title: 'Your biometric data stays on your phone',
      body: 'Video is processed on-device and never uploaded. Raw biometric telemetry never leaves your device.',
    },
  ],
  sample: {
    kicker: 'playback review',
    title: 'See your delivery in context',
    label: 'Practice playback',
    question: 'Question 3',
    duration: '00:10',
    moments: [
      {
        time: '00:02',
        position: '16%',
        seekAt: 1.6,
        label: 'Hedging',
        title: 'Start with the result.',
        body: 'Lead with the impact, then explain how you got there.',
      },
      {
        time: '00:05',
        position: '50%',
        seekAt: 5,
        label: 'Evidence',
        title: 'Keep this detail.',
        body: 'This specific outcome gives your answer credibility.',
      },
      {
        time: '00:08',
        position: '82%',
        seekAt: 8.2,
        label: 'Delivery',
        title: 'End on the outcome.',
        body: 'Land the result before moving to the next point.',
      },
    ],
  },
  footer: '© 2026 FluentPitch',
  redeem: {
    kicker: 'event offer',
    title: 'Open FluentPitch to claim your offer.',
    body: 'Sign in or create an account in the app, then review and claim the offer there.',
    open: 'Open FluentPitch',
    note: 'If the app is installed, this page should open it automatically. The offer is only added after you sign in and confirm the claim.',
    home: 'Learn about FluentPitch',
    invalidTitle: 'This offer link is incomplete.',
    invalidBody: 'Ask the event organiser for a fresh FluentPitch offer link.',
  },
});
