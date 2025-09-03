// src/use/useAudioPools.js
import { useEffect, useRef } from 'react'

class AudioPool {
  constructor(url, size = 6) {
    this.url = url
    this.pool = []
    for (let i = 0; i < size; i++) {
      const a = new Audio(url)
      a.preload = 'auto'
      this.pool.push(a)
    }
    this.idx = 0
  }
  play() {
    const a = this.pool[this.idx]
    try { a.currentTime = 0 } catch {}
    a.play().catch(() => {/* autoplay gate */})
    this.idx = (this.idx + 1) % this.pool.length
    return a
  }
  stopAll() {
    this.pool.forEach(a => { a.pause(); a.currentTime = 0 })
  }
}

/**
 * keysAll: 사용할 키 배열(중복 제거된 A-Z)
 * fileMap: { A: 'A.mp3', B: 'B.mp3', ... } 형태
 * soundsDir: 'sounds' | 'sounds2' 등 정적 파일 폴더 (public 아래)
 */
export function useAudioPools(keysAll, fileMap, soundsDir = 'sounds') {
  const poolsRef = useRef(new Map())

  useEffect(() => {
    // 기존 풀 정리
    poolsRef.current.forEach(p => p.stopAll())
    poolsRef.current.clear()

    const base = import.meta.env.BASE_URL || '/'
    keysAll.forEach((k) => {
      const file = fileMap?.[k]
      if (!file) return
      const url = `${base}${soundsDir}/${file}`   // ⬅️ 폴더 주입
      poolsRef.current.set(k, new AudioPool(url, 6))
    })

    return () => {
      poolsRef.current.forEach(p => p.stopAll())
      poolsRef.current.clear()
    }
  }, [keysAll, fileMap, soundsDir])

  return poolsRef
}
