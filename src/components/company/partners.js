/** 파트너 · 협력사 섹션 (데이터: src/content/company/partners.js) */
import { partners } from '../../content/company/partners.js';
import { fillSection } from './fillSection.js';

/** 로고가 있으면 이미지, 없으면 회사 이름 글자 */
const mark = (p) =>
  p.logo ? `<img src="${p.logo}" alt="${p.name}" loading="lazy" />` : `<span>${p.name}</span>`;

/** url 이 있으면 링크로 감싸기 */
const item = (p) => {
  const inner = `${mark(p)}${p.type ? `<small>${p.type}</small>` : ''}`;
  return p.url
    ? `<li><a class="partner" href="${p.url}" target="_blank" rel="noopener">${inner}</a></li>`
    : `<li><div class="partner">${inner}</div></li>`;
};

export function initPartners() {
  fillSection({
    section: 'partners',
    source: 'src/content/company/partners.js',
    hasData: partners.length > 0,
    render: () => `<ul class="partner-grid">${partners.map(item).join('')}</ul>`,
  });
}
