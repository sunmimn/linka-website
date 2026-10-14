import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  // 커스텀 도메인(www.linkamobility.com) 루트에서 서비스하므로 base 는 '/'
  base: '/',
  build: {
    chunkSizeWarningLimit: 700, // three.js 청크가 커서 경고 기준 상향
    // 페이지 목록. 새 페이지(예: /careers/)를 만들면 여기에 한 줄 추가하세요.
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        chabada: resolve(import.meta.dirname, 'chabada/index.html'),
      },
    },
  },
});
