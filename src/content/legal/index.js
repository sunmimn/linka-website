/**
 * 약관 목록.
 * 키(terms, privacy)는 index.html 푸터 버튼의 data-popup 값과 같아야 합니다.
 * 약관을 새로 추가하려면: ① 여기 한 줄 추가 ② 같은 폴더에 HTML 파일 추가 ③ 푸터에 <button data-popup="키"> 추가.
 */
import terms from './terms.html?raw';
import privacy from './privacy.html?raw';

export const legalDocs = {
  terms: { title: '이용약관', body: terms },
  privacy: { title: '개인정보처리방침', body: privacy },
};
