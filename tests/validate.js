/* =====================================================
   ProCon Landing Page – Validation Tests
   Run: node tests/validate.js
   ===================================================== */

const fs   = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');

let passed = 0;
let failed = 0;

function assert(condition, msg) {
  if (condition) {
    console.log('  \u2705 ' + msg);
    passed++;
  } else {
    console.error('  \u274C ' + msg);
    failed++;
  }
}

/* ─── 1. Required files ─────────────────────────────── */
console.log('\n\u25B6 Required Files');
const requiredFiles = [
  'index.html', 'style.css', 'script.js',
  'impressum.html', 'datenschutz.html', 'agb.html', 'cookies.html',
  '.nojekyll',
  '.github/workflows/deploy.yml',
  '.github/workflows/ci.yml'
];
requiredFiles.forEach(function (f) {
  assert(fs.existsSync(path.join(root, f)), f + ' exists');
});

/* ─── 2. Required HTML IDs ──────────────────────────── */
console.log('\n\u25B6 Required HTML IDs in index.html');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');

const requiredIds = [
  'nav', 'hero', 'features', 'how', 'showcase', 'pricing', 'faq',
  'contact-modal', 'contact-form',
  'lang-de', 'lang-en', 'lang-de-m', 'lang-en-m',
  'mobile-menu-btn', 'mobile-nav',
  'cf-name', 'cf-email', 'cf-message', 'cf-subject', 'cf-error',
  'icon-moon', 'icon-sun', 'theme-toggle',
  'tab-dashboard', 'tab-projects', 'tab-prompts', 'tab-logs',
  'footer-year'
];
requiredIds.forEach(function (id) {
  assert(html.includes('id="' + id + '"'), 'id="' + id + '" found');
});

/* ─── 3. Anchor links resolve ───────────────────────── */
console.log('\n\u25B6 Anchor Links Resolve');
var anchorRe = /href="#([^"]+)"/g;
var match;
while ((match = anchorRe.exec(html)) !== null) {
  var anchor = match[1];
  if (anchor === 'kontakt') continue; // openContactModal
  assert(
    html.includes('id="' + anchor + '"'),
    'anchor #' + anchor + ' has a matching id'
  );
}

/* ─── 4. Language attributes ────────────────────────── */
console.log('\n\u25B6 Language Attributes (data-de / data-en)');
var deCount = (html.match(/data-de="/g) || []).length;
var enCount = (html.match(/data-en="/g) || []).length;
assert(deCount >= 50, 'data-de count >= 50 (found ' + deCount + ')');
assert(enCount >= 50, 'data-en count >= 50 (found ' + enCount + ')');
assert(deCount === enCount, 'data-de count equals data-en count (' + deCount + ' vs ' + enCount + ')');

/* ─── 5. iPhone screens ─────────────────────────────── */
console.log('\n\u25B6 iPhone Screens');
var screenCount = (html.match(/class="app-screen/g) || []).length;
assert(screenCount >= 3, 'At least 3 .app-screen divs found (' + screenCount + ')');

/* ─── 6. Showcase tab panels ────────────────────────── */
console.log('\n\u25B6 Showcase Tab Panels');
var panelCount = (html.match(/class="tab-panel/g) || []).length;
assert(panelCount >= 4, 'At least 4 .tab-panel divs found (' + panelCount + ')');

/* ─── 7. Pricing section ────────────────────────────── */
console.log('\n\u25B6 Pricing Section');
assert(html.includes('id="pricing"'), 'Pricing section exists');
var pricingCardCount = (html.match(/class="pricing-card/g) || []).length;
assert(pricingCardCount >= 2, 'At least 2 pricing cards found (' + pricingCardCount + ')');
assert(html.includes('featured'), 'Featured pricing card present');

/* ─── 8. FAQ section ────────────────────────────────── */
console.log('\n\u25B6 FAQ Section');
assert(html.includes('id="faq"'), 'FAQ section exists');
var faqCount = (html.match(/class="faq-item/g) || []).length;
assert(faqCount >= 4, 'At least 4 FAQ items found (' + faqCount + ')');

/* ─── 9. script.js contact modal functions ──────────── */
console.log('\n\u25B6 script.js Contact Modal Functions');
var js = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
assert(js.includes('window.openContactModal'), 'window.openContactModal defined');
assert(js.includes('window.closeContactModal'), 'window.closeContactModal defined');
assert(js.includes('window.submitContactForm'), 'window.submitContactForm defined');

/* ─── 10. Bento/feature cards ───────────────────────── */
console.log('\n\u25B6 Feature Bento Cards');
var bentoCount = (html.match(/class="bento-card/g) || []).length;
assert(bentoCount >= 4, 'At least 4 bento cards found (' + bentoCount + ')');

/* ─── 11. Meta tags ─────────────────────────────────── */
console.log('\n\u25B6 Meta Tags');
assert(html.includes('<meta charset'), 'charset meta tag present');
assert(html.includes('name="viewport"'), 'viewport meta tag present');
assert(html.includes('name="description"'), 'description meta tag present');
assert(html.includes('og:title'), 'og:title meta tag present');

/* ─── Summary ───────────────────────────────────────── */
console.log('\n' + '='.repeat(50));
console.log('Total: ' + (passed + failed) + '  \u2705 Passed: ' + passed + '  \u274C Failed: ' + failed);
if (failed > 0) {
  process.exit(1);
} else {
  console.log('\nAll checks passed!');
}