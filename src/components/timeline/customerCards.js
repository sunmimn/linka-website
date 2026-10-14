/**
 * 고객 앱 상단 "강조 카드" 모양들.
 * timelineScenes.js 의 customer.card.type 값에 따라 아래 함수 중 하나가 HTML 을 만듭니다.
 * 새 카드 종류가 필요하면 여기에 함수 하나 추가 → CARD_RENDERERS 에 등록.
 */

const checklist = (c) => `
  <p class="pc-title">${c.title}</p>
  <ul class="pc-checks">
    ${c.items.map((i) => `<li><span class="pc-check">✓</span>${i}</li>`).join('')}
  </ul>`;

const map = (c) => `
  <span class="pc-badge">${c.badge}</span>
  <p class="pc-title">${c.title}</p>
  <p class="pc-sub">${c.sub}</p>
  <div class="pc-map" aria-hidden="true">
    <svg viewBox="0 0 200 80" preserveAspectRatio="none">
      <path class="pc-route" d="M10 65 C 60 60, 70 20, 120 30 S 180 20, 190 15" />
    </svg>
    <span class="pc-map-car"></span>
    <span class="pc-map-home"></span>
  </div>`;

const photos = (c) => `
  <p class="pc-title">${c.title}</p>
  <p class="pc-sub">${c.sub}</p>
  <div class="pc-photos">
    <span>01</span><span>02</span><span>03</span>
  </div>`;

const estimate = (c) => `
  <p class="pc-title">${c.title}</p>
  <ul class="pc-lines">
    ${c.items.map((i) => `<li><span>${i.name}</span><b>${i.price}</b></li>`).join('')}
  </ul>`;

const progress = (c) => `
  <p class="pc-title">${c.title}</p>
  <p class="pc-sub">${c.sub}</p>
  <div class="pc-bar"><span style="width:${c.percent}%"></span></div>
  <p class="pc-sub pc-right">${c.percent}% 진행</p>`;

const done = (c) => `
  <p class="pc-title">${c.title}</p>
  <p class="pc-sub">${c.sub}</p>
  <div class="pc-options">
    ${c.options.map((o, i) => `<span class="${i === 0 ? 'is-selected' : ''}">${o}</span>`).join('')}
  </div>`;

const CARD_RENDERERS = { checklist, map, photos, estimate, progress, done };

export function renderCustomerCard(card) {
  const render = CARD_RENDERERS[card.type];
  return render ? render(card) : '';
}
