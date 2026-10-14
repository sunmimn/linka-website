/** 로드맵 섹션 (데이터: src/content/company/roadmap.js) — 단계별 카드를 가로로 이어서 표시 */
import { roadmap, roadmapStatusLabel } from '../../content/company/roadmap.js';
import { fillSection } from './fillSection.js';

const stage = (s) => `
  <li class="roadmap-stage is-${s.status}">
    <span class="roadmap-dot" aria-hidden="true"></span>
    <p class="roadmap-period">${s.period}</p>
    <span class="roadmap-status">${roadmapStatusLabel[s.status] ?? ''}</span>
    <h3 class="roadmap-title">${s.title}</h3>
    <ul class="roadmap-items">${s.items.map((i) => `<li>${i}</li>`).join('')}</ul>
  </li>`;

export function initRoadmap() {
  fillSection({
    section: 'roadmap',
    source: 'src/content/company/roadmap.js',
    hasData: roadmap.length > 0,
    render: () => `<ol class="roadmap">${roadmap.map(stage).join('')}</ol>`,
  });
}
