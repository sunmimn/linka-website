/**
 * 세 개의 앱 화면(탁송기사 · 고객 · 공업사)을 HTML 로 그립니다.
 * 실제 앱 스크린샷이 아니라 "예시 화면"을 코드로 만든 것이라, 디자인 색이 바뀌면 같이 바뀝니다.
 */
import { customerSteps } from '../../content/timelineScenes.js';
import { renderCustomerCard } from './customerCards.js';

/** 탁송기사 / 공업사 앱 화면 (모양이 같아서 함수 하나로 처리) */
export function renderPartnerScreen(data) {
  const items = data.items
    ? `<ul class="pc-lines">${data.items
        .map((i) => `<li><span>${i.name}</span><b>${i.price}</b></li>`)
        .join('')}</ul>`
    : `<p class="pc-sub">${data.sub || ''}</p>`;

  return `
    <span class="pc-status">${data.status}</span>
    <div class="phone-card">
      <p class="pc-title">${data.title}</p>
      ${items}
    </div>
    <button type="button" tabindex="-1" class="phone-action ${data.pressed ? 'is-pressed' : ''}">
      ${data.button}
    </button>`;
}

/** 고객 앱 화면: 위쪽 강조 카드 + 아래 타임라인 목록 */
export function renderCustomerScreen(data) {
  const steps = customerSteps
    .map((label, i) => {
      const state = i < data.step ? 'is-done' : i === data.step ? 'is-current' : '';
      return `<li class="${state}"><span class="pt-dot"></span>${label}</li>`;
    })
    .join('');

  return `
    <div class="phone-card phone-card--highlight">${renderCustomerCard(data.card)}</div>
    <p class="pt-heading">진행 타임라인</p>
    <ol class="pt-steps">${steps}</ol>`;
}
