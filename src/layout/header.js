/**
 * 공통 헤더 (모든 페이지 맨 위).
 * HTML 의 <div data-site-header></div> 자리에 그려집니다. → 메뉴를 고치려면 이 파일 하나만 수정.
 *
 * 현재 페이지 메뉴 강조: 각 HTML 의 <body data-page="home|chabada"> 값과 NAV 의 page 를 비교.
 */

// 오른쪽 위 메뉴. 페이지를 추가하면 여기에 한 줄 추가하세요.
const NAV = [
  { page: 'home', label: '회사 소개', href: '/', hideOnMobile: true }, // 모바일에선 로고가 홈 역할
  { page: 'chabada', label: '차바다', href: '/chabada/' },
];

export function initHeader() {
  const slot = document.querySelector('[data-site-header]');
  if (!slot) return;

  const currentPage = document.body.dataset.page;
  const links = NAV.map(
    (item) => `
      <a href="${item.href}"
         class="${item.page === currentPage ? 'is-active' : ''} ${item.hideOnMobile ? 'hide-mobile' : ''}"
         ${item.page === currentPage ? 'aria-current="page"' : ''}>${item.label}</a>`,
  ).join('');

  // 로고: public/brand/logo-on-dark.png (어두운 바탕용 흰 글자 버전). 원본은 public/brand/logo.png
  slot.outerHTML = `
    <header class="site-header">
      <div class="container">
        <a href="/" class="logo" aria-label="링카모빌리티 홈">
          <img src="/brand/logo-on-dark.png" alt="LINKA" width="104" height="19" />
        </a>
        <div class="header-right">
          <nav class="nav" aria-label="주요 메뉴">${links}</nav>
          <button type="button" class="header-cta" data-popup="partnership">제휴 문의</button>
        </div>
      </div>
    </header>`;

  // 스크롤을 조금 내리면 헤더에 배경을 깔아 글자가 잘 보이게
  const header = document.querySelector('.site-header');
  const update = () => header.classList.toggle('is-scrolled', window.scrollY > 20);
  update();
  window.addEventListener('scroll', update, { passive: true });
}
