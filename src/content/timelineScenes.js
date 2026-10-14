/**
 * ─────────────────────────────────────────────────────────────
 *  "실시간 공유 타임라인" 섹션의 장면 데이터
 * ─────────────────────────────────────────────────────────────
 *  스크롤을 내리면 아래 scenes 가 순서대로 재생됩니다.
 *  장면을 추가/삭제/수정하려면 이 파일만 고치면 됩니다. (화면 그리는 코드: components/timeline/)
 *
 *  장면 하나의 구조:
 *    actor    누가 행동했나: 'customer' | 'driver' | 'shop'
 *             → driver/shop 이면 그 앱에서 고객 앱으로 신호가 날아가는 애니메이션이 나옴
 *    caption  화면 위 설명 문구 { title, desc }
 *    driver   탁송기사 앱 화면 { status, title, sub, button, pressed }
 *    shop     공업사 앱 화면   { status, title, sub, items?, button, pressed }
 *    customer 고객 앱 화면     { step: 진행 중인 타임라인 단계 번호(0부터), card: 위쪽 강조 카드 }
 *
 *  customer.card.type 종류: 'checklist' | 'map' | 'photos' | 'estimate' | 'progress' | 'done'
 *  (모양은 components/timeline/customerCards.js 참고)
 */

/** 고객 앱 타임라인 단계 (화면 아래 목록) */
export const customerSteps = [
  '접수 완료',
  '기사 출발 · 대차 딜리버리',
  '인계 전 차량 점검',
  '공업사 입고 · 견적 확정',
  '정밀 수리 진행',
  '수리 완료 · 차량 인도',
];

/** 예시 견적 (공업사 앱 → 고객 앱에 같은 내용이 뜸) */
const estimateItems = [
  { name: '프론트 범퍼 교체', price: '480,000원' },
  { name: '조수석 펜더 판금 · 도색', price: '320,000원' },
  { name: '휠 얼라인먼트', price: '60,000원' },
];

export const scenes = [
  {
    actor: 'customer',
    caption: {
      title: '접수는 앱에서 한 번에',
      desc: '사고차량 접수, 보험 확인, 운전면허 확인을 마치면 고객 전용 타임라인이 열립니다.',
    },
    driver: { status: '배차 대기', title: '새 배차 요청', sub: '서울 강남구 → 하남 공업사', button: '배차 수락' },
    shop: { status: '입고 예정', title: '입고 예정 1건', sub: '내일 10:00 입고', button: '확인' },
    customer: {
      step: 0,
      card: { type: 'checklist', title: '접수가 완료되었어요', items: ['사고차량 접수', '보험 확인', '운전면허 확인'] },
    },
  },
  {
    actor: 'driver',
    caption: {
      title: '기사님이 출발을 누르면',
      desc: '고객 앱에 도착 예정 시간과 기사님의 실시간 위치가 바로 표시됩니다. 언제 오시는지 전화로 물어볼 필요가 없습니다.',
    },
    driver: { status: '운행 중', title: '고객에게 출발', sub: '대차 차량 딜리버리', button: '출발하기', pressed: true },
    shop: { status: '입고 예정', title: '입고 예정 1건', sub: '내일 10:00 입고', button: '확인' },
    customer: {
      step: 1,
      card: { type: 'map', badge: '실시간', title: '기사님 도착 18분 전', sub: '대차 차량과 함께 이동 중' },
    },
  },
  {
    actor: 'driver',
    caption: {
      title: '인계 전 차량 사진도 그대로',
      desc: '기사님이 차량을 인계받으며 찍은 사진이 고객 타임라인에 기록됩니다.',
    },
    driver: { status: '인계 중', title: '차량 사진 촬영', sub: '3 / 3장 등록 완료', button: '사진 등록', pressed: true },
    shop: { status: '입고 예정', title: '차량 이동 중', sub: '도착 예정 40분', button: '확인' },
    customer: {
      step: 2,
      card: { type: 'photos', title: '인계 전 차량 점검 사진', sub: '기사님이 직접 촬영했어요' },
    },
  },
  {
    actor: 'shop',
    caption: {
      title: '공업사가 견적을 적으면',
      desc: '수리할 부위와 가격이 고객 타임라인에 그대로 뜹니다. 견적을 듣기 위해 전화를 기다리지 않아도 됩니다.',
    },
    driver: { status: '완료', title: '공업사 입고 완료', sub: '운행 종료', button: '완료됨' },
    shop: {
      status: '견적 작성',
      title: '수리 견적 입력',
      items: estimateItems,
      button: '고객에게 전송',
      pressed: true,
    },
    customer: {
      step: 3,
      card: { type: 'estimate', title: '수리 견적이 도착했어요', items: estimateItems },
    },
  },
  {
    actor: 'shop',
    caption: {
      title: '수리 과정도 실시간으로',
      desc: '공업사가 작업 사진과 진행 상황을 올리면, 고객은 내 차가 어디까지 고쳐졌는지 바로 확인합니다.',
    },
    driver: { status: '대기', title: '다음 배차 대기', sub: '', button: '대기 중' },
    shop: { status: '수리 중', title: '작업 현황 업데이트', sub: '판금 · 도색 작업 사진 2장', button: '업데이트 전송', pressed: true },
    customer: {
      step: 4,
      card: { type: 'progress', title: '정밀 수리 진행 중', sub: '판금 · 도색 작업 중', percent: 65 },
    },
  },
  {
    actor: 'shop',
    caption: {
      title: '수리가 끝나면 바로 알림',
      desc: '수리 완료와 함께 원하는 인도 방법을 앱에서 고르면, 다시 탁송기사에게 연결됩니다.',
    },
    driver: { status: '배차 대기', title: '새 배차 요청', sub: '하남 공업사 → 고객', button: '배차 수락' },
    shop: { status: '출고 대기', title: '수리 완료 처리', sub: '출고 준비 완료', button: '수리 완료', pressed: true },
    customer: {
      step: 5,
      card: { type: 'done', title: '수리가 완료되었어요', sub: '인도 방법을 선택해 주세요', options: ['탁송으로 받기', '공업사 방문'] },
    },
  },
];
