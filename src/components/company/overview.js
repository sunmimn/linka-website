/**
 * 메인 페이지 "회사 개요" 표.
 * 값은 src/config/company.js 에서 가져오고, 빈 값('')인 줄은 표시하지 않습니다.
 */
import { company, fullAddress } from '../../config/company.js';

// 표에 보여줄 항목과 순서. 바꾸려면 여기만 수정하세요.
// operatorLabel 은 "나인웨스트 (대표 구현서)" 처럼 아래에서 만들어 넣는 값
const ROWS = [
  ['name', '브랜드'],
  ['nameEn', '영문명'],
  ['operatorLabel', '운영사'],
  ['founded', '설립일'],
  ['businessArea', '사업 분야'],
  ['address', '주소'],
  ['email', '이메일'],
];

export function initCompanyOverview() {
  const table = document.querySelector('[data-company-overview]');
  if (!table) return;

  const values = {
    ...company,
    address: fullAddress, // 주소는 상세 주소까지
    // 브랜드와 운영사가 같으면(링카모빌리티 사업자 등록 후) 운영사 줄은 숨김
    operatorLabel:
      company.operator && company.operator !== company.name
        ? `${company.operator}${company.ceo ? ` (대표 ${company.ceo})` : ''}`
        : '',
  };
  table.innerHTML = ROWS.filter(([key]) => values[key])
    .map(([key, label]) => `<div><dt>${label}</dt><dd>${values[key]}</dd></div>`)
    .join('');
}
