const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///Users/axel/AIMentorMono/website/index.html');
  await new Promise(r => setTimeout(r, 2000)); // Wait for animations
  await page.screenshot({path: 'website_test.png'});
  await browser.close();
})();
