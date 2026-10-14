/** 연혁 섹션 (데이터: src/content/company/history.js) — 같은 연도끼리 묶어서 표시 */
import { history } from '../../content/company/history.js';
import { fillSection } from './fillSection.js';

/** [{date:'2026.09',...}, ...] → { '2026': [...], ... } (적힌 순서 유지) */
function groupByYear(items) {
  const groups = new Map();
  for (const item of items) {
    const year = item.date.slice(0, 4);
    if (!groups.has(year)) groups.set(year, []);
    groups.get(year).push(item);
  }
  return groups;
}

export function initHistory() {
  fillSection({
    section: 'history',
    source: 'src/content/company/history.js',
    hasData: history.length > 0,
    render: () =>
      [...groupByYear(history)]
        .map(
          ([year, items]) => `
          <div class="history-year">
            <p class="history-year-label">${year}</p>
            <ul class="history-list">
              ${items
                .map(
                  (i) => `
                <li>
                  <span class="history-month">${i.date.slice(5)}</span>
                  <div>
                    <p class="history-title">${i.title}</p>
                    ${i.desc ? `<p class="history-desc">${i.desc}</p>` : ''}
                  </div>
                </li>`,
                )
                .join('')}
            </ul>
          </div>`,
        )
        .join(''),
  });
}
