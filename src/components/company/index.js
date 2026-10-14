/**
 * 메인(회사 소개) 페이지의 데이터 기반 섹션들을 한 번에 켭니다.
 * 섹션별 파일:  roadmap(로드맵) · history(연혁) · founder(대표 한마디) · team(팀)
 *              partners(파트너) · overview(회사 개요) · location(오시는 길)
 *
 * 참고: 지금은 index.html 에 연혁 대신 로드맵 섹션만 있습니다.
 *       HTML 에 섹션이 없으면 해당 init 은 아무것도 안 하고 넘어가므로 둘 다 켜둬도 안전합니다.
 */
import { initRoadmap } from './roadmap.js';
import { initHistory } from './history.js';
import { initFounderQuote } from './founder.js';
import { initTeam } from './team.js';
import { initPartners } from './partners.js';
import { initCompanyOverview } from './overview.js';
import { initLocation } from './location.js';

export function initCompanySections() {
  initRoadmap();
  initHistory();
  initFounderQuote();
  initTeam();
  initPartners();
  initCompanyOverview();
  initLocation();
}
