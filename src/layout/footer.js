/**
 * 공통 푸터 (모든 페이지 맨 아래).
 * HTML 의 <div data-site-footer></div> 자리에 그려집니다.
 *
 * 레이아웃:  [로고]  개인정보처리방침 | 이용약관
 *                    상호 | 대표 | 사업자등록번호
 *                    주소
 *                    통신판매업 신고 | 전화 | 이메일
 *                    운영사 안내 문구 · COPYRIGHT
 *
 * 회사 정보 값  → src/config/company.js (빈 값은 숨김)
 * 약관 본문     → src/content/legal/*.html (버튼 클릭 시 팝업, components/popup.js)
 */
import { company, fullAddress, operatorNotice } from '../config/company.js';

// 전자상거래법상 표시 항목이라 사업자등록증 기준 값(operator, ceo …)을 씁니다.
// 한 배열 = 푸터 한 줄. 줄 안의 항목은 ' | ' 로 구분됩니다. 순서 · 줄 바꿈은 여기서 조절하세요.
const LINES = [
  [
    ['operator', '상호'],
    ['ceo', '대표'],
    ['businessNumber', '사업자등록번호'],
  ],
  [['address', '주소']],
  [
    ['mailOrderNumber', '통신판매업 신고'],
    ['phone', '전화'],
    ['email', '이메일'],
  ],
  [['hosting', '호스팅 서비스 제공자']],
];

// 약관 버튼. key 는 popup.js 에 등록된 팝업 이름. 개인정보처리방침을 앞에 두고 굵게 표시하는 게 관례
const LEGAL_LINKS = [
  { key: 'privacy', label: '개인정보처리방침' },
  { key: 'terms', label: '이용약관' },
];

const SEPARATOR = '<i aria-hidden="true">|</i>';

export function initFooter() {
  const slot = document.querySelector('[data-site-footer]');
  if (!slot) return;

  const values = { ...company, address: fullAddress }; // 주소는 상세 주소까지

  const infoLines = LINES.map((line) =>
    line
      .filter(([key]) => values[key])
      .map(([key, label]) => `<span><em>${label}</em> ${values[key]}</span>`)
      .join(SEPARATOR),
  )
    .filter(Boolean) // 값이 하나도 없는 줄은 통째로 생략
    .map((html) => `<p>${html}</p>`)
    .join('');

  const legal = LEGAL_LINKS.map(
    (l) => `<button type="button" data-popup="${l.key}">${l.label}</button>`,
  ).join(SEPARATOR);

  slot.outerHTML = `
    <footer class="site-footer">
      <div class="container footer-inner">
        <a href="/" class="footer-logo" aria-label="링카모빌리티 홈">
          <img src="/brand/logo-on-dark.png" alt="LINKA" width="104" height="19" />
        </a>
        <div class="footer-body">
          <nav class="footer-legal" aria-label="약관">${legal}</nav>
          <div class="footer-info">${infoLines}</div>
          ${operatorNotice ? `<p class="footer-notice">${operatorNotice}</p>` : ''}
          <p class="footer-copy">COPYRIGHT © ${new Date().getFullYear()} ${company.nameEn.toUpperCase()}. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>`;
}
