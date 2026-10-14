/**
 * 오시는 길 섹션 (데이터: src/config/company.js 의 address · addressDetail · directions · phone · email)
 *
 * 지도는 API 없이 "지도 앱에서 열기" 링크로 처리합니다 → 비용 · 키 · 정책 걱정 없음.
 * 주소(address)만 넣으면 카카오맵 / 네이버지도 검색 링크가 자동으로 만들어집니다.
 */
import { company, fullAddress } from '../../config/company.js';
import { fillSection } from './fillSection.js';
import { copyWithFeedback } from '../copyText.js';

const mapLinks = (address) => {
  const q = encodeURIComponent(address);
  return [
    { label: '카카오맵에서 보기', href: `https://map.kakao.com/link/search/${q}` },
    { label: '네이버지도에서 보기', href: `https://map.naver.com/p/search/${q}` },
  ];
};

export function initLocation() {
  fillSection({
    section: 'location',
    source: 'src/config/company.js 의 address',
    hasData: Boolean(company.address),
    render: () => {
      const contacts = [
        ['전화', company.phone && `<a href="tel:${company.phone}">${company.phone}</a>`],
        ['이메일', company.email && `<a href="mailto:${company.email}">${company.email}</a>`],
      ].filter(([, v]) => v);

      return `
        <p class="location-address">${fullAddress}</p>

        ${
          company.directions.length
            ? `<ul class="location-directions">${company.directions.map((d) => `<li>${d}</li>`).join('')}</ul>`
            : ''
        }

        ${
          contacts.length
            ? `<dl class="location-contact">${contacts.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>`
            : ''
        }

        <div class="location-actions">
          ${mapLinks(company.address)
            .map((l) => `<a class="btn" href="${l.href}" target="_blank" rel="noopener">${l.label}</a>`)
            .join('')}
          <button type="button" class="btn" data-copy-address>주소 복사</button>
        </div>`;
    },
  });

  // 주소 복사 버튼
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy-address]');
    if (btn) copyWithFeedback(btn, fullAddress);
  });
}
