/**
 * "출시 예정" 섹션의 App Store / Google Play / 웹 버튼.
 * src/config/company.js 의 app 링크가 비어 있으면 '출시 예정'으로 표시하고,
 * 링크를 채우면 자동으로 해당 스토어/웹으로 연결됩니다.
 */
import { app } from '../config/company.js';

const URLS = {
  ios: app.appStoreUrl,
  android: app.playStoreUrl,
  web: app.webUrl,
};

export function initStoreButtons() {
  document.querySelectorAll('[data-store]').forEach((btn) => {
    const url = URLS[btn.dataset.store];

    if (url) {
      btn.href = url;
      btn.target = '_blank';
      btn.rel = 'noopener';
    } else {
      btn.removeAttribute('href');
      btn.classList.add('is-disabled');
      btn.setAttribute('aria-disabled', 'true');

      const soon = document.createElement('span');
      soon.className = 'store-soon';
      soon.textContent = '출시 예정';
      btn.append(soon);
    }
  });
}
