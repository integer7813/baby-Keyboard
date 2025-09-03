import { useEffect } from 'react';
import { toKey } from '../utils';

export function useKeyListener(onTrigger, onRelease, enabled = true) {
  useEffect(() => {
    if (!enabled) return; // 활성화 아닐 땐 리스너 안 붙임

    const down = (e) => {
      const k = toKey(e.key);
      if (k) onTrigger(k);
    };
    const up = () => onRelease?.();

    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, [onTrigger, onRelease, enabled]);
}
