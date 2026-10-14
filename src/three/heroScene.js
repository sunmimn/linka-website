/**
 * 첫 화면 3D 배경 (Three.js).
 * 이 파일은 "무대"만 담당합니다: 렌더러 · 카메라 · 화면 크기 대응 · 마우스 반응 · 애니메이션 루프.
 * 실제로 그려지는 물체는 network.js 에 있습니다.
 *
 * 성능/접근성 배려:
 *  - 첫 화면이 안 보이면(스크롤로 내려가면) 렌더링 멈춤
 *  - 사용자가 OS에서 '동작 줄이기'를 켰으면 정지 화면 1장만 그림
 *  - WebGL 을 못 쓰는 환경이면 조용히 건너뜀 (글자는 그대로 보임)
 */
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { createNetwork } from './network.js';
import { readThemeColors } from './themeColors.js';

export function initHeroScene(canvas) {
  if (!canvas) return;

  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return; // WebGL 미지원
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new Scene();
  const camera = new PerspectiveCamera(50, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  const network = createNetwork(readThemeColors());
  scene.add(network.object);

  // ── 화면 크기 대응: 넓은 화면에선 오른쪽에, 좁은 화면에선 가운데 뒤쪽에 배치 ──
  function resize() {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();

    const wide = w > 900;
    network.object.position.set(wide ? 3.2 : 0, wide ? 0 : -0.6, wide ? 0 : -5);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  // ── 마우스를 따라 살짝 기울기 ──
  const pointer = { x: 0, y: 0 };
  window.addEventListener(
    'pointermove',
    (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    },
    { passive: true },
  );

  // ── 애니메이션 루프 ──
  let lastTime = performance.now();
  let elapsed = 0; // 애니메이션이 실제로 돈 시간(초). 멈춰 있던 시간은 포함 안 됨
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function frame() {
    const now = performance.now();
    const delta = Math.min((now - lastTime) / 1000, 0.1); // 탭 전환 후 순간이동 방지
    lastTime = now;
    elapsed += delta;

    network.update(delta, elapsed);

    const obj = network.object;
    obj.rotation.z = elapsed * 0.05;
    // 목표 각도로 부드럽게 따라가기 (lerp)
    obj.rotation.x += (pointer.y * 0.3 - obj.rotation.x) * 0.05;
    obj.rotation.y += (pointer.x * 0.4 - obj.rotation.y) * 0.05;

    renderer.render(scene, camera);
  }

  if (reducedMotion) {
    frame();
    return;
  }

  // 첫 화면이 보일 때만 돌리기
  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      lastTime = performance.now(); // 멈춰 있던 시간 버리기
      renderer.setAnimationLoop(frame);
    } else {
      renderer.setAnimationLoop(null);
    }
  }).observe(canvas);
}
