/**
 * 공용 팝업 (약관 · 제휴 문의).
 * 페이지 어디서든 data-popup="terms" 같은 속성이 붙은 요소를 클릭하면
 * 아래 POPUPS 에 등록된 내용을 <dialog> 팝업으로 보여줍니다.
 *
 * 새 팝업 추가: 내용 파일을 만들고 → POPUPS 에 키 등록 → HTML 에 data-popup="키" 버튼 추가.
 * 닫기: X 버튼 / ESC 키 / 팝업 바깥(어두운 배경) 클릭
 */
import { legalDocs } from '../content/legal/index.js';
import { partnershipDoc } from '../content/partnership.js';
import { copyWithFeedback } from './copyText.js';

const POPUPS = {
  ...legalDocs, // terms, privacy
  partnership: partnershipDoc,
};

/** 팝업 틀을 페이지 맨 끝에 한 번 만들어 붙임 (모든 페이지 공통이라 HTML 에 따로 안 적음) */
function createDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'popup';
  dialog.setAttribute('aria-labelledby', 'popup-title');
  dialog.innerHTML = `
    <div class="popup-header">
      <h2 id="popup-title" data-popup-title></h2>
      <button type="button" class="popup-close" data-popup-close aria-label="닫기">&times;</button>
    </div>
    <div class="popup-body" data-popup-body></div>`;
  document.body.append(dialog);
  return dialog;
}

export function initPopup() {
  const dialog = createDialog();
  const titleEl = dialog.querySelector('[data-popup-title]');
  const bodyEl = dialog.querySelector('[data-popup-body]');

  function open(key) {
    const doc = POPUPS[key];
    if (!doc) return;

    titleEl.textContent = doc.title;
    // 우리가 직접 작성한 내용이라 innerHTML 사용 OK. body 가 함수면 열 때마다 새로 만듦
    bodyEl.innerHTML = typeof doc.body === 'function' ? doc.body() : doc.body;
    bodyEl.scrollTop = 0;
    dialog.showModal();
    document.body.classList.add('is-modal-open');
  }

  // 트리거 클릭 (이벤트 위임: 버튼이 늘어나도 코드 수정 불필요)
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-popup]');
    if (!trigger) return;
    e.preventDefault();
    open(trigger.dataset.popup);
  });

  // 팝업 안 "복사" 버튼: data-copy="복사할 값"
  bodyEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (btn) copyWithFeedback(btn, btn.dataset.copy);
  });

  // X 버튼
  dialog.querySelector('[data-popup-close]').addEventListener('click', () => dialog.close());

  // 바깥 배경 클릭 시 닫기 (dialog 자체가 클릭됐다 = 내용이 아닌 배경을 클릭)
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  // ESC 또는 close() 로 닫힐 때 공통 정리
  dialog.addEventListener('close', () => {
    document.body.classList.remove('is-modal-open');
  });
}
