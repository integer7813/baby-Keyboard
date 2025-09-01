import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Container, Grid, Card, CardActionArea, CardContent, Typography, Stack, Box, Link,
  AppBar, Toolbar, Switch, FormControlLabel, LinearProgress, IconButton
} from '@mui/material'
import { keyframes } from '@mui/system'
import StopIcon from '@mui/icons-material/Stop'

// ------------------------------
// ASMR/BABY Keyboard (assets-only) + Now-Playing + Emoji Splash
// ------------------------------

const KEY_ROWS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['Z','X','C','V','B','N','M'],
]

const SOUND_MAP = {
  A: { title: 'Apple Bite', file: 'A.mp3', emoji: '🍎', desc: 'Crunchy apple bite!' },
  B: { title: 'Box',        file: 'B.mp3', emoji: '📦', desc: 'Cardboard box thud' },
  C: { title: 'Clap',       file: 'C.mp3', emoji: '👏', desc: 'Quick hand clap!' },
  D: { title: 'Dog',        file: 'D.mp3', emoji: '🐶', desc: 'Cute dog bark!' },
  E: { title: 'Elephant',   file: 'E.mp3', emoji: '🐘', desc: 'Short elephant trumpet!' },
  F: { title: 'Fart',       file: 'F.mp3', emoji: '💨', desc: 'Silly toot!' },
  P: { title: 'Pop',        file: 'P.mp3', emoji: '🫧', desc: 'Punchy pop "bang!"' },
  V: { title: 'Violin',     file: 'V.mp3', emoji: '🎻', desc: 'Quick violin note!' },
  M: { title: 'Meow',       file: 'M.mp3', emoji: '😸', desc: 'Lovely cat meow!' },
  R: { title: 'Rooster',    file: 'R.mp3', emoji: '🐓', desc: 'Short rooster crow!' },
  O: { title: 'Owl',        file: 'O.mp3', emoji: '🦉', desc: 'Night owl hoot!' },
  T: { title: 'Telephone',  file: 'T.mp3', emoji: '☎️', desc: 'Ring-ring, hello?' },
  G: { title: 'Guitar',     file: 'G.mp3', emoji: '🎸', desc: 'Rock star strum!' },
  H: { title: 'Horse',      file: 'H.mp3', emoji: '🐎', desc: 'Neigh! Giddy up!' },
  W: { title: 'Whistling',  file: 'W.mp3', emoji: '😗', desc: 'Happy whistle ♪' },
  N: { title: 'Nose Blow',  file: 'N.mp3', emoji: '🤧', desc: 'Short nose blow!' },
  Q: { title: 'Quartz Clock', file: 'Q.mp3', emoji: '🕓', desc: 'Tick-tock clock!' },
  I: { title: 'Ice',        file: 'I.mp3', emoji: '🧊', desc: 'Brrr, so cold!' },
  U: { title: 'UFO',        file: 'U.mp3', emoji: '🛸', desc: 'Sci-fi whoosh!' },
  Y: { title: 'Yawn',       file: 'Y.mp3', emoji: '🥱', desc: 'Sleepy yawn~' },
  X: { title: 'Xylophone',  file: 'X.mp3', emoji: '🎶', desc: 'Sparkly ding!' },
  L: { title: 'Lamb',       file: 'L.mp3', emoji: '🐑', desc: 'Cute lamb "baa"!' },
  K: { title: 'Kettle',     file: 'K.mp3', emoji: '🫖', desc: 'Pouring hot water' },
  Z: { title: 'Zipper',     file: 'Z.mp3', emoji: '🧥', desc: 'Quick zip!' },
  S: { title: 'Splash',     file: 'S.mp3', emoji: '💦', desc: 'Water splash!' },
  J: { title: 'Jump',       file: 'J.mp3', emoji: '🦘', desc: 'Boing! Kangaroo hop!' },
}

// 파일 매핑: SOUND_MAP에 있으면 그 파일, 없으면 기본 규칙(K.mp3)
const KEY_TO_FILE = Object.fromEntries(
  'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k => [k, SOUND_MAP[k]?.file ?? `${k}.mp3`])
)

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
    return a // 현재 사용한 인스턴스 반환
  }
  stopAll() {
    this.pool.forEach(a => { a.pause(); a.currentTime = 0 })
  }
}

export default function App() {
  const [showSecondRow, setShowSecondRow] = useState(true)
  const [pressed, setPressed] = useState(null)
  const [current, setCurrent] = useState(null) // { key, title, file, emoji, desc }
  const [progress, setProgress] = useState(0)

  const poolsRef = useRef(new Map())
  const currentAudioRef = useRef(null)
  const detachHandlersRef = useRef(() => {})

  const keysAll = useMemo(() => Array.from(new Set(KEY_ROWS.flat())), [])

  // ==== Emoji Splash (state + animation) ====
  const pop = keyframes`
    0%   { transform: scale(0.6) translateY(10px); opacity: 0; }
    40%  { transform: scale(1.15) translateY(0);   opacity: 1; }
    100% { transform: scale(1.0)  translateY(-8px);opacity: 0; }
  `
  const [splashItems, setSplashItems] = useState([]) // {id, emoji}
  const spawnSplash = (emoji) => {
    const id = `${Date.now()}-${Math.random()}`
    setSplashItems((prev) => [...prev, { id, emoji }])
    setTimeout(() => {
      setSplashItems((prev) => prev.filter((s) => s.id !== id))
    }, 700)
  }

  useEffect(() => {
    // 각 키의 오디오 풀 생성
    keysAll.forEach((k) => {
      const file = KEY_TO_FILE[k]
      if (!file) return
      const url = `${import.meta.env.BASE_URL}sounds/${file}`
      poolsRef.current.set(k, new AudioPool(url, 6))
    })
    return () => { poolsRef.current.clear() }
  }, [keysAll])

  useEffect(() => {
    const down = (e) => { const k = toKey(e.key); if (!k) return; trigger(k) }
    const up = () => setPressed(null)
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  const toKey = (raw) => {
    if (!raw) return null
    const upper = raw.length === 1 ? raw.toUpperCase() : raw
    return /^[A-Z]$/.test(upper) ? upper : null
  }

  const stopAll = () => {
    // 모든 풀 정지 + 진행중 카드/리스너 정리
    poolsRef.current.forEach(pool => pool.stopAll())
    detachAudioHandlers()
    currentAudioRef.current = null
    setCurrent(null)
    setProgress(0)
  }

  const attachAudioHandlers = (audio) => {
    const onTime = () => {
      if (audio.duration && !Number.isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const onEnd = () => {
      setProgress(100)
      setTimeout(() => { setCurrent(null); setProgress(0); setPressed(null); }, 120)
    }
    const onError = () => { setCurrent(null); setProgress(0) }
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('ended', onEnd)
    audio.addEventListener('error', onError)
    detachHandlersRef.current = () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('ended', onEnd)
      audio.removeEventListener('error', onError)
    }
  }

  const detachAudioHandlers = () => {
    try { detachHandlersRef.current() } catch {}
    detachHandlersRef.current = () => {}
  }

  const trigger = (k) => {
    stopAll() // 기존 소리 정지
    const pool = poolsRef.current.get(k)
    if (!pool) return
    const audio = pool.play()
    currentAudioRef.current = audio

    // 진행 카드 업데이트
    const meta = SOUND_MAP[k] || { title: k, file: KEY_TO_FILE[k], emoji: '', desc: 'Effect' }
    setCurrent({ key: k, ...meta })
    spawnSplash(SOUND_MAP[k]?.emoji || '🎵')  // ✨ 이모지 스플래시

    setPressed(k)
    setProgress(0)
    attachAudioHandlers(audio)

    // 키 눌림 하이라이트 짧게
    setTimeout(() => setPressed((p) => (p === k ? null : p)), 140)
  }

  const rowsToShow = showSecondRow ? KEY_ROWS : [KEY_ROWS[0]]

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>🍼BABY Keyboard</Typography>
          <FormControlLabel
            control={<Switch checked={showSecondRow} onChange={(e)=>setShowSecondRow(e.target.checked)} />}
            label="Show FULL keyBoard"
          />
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4, flexGrow: 1 }}>
        <Stack spacing={2}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Fredoka","Roboto","Segoe UI",system-ui,-apple-system',
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              backgroundImage: 'linear-gradient(90deg,#7C3AED,#EC4899)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            PRESS THE{' '}
            <Box
              component="span"
              sx={{
                px: 1, py: 0.25, mx: 0.5,
                borderRadius: 1,
                bgcolor: 'rgba(0,0,0,0.06)',
                border: '1px solid',
                borderColor: 'divider',
                fontFamily:
                  'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
                color: 'text.primary',
              }}
            >
              Button
            </Box>
            {' '}and Hear{' '}
            <Box
              component="span"
              sx={{
                px: 1, py: 0.25, mx: 0.5,
                borderRadius: 1,
                bgcolor: 'rgba(0,0,0,0.06)',
                border: '1px solid',
                borderColor: 'divider',
                fontFamily:
                  'ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace',
                color: 'text.primary',
              }}
            >
              SOUND!
            </Box>
          </Typography>

          {/* ===== KEYS GRID (fixed breaks after P/L) ===== */}
          <Grid container rowSpacing={1} columnSpacing={1.5}>
            {rowsToShow.map((row, rIdx) => (
              <Grid item xs={12} key={rIdx}>
                <Grid
                  container
                  columns={row.length}
                  columnSpacing={1.5}
                  wrap="nowrap"               // 행 내부 줄바꿈 금지 → P, L에서만 줄바꿈
                  alignItems="stretch"
                  sx={{ overflowX: 'auto', overflowY: 'visible', py: 1 }}
                >
                  {row.map((k) => {
                    const title = SOUND_MAP[k]?.title ?? k
                    const file = SOUND_MAP[k]?.file ?? KEY_TO_FILE[k]
                    const hasFile = !!file

                    return (
                      <Grid item xs={1} key={k} sx={{ minWidth: 0 }}>
                        <Card
                          elevation={pressed === k ? 8 : 1}
                          sx={{
                            borderRadius: 3,
                            opacity: hasFile ? 1 : 0.5,
                            transition: 'transform 80ms',
                            transform: pressed === k ? 'translateY(1px)' : 'none',
                          }}
                        >
                          <CardActionArea onClick={() => hasFile && trigger(k)} disabled={!hasFile}>
                            <CardContent sx={{ textAlign: 'center', py: 1 }}>
                              <Typography variant="h5" fontWeight={700} sx={{ fontSize: 28 }}>
                                {SOUND_MAP[k]?.emoji ? `${SOUND_MAP[k].emoji} ${k}` : k}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                {title}
                              </Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </Grid>
                    )
                  })}
                </Grid>
              </Grid>
            ))}
          </Grid>
          {/* ============================================= */}

          {/* ===== Bottom Now-Playing Card ===== */}
          {current && (
            <Card sx={{ borderRadius: 3, position: 'relative' }}>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <Stack spacing={0.5}>
                    <Typography variant="overline" color="text.secondary">Now Playing</Typography>
                    <Typography variant="h6" fontWeight={700}>
                      {current.emoji ? `${current.emoji} ${current.title}` : current.title}
                    </Typography>
                    {current.desc && (
                      <Typography variant="body2" color="text.secondary">{current.desc}</Typography>
                    )}
                  </Stack>
                  <IconButton onClick={stopAll} aria-label="stop" color="error">
                    <StopIcon />
                  </IconButton>
                </Stack>
              </CardContent>
              <LinearProgress variant="determinate" value={progress} sx={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }} />
            </Card>
          )}
          {/* =================================== */}
        </Stack>
      </Container>

      {/* ===== Footer ===== */}
      <Box
        component="footer"
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.paper',
          py: 3,
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={1}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', sm: 'center' }}
          >
            <Typography variant="body2" color="text.secondary">
              © {new Date().getFullYear()} 🍼BABY Keyboard
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Contact: <Link href="mailto:integer7813@gmail.com">integer7813@gmail.com</Link>
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* ==== Emoji Splash Layer ==== */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 1500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {splashItems.map((s) => (
          <Box
            key={s.id}
            sx={{
              fontSize: { xs: 96, sm: 128, md: 280 },
              lineHeight: 1,
              animation: `${pop} 1000ms ease-out both`,
              filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))',
            }}
          >
            {s.emoji}
          </Box>
        ))}
      </Box>
    </Stack>
  )
}
