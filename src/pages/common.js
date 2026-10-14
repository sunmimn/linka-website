/**
 * 모든 페이지가 공통으로 쓰는 것: 스타일 · 헤더 · 푸터 · 팝업 · 스크롤 등장 효과.
 * 각 페이지 진입 파일(home.js, chabada.js)이 맨 위에서 이 파일을 불러옵니다.
 */
import '../styles/index.css';

import { initHeader } from '../layout/header.js';
import { initFooter } from '../layout/footer.js';
import { initPopup } from '../components/popup.js';
import { initReveal } from '../components/reveal.js';

initHeader();
initFooter();
initPopup();

// 페이지별 내용이 그려진 뒤에 실행되도록 다음 틱으로 미룸
queueMicrotask(initReveal);
