# 링카모빌리티 회사 소개 웹사이트

https://www.linkamobility.com — 서버 없는 정적 사이트 (Vite + Three.js), GitHub Pages 배포.

## 실행

```bash
npm install      # 처음 한 번
npm run dev      # 개발 서버 http://localhost:5173 (저장하면 자동 새로고침)
npm run build    # dist/ 에 배포용 파일 생성
```

배포: `main` 브랜치에 push 하면 GitHub Actions(`.github/workflows/deploy.yml`)가 자동으로 빌드·배포합니다.

## 페이지 구성

| 주소 | 파일 | 내용 |
| --- | --- | --- |
| `/` | `index.html` | **회사 소개** (메인): 3D 첫 화면 → 회사 소개 → 핵심 가치 → 로드맵 → 팀(대표 한마디 + 팀원 카드) → 파트너 → 회사 개요 → 오시는 길 |
| `/chabada/` | `chabada/index.html` | **차바다 서비스**: 첫 화면 → 실시간 공유 타임라인 → 비교 → 이용 방법 → 출시 예정 |

**빈 섹션 규칙**: 메인의 로드맵 · 연혁 · 팀 · 파트너 · 오시는 길은 데이터가 비어 있으면
개발 화면(`npm run dev`)에선 "준비 중" 안내 박스가, 배포 사이트에선 섹션 자체가 숨겨집니다. (`src/components/company/fillSection.js`)

헤더(메뉴) · 푸터 · 팝업은 두 페이지가 같이 씁니다 → `src/layout/`, `src/components/popup.js` 한 곳만 고치면 됩니다.

## "이거 고치려면 어디?" 빠른 안내

| 고치고 싶은 것 | 파일 |
| --- | --- |
| 사업자 정보 (상호 · 대표 · 사업자등록번호 · 통신판매업 신고번호 · 주소 · 연락처) | `src/config/company.js` — **사업자등록증과 똑같이**. 브랜드(`name`)와 운영사(`operator`)를 구분 |
| 앱스토어 / 구글플레이 / 웹 버전 링크 (비면 '출시 예정') | `src/config/company.js` (`app`) |
| 이용약관 / 개인정보처리방침 본문 | `src/content/legal/terms.html`, `privacy.html` |
| 제휴 문의 연락처 (이메일 · 전화 · 메일 양식) | `src/config/company.js` 의 `partnership` |
| 제휴 문의 팝업 안내 문구 · 버튼 구성 | `src/content/partnership.js` |
| 위쪽 메뉴 항목 | `src/layout/header.js` 의 `NAV` |
| 푸터 항목 순서 · 약관 버튼 | `src/layout/footer.js` 의 `LINES`, `LEGAL_LINKS` |
| 대표 한마디 (팀 소개 위 인용문) | `src/content/company/founder.js` |
| 로드맵 (앞으로의 목표) | `src/content/company/roadmap.js` |
| 연혁 (지금은 숨김 · 로드맵으로 대체) | `src/content/company/history.js` |
| 팀 소개 (이름 · 역할 · 학과 · 이력) | `src/content/company/team.js`, 제목 문구는 `index.html` 의 `#team` |
| 파트너 · 협력사 | `src/content/company/partners.js` (로고: `public/images/partners/`) |
| 오시는 길 (주소 · 찾아오는 방법) | `src/config/company.js` 의 `address`, `addressDetail`, `directions` |
| 회사 소개 · 핵심 가치 문구 | `index.html` |
| 차바다 소개 문구 | `chabada/index.html` |
| 차바다 타임라인 장면 (문구 · 단계 · 예시 견적) | `src/content/timelineScenes.js` |
| 사이트 전체 색 · 글꼴 (3D 색 포함) | `src/styles/tokens.css` — 브랜드 파랑 `#0B4FE6` · 빨강 `#E63A46` (로고에서 추출) |
| 3D 장면 모양 (노드 개수, 속도 등) | `src/three/network.js` 상단 `SETTINGS` |
| 로고 · 파비콘 · 공유 이미지 | `public/brand/` (logo.png 원본, logo-on-dark.png 흰 글자, og-image.png), `public/favicon.png`, `public/apple-touch-icon.png` — 헤더 · 푸터에서 쓰는 곳은 `src/layout/` |

## 폴더 구조

```
index.html                 메인(회사 소개) 페이지
chabada/index.html         차바다 서비스 페이지
public/                    빌드 시 그대로 복사되는 파일
  brand/                   로고(원본 · 어두운 바탕용) · 공유 미리보기 이미지 · 앱 아이콘
  favicon.png, apple-touch-icon.png
  images/                  파트너 로고 (partners/)
  CNAME                    커스텀 도메인 (www.linkamobility.com) — 지우지 마세요
src/
  pages/                   페이지별 진입점 (HTML 의 <script> 가 불러옴)
    common.js              모든 페이지 공통: 스타일 · 헤더 · 푸터 · 팝업 · 스크롤 효과
    home.js                메인: 회사 섹션들 + 3D
    chabada.js             차바다: 타임라인 + 출시 예정 버튼
  layout/
    header.js              공통 헤더 (메뉴 · 제휴 문의 버튼 · 현재 페이지 강조)
    footer.js              공통 푸터 (company.js 값 · 약관 버튼)
  config/company.js        회사 정보 · 앱/웹 링크
  content/
    company/               메인 페이지 섹션 데이터 (roadmap · history · founder · team · partners)
    legal/                 약관 본문(HTML) + 목록(index.js)
    partnership.js         제휴 문의 팝업 내용
    timelineScenes.js      차바다 타임라인 장면 데이터
  components/
    popup.js               data-popup="..." 클릭 → 팝업 (약관 · 제휴 문의)
    reveal.js              class="reveal" 요소 스크롤 등장 효과
    company/               메인 페이지 데이터 섹션들
      index.js             아래 섹션들을 한 번에 켬
      fillSection.js       "데이터 있으면 그리고, 없으면 숨김" 공통 규칙
      roadmap.js · history.js · founder.js · team.js · partners.js · overview.js · location.js
    storeButtons.js        차바다 '출시 예정' 버튼 링크 연결
    timeline/              차바다 핵심 기능: 스크롤하면 세 앱이 연결되는 장면 재생
      index.js             스크롤 위치 → 장면 번호 계산, 화면 교체, 신호 애니메이션
      phones.js            기사 · 고객 · 공업사 앱 화면 그리기
      customerCards.js     고객 앱 상단 카드 종류별 모양 (지도, 사진, 견적 …)
  three/                   메인 첫 화면 3D
    heroScene.js           무대: 렌더러·카메라·리사이즈·마우스·루프
    network.js             물체: 연결 네트워크 (노드·선·빛)
    themeColors.js         tokens.css 의 색을 3D 에서 쓰도록 변환
  styles/
    index.css              스타일 진입점 (@import 목록)
    tokens.css             색·글꼴·간격 변수
    base.css               리셋 + 공통(.container, .btn, .reveal …)
    sections/*.css         섹션별 스타일 (company.css = 메인 섹션, timeline.css = 차바다 타임라인, popup.css = 팝업)
```

## 자주 하는 작업

- **링카모빌리티 명의로 사업자를 새로 냈을 때**: `src/config/company.js` 에서 `operator` 를 `name` 과 같게, `ceo` · 사업자번호 · 통신판매업 번호 · 주소를 새 등록증대로 교체 → 푸터 "운영사 안내 문구"와 회사 개요 "운영사" 줄은 자동으로 사라짐. 약관 · 개인정보처리방침의 회사명도 바꾸고 개정일 표시.

- **약관 추가** (예: 위치기반서비스 이용약관): `src/content/legal/location.html` 생성 → `src/content/legal/index.js` 에 한 줄 → `src/layout/footer.js` 의 `LEGAL_LINKS` 에 한 줄.
- **새 페이지 추가** (예: `/careers/`): `careers/index.html` 생성(차바다 페이지 복사) → `src/pages/careers.js` 생성 → `vite.config.js` 의 `input` 에 한 줄 → `src/layout/header.js` 의 `NAV` 에 한 줄.
- **타임라인 장면 추가/수정**: `src/content/timelineScenes.js` 의 `scenes` 배열만 고치면 진행 점·스크롤 길이까지 자동으로 맞춰집니다.
- **새 섹션 추가**: HTML 에 `<section>` 추가 → `src/styles/sections/` 에 CSS 생성 → `src/styles/index.css` 에 `@import` 한 줄.
- **로드맵 → 연혁으로 전환** (실적이 쌓이면): `src/content/company/history.js` 채우기 → `index.html` 에서 `5. 로드맵` 섹션 삭제 → 바로 아래 `(보관) 연혁` 블록의 첫 줄 · 마지막 줄(주석 열고 닫는 줄)만 삭제.
- **스크롤 등장 효과**: 아무 요소에 `class="reveal"` 추가.

## 결정되면 바꿀 곳 (변경 가이드)

수정 → `main` 에 push(또는 GitHub 웹에서 파일 수정 후 Commit) → 1~2분 뒤 www.linkamobility.com 에 자동 반영.
약관 · 처리방침에서 추천값으로 채워둔 곳은 HTML 주석 `[임시값]` 으로 표시 → `grep -n "임시값" src/content/legal/*.html`

### 대표님 결정 사항
| 결정되면 | 바꿀 파일 | 바꿀 곳 |
| --- | --- | --- |
| 가입 가능 나이 (현재 만 19세) | `src/content/legal/terms.html` | 제5조 2항 |
| 취소 수수료 기준 (현재 출발 전 무료 / 출발 후 탁송비) | `src/content/legal/terms.html` | 제12조 2항 |
| 포인트 유효기간 · 환급 (현재 1년 · 환급 불가) | `src/content/legal/terms.html` | 제13조 2 · 3항 |
| 제휴사 정보 보관 기간 (현재 6개월) | `src/content/legal/privacy.html` | 5. 제3자 제공 표의 "보유 기간" 칸 |
| 개인정보 보호담당자 지정 | `src/content/legal/privacy.html` | 12. 보호책임자 목록에 `<li>` 한 줄 추가 (주석 위치) |
| 푸터 이메일 변경 (현재 hskoo@) | `src/config/company.js` | `email` |
| 제휴 문의 연락처 변경 | `src/config/company.js` | `partnership` |

### 현서님 확인 사항
| 결정되면 | 바꿀 파일 | 바꿀 곳 |
| --- | --- | --- |
| 분석 도구 이름 (현재 Firebase Analytics) | `src/content/legal/privacy.html` | 6. 처리 위탁 표 · 7. 국외 이전 |
| 맞춤형 광고를 하는 경우 | `src/content/legal/privacy.html` | 2. 수집 항목에 "행태정보" 추가 · 11. 거부 방법 보강 |
| KCB CI/DI 를 저장하지 않는 경우 | `src/content/legal/privacy.html` | 2. 수집 항목 "회원 가입 · 본인인증" 줄에서 CI · DI 삭제 |
| 문자 · 알림톡 업체를 쓰게 되는 경우 | `src/content/legal/privacy.html` | 6. 처리 위탁 표에 업체 추가 |
| 네이버 eKYC 도입 시 | `src/content/legal/privacy.html` | 6. 처리 위탁 표에 "네이버클라우드 — 운전면허 진위 확인" 추가 |

### 일정 · 사업 상황에 따라
| 상황 | 바꿀 파일 | 할 일 |
| --- | --- | --- |
| 출시일 확정 | `terms.html` · `privacy.html` | 상단 "시행일"과 terms 부칙 · privacy 14항의 "서비스 정식 출시일"을 날짜로 |
| 앱 출시 (스토어 링크 생김) | `src/config/company.js` | `app.appStoreUrl` · `playStoreUrl` · `webUrl` 입력 → '출시 예정' 자동 해제 |
| 위치기반서비스사업 신고 (출시 후 1개월 내) | `src/content/legal/` · `src/layout/footer.js` | `location.html` 새로 작성 → `legal/index.js` 등록 → 푸터 `LEGAL_LINKS` 에 추가 |
| 직속 차량 직접 대여 시작 (자동차대여사업 등록 후) | `src/content/legal/terms.html` | 제9조 주석 위치에 "회사 직접 대여 시 책임 · 보험 · 대여 조건" 항 추가 |
| 보험사 제휴 체결 | `src/content/legal/privacy.html` | 5. 제3자 제공 표에 보험사 추가 → **7일 전 공지 · 회원 동의 후** 정보 전달 시작 |
| MOU 체결 공개 (공업사 · 렌터카) | `src/content/company/partners.js` | 회사명 · 분류 · 로고 입력 → 파트너 섹션 자동 표시 |
| 링카모빌리티 명의 사업자 등록 | `src/config/company.js` · 약관 2종 | `operator` 를 `name` 과 같게 + 사업자 정보 교체, 약관 회사명 · 보호책임자 변경, 통신판매업 신고 새로 |
| 회사 설립일 넣기 | `src/config/company.js` | `founded` |
| 실적이 쌓여 연혁으로 전환 | `history.js` · `index.html` | 아래 "자주 하는 작업"의 로드맵 → 연혁 전환 참고 |
| 호스팅 이전 (GitHub 외) | `src/config/company.js` | `hosting` |
| 출시 직전 | 약관 2종 | 법률 검토 반영 |

> 출시 후(회원이 생긴 뒤)에는 약관 변경 시 7일 전(불리한 변경은 30일 전) 공지 의무가 있습니다.

## 도메인 (가비아 DNS)

| 타입 | 호스트 | 값 |
| --- | --- | --- |
| CNAME | www | `sunmimn.github.io.` |
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

`linkamobility.com`(www 없이)으로 들어와도 GitHub가 `www` 로 자동 이동시킵니다.
