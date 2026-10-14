/**
 * 글자를 클립보드에 복사합니다. 성공하면 true.
 * 최신 방식(navigator.clipboard)이 막혀 있으면(권한 없음 · 오래된 브라우저 · 일부 인앱 브라우저)
 * 예전 방식(숨긴 입력칸 선택 → copy 명령)으로 한 번 더 시도합니다.
 */
export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
    // 팝업(dialog)이 열려 있으면 그 안에 넣어야 선택이 됨
    (document.querySelector('dialog[open]') || document.body).append(input);
    input.select();
    const ok = document.execCommand('copy');
    input.remove();
    return ok;
  }
}

/** 버튼 글자를 잠깐 바꿔서 결과 알려주기 */
export async function copyWithFeedback(button, text) {
  const original = button.textContent;
  const ok = await copyText(text);
  button.textContent = ok ? '복사됨 ✓' : '복사 실패';
  setTimeout(() => (button.textContent = original), 1500);
}
