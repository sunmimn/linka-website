/**
 * 대표 한마디 (데이터: src/content/company/founder.js)
 * 팀 섹션 안의 <figure data-founder-quote> 자리에 인용문을 그립니다.
 * 섹션 전체가 아니라 한 덩어리라서, 비어 있으면 그 덩어리만 지웁니다.
 */
import { founder } from '../../content/company/founder.js';

export function initFounderQuote() {
  const el = document.querySelector('[data-founder-quote]');
  if (!el) return;

  if (!founder.quote) {
    el.remove();
    return;
  }

  el.innerHTML = `
    <blockquote>${founder.quote}</blockquote>
    <figcaption>— ${founder.name}, ${founder.title}</figcaption>`;
}
