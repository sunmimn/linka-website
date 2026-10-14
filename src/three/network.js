/**
 * "연결(Link)" 네트워크 3D 오브젝트.
 *
 * 구성:
 *  - 가운데 큰 점 = 차바다(플랫폼)
 *  - 주변 3개 점 = 고객 앱 · 탁송기사 앱 · 공업사 앱
 *  - 선 = 이들을 잇는 연결
 *  - 선 위를 달리는 작은 빛 = 오가는 정보/요청
 *  - 바깥의 흩뿌려진 점들 = 배경 별가루
 *
 * 숫자(개수·크기·속도)를 바꾸고 싶으면 아래 SETTINGS 만 수정하세요.
 */
import {
  AdditiveBlending,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Points,
  PointsMaterial,
  QuadraticBezierCurve3,
  SphereGeometry,
  Vector3,
} from 'three';

const SETTINGS = {
  hubCount: 3, // 주변 노드 수 = 연결되는 앱 수 (고객 · 탁송기사 · 공업사)
  hubRadius: 2.6, // 가운데에서 주변 노드까지 거리
  dustCount: 900, // 배경 점 개수
  dustRadius: 9,
  pulsesPerLink: 2, // 선 하나당 달리는 빛 개수
  pulseSpeed: 0.18, // 빛 속도 (1초에 선 길이의 몇 %)
};

/** 두 점 사이를 살짝 휘어진 곡선으로 연결 */
function makeCurve(a, b) {
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.add(new Vector3(0, 0, 0.8)).multiplyScalar(1.15);
  return new QuadraticBezierCurve3(a, mid, b);
}

export function createNetwork(colors) {
  const root = new Group();
  const disposables = []; // 정리(dispose)할 geometry/material 목록

  const track = (obj) => {
    disposables.push(obj);
    return obj;
  };

  // ── 노드 ──
  const center = new Vector3(0, 0, 0);
  const hubs = [];
  for (let i = 0; i < SETTINGS.hubCount; i++) {
    const angle = (i / SETTINGS.hubCount) * Math.PI * 2 + Math.PI / 2;
    hubs.push(
      new Vector3(
        Math.cos(angle) * SETTINGS.hubRadius,
        Math.sin(angle) * SETTINGS.hubRadius,
        Math.sin(angle * 2) * 0.8, // 살짝 입체감
      ),
    );
  }

  const nodeGeo = track(new SphereGeometry(1, 24, 24));
  const centerMat = track(new MeshBasicMaterial({ color: colors.accent }));
  const hubMat = track(new MeshBasicMaterial({ color: colors.primary }));

  const centerMesh = new Mesh(nodeGeo, centerMat);
  centerMesh.scale.setScalar(0.22);
  root.add(centerMesh);

  for (const p of hubs) {
    const m = new Mesh(nodeGeo, hubMat);
    m.position.copy(p);
    m.scale.setScalar(0.12);
    root.add(m);
  }

  // ── 연결선: 가운데↔각 노드, 세 앱끼리 ──
  const curves = [];
  hubs.forEach((p, i) => {
    curves.push(makeCurve(center, p));
    curves.push(makeCurve(p, hubs[(i + 1) % hubs.length]));
  });

  const lineMat = track(
    new LineBasicMaterial({ color: colors.primary, transparent: true, opacity: 0.6 }),
  );
  for (const c of curves) {
    const g = track(new BufferGeometry().setFromPoints(c.getPoints(48)));
    root.add(new Line(g, lineMat));
  }

  // ── 선 위를 달리는 빛 ──
  const pulseMat = track(
    new MeshBasicMaterial({ color: colors.accent, transparent: true, blending: AdditiveBlending }),
  );
  const pulses = [];
  curves.forEach((curve) => {
    for (let k = 0; k < SETTINGS.pulsesPerLink; k++) {
      const mesh = new Mesh(nodeGeo, pulseMat);
      mesh.scale.setScalar(0.045);
      root.add(mesh);
      pulses.push({ mesh, curve, t: Math.random() });
    }
  });

  // ── 배경 점가루 ──
  const dustPos = [];
  for (let i = 0; i < SETTINGS.dustCount; i++) {
    const v = new Vector3().randomDirection().multiplyScalar(3 + Math.random() * SETTINGS.dustRadius);
    dustPos.push(v.x, v.y, v.z);
  }
  const dustGeo = track(new BufferGeometry());
  dustGeo.setAttribute('position', new Float32BufferAttribute(dustPos, 3));
  const dustMat = track(
    new PointsMaterial({ color: colors.text, size: 0.025, transparent: true, opacity: 0.5 }),
  );
  const dust = new Points(dustGeo, dustMat);
  root.add(dust);

  /** 매 프레임 호출: delta = 지난 프레임 이후 흐른 초 */
  function update(delta, elapsed) {
    for (const p of pulses) {
      p.t = (p.t + delta * SETTINGS.pulseSpeed) % 1;
      p.mesh.position.copy(p.curve.getPoint(p.t));
    }
    centerMesh.scale.setScalar(0.22 + Math.sin(elapsed * 2) * 0.02); // 가운데 노드 숨쉬기
    dust.rotation.y = elapsed * 0.02;
  }

  function dispose() {
    disposables.forEach((d) => d.dispose());
  }

  return { object: root, update, dispose };
}
