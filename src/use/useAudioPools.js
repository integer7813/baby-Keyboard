import { useEffect, useRef } from 'react';
import { KEY_TO_FILE } from '../utils/constants';
import { AudioPool } from '../AudioPool';

export function useAudioPools(keysAll) {
  const poolsRef = useRef(new Map());
  useEffect(() => {
    keysAll.forEach(k => {
      const file = KEY_TO_FILE[k];
      if (!file) return;
      const url = `${import.meta.env.BASE_URL}sounds/${file}`;
      poolsRef.current.set(k, new AudioPool(url, 6));
    });
    return () => { poolsRef.current.clear(); };
  }, [keysAll]);
  return poolsRef;
}
