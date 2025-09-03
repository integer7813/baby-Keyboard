import { useCallback, useState } from 'react';

export function useEmojiSplash() {
  const [splashItems, setSplashItems] = useState([]);
  const spawnSplash = useCallback((emoji) => {
    const id = `${Date.now()}-${Math.random()}`;
    setSplashItems(prev => [...prev, { id, emoji }]);
    setTimeout(() => {
      setSplashItems(prev => prev.filter(s => s.id !== id));
    }, 700);
  }, []);
  return { splashItems, spawnSplash };
}
