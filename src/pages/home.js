/**
 * 메인(회사 소개) 페이지 진입점 — index.html
 */
import './common.js';
import { initCompanySections } from '../components/company/index.js';

initCompanySections();

// Three.js 는 용량이 커서(약 130KB gzip) 따로 불러옵니다 → 글자·푸터가 먼저 뜨고 3D는 뒤이어 나타남
import('../three/heroScene.js').then(({ initHeroScene }) => {
  initHeroScene(document.querySelector('.hero-canvas'));
});
