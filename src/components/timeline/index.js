/**
 * "실시간 공유 타임라인" 섹션 (index.html 의 #timeline).
 *
 * 동작 방식:
 *  - 섹션 높이를 (장면 수 × 화면 높이)로 길게 만들고, 안쪽 무대는 화면에 고정(sticky)합니다.
 *  - 스크롤 위치 → 몇 번째 장면인지 계산 → 세 앱 화면 + 설명 문구를 그 장면으로 바꿉니다.
 *  - 행동한 앱(기사/공업사) → 고객 앱으로 신호가 날아가는 애니메이션은 CSS 클래스로 처리합니다.
 *
 * 장면 내용 수정: src/content/timelineScenes.js
 * 모양 수정:     src/styles/sections/timeline.css
 */
import { scenes } from '../../content/timelineScenes.js';
import { renderCustomerScreen, renderPartnerScreen } from './phones.js';

export function initTimeline() {
  const section = document.querySelector('[data-timeline]');
  if (!section) return;

  const stage = section.querySelector('[data-timeline-stage]');
  const captionTitle = section.querySelector('[data-timeline-title]');
  const captionDesc = section.querySelector('[data-timeline-desc]');
  const screens = {
    driver: section.querySelector('[data-screen="driver"]'),
    customer: section.querySelector('[data-screen="customer"]'),
    shop: section.querySelector('[data-screen="shop"]'),
  };
  const dotsWrap = section.querySelector('[data-timeline-dots]');

  // 장면 수만큼 섹션 높이 늘리기 (CSS 에서 --scene-count 사용)
  section.style.setProperty('--scene-count', scenes.length);

  // 진행 점(●○○○) 만들기 — 클릭하면 해당 장면 위치로 스크롤
  const dots = scenes.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `${i + 1}번째 장면 보기`);
    dot.addEventListener('click', () => scrollToScene(i));
    dotsWrap.append(dot);
    return dot;
  });

  let current = -1;

  function show(index) {
    if (index === current) return;
    const scene = scenes[index];
    current = index;

    captionTitle.textContent = scene.caption.title;
    captionDesc.textContent = scene.caption.desc;
    screens.driver.innerHTML = renderPartnerScreen(scene.driver);
    screens.shop.innerHTML = renderPartnerScreen(scene.shop);
    screens.customer.innerHTML = renderCustomerScreen(scene.customer);
    dots.forEach((d, i) => d.classList.toggle('is-active', i === index));

    // 행동한 앱 표시 + 신호 애니메이션 재시작
    stage.dataset.actor = scene.actor;
    stage.classList.remove('is-sending');
    void stage.offsetWidth; // 브라우저가 클래스 제거를 반영하도록 강제 → 애니메이션 다시 재생
    if (scene.actor !== 'customer') stage.classList.add('is-sending');
  }

  /** 섹션 안에서 얼마나 스크롤했는지(0~1) → 장면 번호 */
  function update() {
    const rect = section.getBoundingClientRect();
    const scrollable = section.offsetHeight - window.innerHeight;
    const progress = Math.min(Math.max(-rect.top / scrollable, 0), 0.9999);
    show(Math.floor(progress * scenes.length));
  }

  function scrollToScene(i) {
    const scrollable = section.offsetHeight - window.innerHeight;
    const top = section.offsetTop + (scrollable * (i + 0.5)) / scenes.length;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  update();
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
}
