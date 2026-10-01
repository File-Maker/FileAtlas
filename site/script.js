/* Copyright © 2026 Saba Iakobidze. All rights reserved. */
'use strict';
const clock = document.getElementById('clock');
function updateClock() {
  clock.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
updateClock();
setInterval(updateClock, 30000);

const dialog = document.getElementById('lightbox');
const image = document.getElementById('lightbox-image');
const title = document.getElementById('lightbox-title');
document.querySelectorAll('[data-image]').forEach(button => {
  button.addEventListener('click', () => {
    image.src = button.dataset.image;
    image.alt = button.dataset.caption;
    title.textContent = button.dataset.caption;
    dialog.showModal();
  });
});
document.getElementById('close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const box = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) dialog.close();
});

// A usable release-page link is present even without JavaScript or API access.
// Only the public FileAtlasSetup installer is eligible; never owner/Dev/Lab tools.
const latestRelease = 'https://github.com/File-Maker/FileAtlas/releases/latest';
function selectInstaller(assets) {
  return assets.find(asset => /^FileAtlasSetup(?:[-_v]?\d[\w.+-]*)?\.(exe|msi)$/i.test(asset.name)
    && typeof asset.browser_download_url === 'string'
    && asset.browser_download_url.startsWith('https://github.com/File-Maker/FileAtlas/releases/download/'));
}
async function refreshDownloadLinks() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 6000);
  try {
    const response = await fetch('https://api.github.com/repos/File-Maker/FileAtlas/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' }, signal: controller.signal
    });
    if (!response.ok) throw new Error('Release unavailable');
    const release = await response.json();
    const asset = selectInstaller(Array.isArray(release.assets) ? release.assets : []);
    document.querySelectorAll('[data-download-latest]').forEach(link => {
      link.href = asset ? asset.browser_download_url : latestRelease;
    });
    const status = document.getElementById('release-status');
    status.textContent = asset
      ? `${release.tag_name || 'Latest release'} · ${asset.name}`
      : 'Choose an installer on the latest GitHub release page';
  } catch {
    document.getElementById('release-status').textContent = 'View the latest release and installer on GitHub';
  } finally { clearTimeout(timeout); }
}
refreshDownloadLinks();

// Deterministic concept illustration, deliberately not a model or risk score.
const grid = document.getElementById('scene-grid');
const cells = Array.from({length: 256}, () => {
  const cell = document.createElement('span');
  cell.className = 'scene-cell';
  cell.setAttribute('aria-hidden', 'true');
  grid.appendChild(cell);
  return cell;
});
const time = document.getElementById('scene-time');
const intensity = document.getElementById('scene-intensity');
const patterns = {
  routine: ['Routine edits', 'A few isolated cells change while most of the scene stays quiet.'],
  burst: ['Bulk changes', 'A concentrated group of cells changes together. A large import or build can also produce this pattern.'],
  spread: ['Spreading activity', 'The affected area grows across successive time slices. Context is needed to understand the cause.']
};
let pattern = 'routine';
const palette = ['#11273e', '#16426d', '#1b64ad', '#278de4', '#77bdff', '#d5edff'];
function drawScene() {
  const slice = Number(time.value);
  const scale = Number(intensity.value) / 100;
  let active = 0;
  cells.forEach((cell, index) => {
    const x = index % 16, y = Math.floor(index / 16);
    const noise = ((index * 37 + 17) % 101) / 100;
    let strength = 0;
    if (pattern === 'routine' && (index * 13 + slice * 7) % 31 < 3) strength = .3 + noise * .55;
    if (pattern === 'burst' && x >= 3 && x <= 12 && y >= 4 && y <= 11) strength = (.4 + noise * .6) * Math.min(1, slice / 4);
    const distance = Math.abs(x - 4) + Math.abs(y - 7);
    if (pattern === 'spread' && distance <= slice * 1.65) strength = (.4 + noise * .6) * (1 - distance / 27);
    const level = strength === 0 ? 0 : Math.max(1, Math.ceil(strength * scale * 5));
    cell.style.backgroundColor = palette[level];
    if (level > 0) active++;
  });
  document.getElementById('slice-output').textContent = `${slice} / 8`;
  document.getElementById('intensity-output').textContent = `${intensity.value}%`;
  document.getElementById('active-cells').textContent = String(active).padStart(2, '0');
  document.getElementById('scene-slice').textContent = String(slice).padStart(2, '0');
  document.getElementById('pattern-title').textContent = patterns[pattern][0];
  document.getElementById('pattern-description').textContent = patterns[pattern][1];
  grid.setAttribute('aria-label', `${patterns[pattern][0]}: ${active} active cells out of 256, time slice ${slice} of 8, intensity ${intensity.value} percent. Illustrative data.`);
  document.querySelectorAll('[data-preset]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.preset === pattern)));
}
document.querySelectorAll('[data-preset]').forEach(button => button.addEventListener('click', () => { pattern = button.dataset.preset; drawScene(); }));
time.addEventListener('input', drawScene);
intensity.addEventListener('input', drawScene);
document.getElementById('reset-scene').addEventListener('click', () => { pattern = 'routine'; time.value = '4'; intensity.value = '60'; drawScene(); });
drawScene();
