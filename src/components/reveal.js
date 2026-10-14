/**
 * 스크롤 등장 애니메이션.
 * HTML 요소에 class="reveal" 만 붙이면, 화면에 들어올 때 부드럽게 나타납니다.
 * (실제 애니메이션 모양은 styles/base.css 의 .reveal 참고)
 */
export function initReveal() {
  const targets = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // 한 번 나타나면 끝
      }
    },
    { threshold: 0.15 },
  );

  targets.forEach((el) => observer.observe(el));
}
