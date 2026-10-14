/** 팀 소개 섹션 (데이터: src/content/company/team.js) */
import { school, team } from '../../content/company/team.js';
import { fillSection } from './fillSection.js';

const card = (m) => `
  <li class="team-card">
    <p class="team-name">${m.name}</p>
    <p class="team-role">${m.role}</p>
    ${m.major ? `<p class="team-major">${school} ${m.major}</p>` : ''}
    ${
      m.highlights?.length
        ? `<ul class="team-highlights">${m.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>`
        : ''
    }
  </li>`;

export function initTeam() {
  fillSection({
    section: 'team',
    source: 'src/content/company/team.js',
    hasData: team.length > 0,
    render: () => `<ul class="team-grid">${team.map(card).join('')}</ul>`,
  });
}
