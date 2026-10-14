/**
 * 메인 페이지 섹션 공통 규칙: "데이터가 있으면 그리고, 없으면 숨긴다".
 *
 *  - 데이터 있음   → 섹션 안 [data-slot] 자리에 html 을 넣음
 *  - 데이터 없음   → 개발 화면(npm run dev): "준비 중" 안내 박스 표시 (어느 파일을 채울지 알려줌)
 *                   배포 사이트(npm run build): 섹션 전체를 숨김 → 빈 칸이 방문자에게 안 보임
 */
export function fillSection({ section, hasData, render, source }) {
  const el = document.querySelector(`[data-section="${section}"]`);
  if (!el) return;

  const slot = el.querySelector('[data-slot]');

  if (hasData) {
    slot.innerHTML = render();
    return;
  }

  if (import.meta.env.DEV) {
    slot.innerHTML = `
      <div class="placeholder">
        <strong>준비 중</strong>
        <span><code>${source}</code> 를 채우면 이 자리에 표시됩니다.</span>
        <small>이 안내는 개발 화면에서만 보이고, 배포된 사이트에서는 섹션이 숨겨집니다.</small>
      </div>`;
  } else {
    el.hidden = true;
  }
}
