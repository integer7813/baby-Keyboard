// src/variants/index.js
import * as classic from './classic'
import * as play2 from './play2'

export function pickVariant(pathname = '/') {
  const p = (pathname || '/').replace(/\/+$/, '') || '/'
  if (p === '/Play2' || p.startsWith('/Play2/')) {
    return {
      id: 'play2',
      soundMap: play2.SOUND_MAP,
      keyRows: play2.KEY_ROWS,
      soundsDir: play2.SOUNDS_DIR ?? 'sounds2',
    }
  }
  if (p === '/Play' || p.startsWith('/Play/')) {
    return {
      id: 'play',
      soundMap: classic.SOUND_MAP,
      keyRows: classic.KEY_ROWS,
      soundsDir: classic.SOUNDS_DIR ?? 'sounds',
    }
  }
  // 기본값(랜딩 등): classic로 fallback
  return {
    id: 'landing',
    soundMap: classic.SOUND_MAP,
    keyRows: classic.KEY_ROWS,
    soundsDir: classic.SOUNDS_DIR ?? 'sounds',
  }
}
