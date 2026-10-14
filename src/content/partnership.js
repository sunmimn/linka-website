/**
 * "제휴 문의" 팝업 내용 (헤더 오른쪽 위 버튼 · 메인 첫 화면 버튼).
 * 연락처 값은 src/config/company.js 의 partnership 에서 가져옵니다. 비어 있으면 '준비 중'으로 표시.
 *
 * 항목마다 [바로가기 버튼(메일 보내기/전화하기)] + [복사 버튼] 이 붙습니다.
 * 복사 버튼 동작은 components/popup.js 의 data-copy 처리 참고.
 */
import { partnership } from '../config/company.js';

const intro = `
  <p>차바다와 함께할 공업사, 탁송 파트너, 보험사 및 모빌리티 기업의 제휴 문의를 기다립니다.</p>
  <p>아래 연락처로 회사명 · 담당자 · 제휴 내용을 보내주시면 확인 후 연락드리겠습니다.</p>`;

function mailtoHref() {
  const params = new URLSearchParams({ subject: partnership.mailSubject, body: partnership.mailBody });
  // URLSearchParams 는 공백을 '+' 로 바꾸는데, 메일 앱은 '%20' 만 공백으로 인식함
  return `mailto:${partnership.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** 연락 수단 한 줄: 라벨 · 값 · [바로가기] [복사] */
function row({ label, value, action, href }) {
  return `
    <li class="contact-row">
      <div class="contact-info">
        <span class="contact-label">${label}</span>
        <span class="contact-value">${value}</span>
      </div>
      <div class="contact-actions">
        <a class="btn btn--small btn--primary" href="${href}">${action}</a>
        <button type="button" class="btn btn--small" data-copy="${value}">복사</button>
      </div>
    </li>`;
}

function contactList() {
  const rows = [];
  if (partnership.email) {
    rows.push(row({ label: '이메일', value: partnership.email, action: '메일 보내기', href: mailtoHref() }));
  }
  if (partnership.phone) {
    rows.push(
      row({
        label: '연락처',
        value: partnership.phone,
        action: '전화하기',
        href: `tel:${partnership.phone.replace(/-/g, '')}`,
      }),
    );
  }

  if (rows.length === 0) {
    return '<p class="popup-empty">제휴 문의 연락처를 준비 중입니다.</p>';
  }
  return `<ul class="contact-list">${rows.join('')}</ul>`;
}

export const partnershipDoc = {
  title: '제휴 문의',
  // 함수로 둔 이유: 팝업을 열 때마다 최신 값으로 새로 그리기 위해 (복사됨 표시 초기화 등)
  body: () => intro + contactList(),
};
