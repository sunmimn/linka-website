/**
 * CSS 변수(styles/tokens.css)에서 색을 읽어 Three.js 색으로 바꿉니다.
 * → 색을 바꿀 땐 tokens.css 만 고치면 3D 장면 색도 같이 바뀝니다.
 */
import { Color } from 'three';

function cssVar(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

export function readThemeColors() {
  return {
    primary: new Color(cssVar('--color-primary') || '#ffffff'),
    accent: new Color(cssVar('--color-accent') || '#ffffff'),
    text: new Color(cssVar('--color-text') || '#ffffff'),
  };
}
