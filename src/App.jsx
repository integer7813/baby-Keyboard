// src/App.jsx
import { useMemo, useRef, useState, useEffect } from 'react'
import { Link as RouterLink, Routes, Route, Outlet, useLocation } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Container, Stack, Box, Link, IconButton, Tooltip } from '@mui/material'
import ToggleOnIcon from '@mui/icons-material/ToggleOn'
import ToggleOffIcon from '@mui/icons-material/ToggleOff'

import { useAudioPools } from './use/useAudioPools'
import { useKeyListener } from './use/useKeyListener'
import { useEmojiSplash } from './use/useEmojiSplash'

import EmojiSplash from './components/EmojiSplash'
import ShareMenu from './components/ShareMenu'
import PageArrows from './components/PageArrows'
import PageIndicator from './components/PageIndicator'

import { Landing, Play, Privacy, Terms, HowTo } from './pages'
import { pickVariant } from './variants'

// 아이용 네비(좌/우) 대상
const KID_ROUTES = [
  { path: '/',      label: 'Landing', play: false },
  { path: '/Play',  label: 'Play',    play: true  },
  { path: '/Play2', label: 'Play2',   play: true  },
]

export default function App() {
  const { pathname } = useLocation()
  const isLanding = pathname === '/'

  // ✅ 라우트마다 variant 선택 (soundsDir/fallbackSuffix 포함)
  const { soundMap, keyRows, soundsDir, fallbackSuffix } = useMemo(
    () => pickVariant(pathname),
    [pathname]
  )

  // ✅ 어떤 경로가 '플레이 모드'인지 (KID_ROUTES의 play flag 이용)
  const isPlay = useMemo(() => {
    const p = (pathname || '/').replace(/\/+$/, '') || '/'
    return KID_ROUTES.some(r => r.play && (p === r.path || p.startsWith(r.path + '/')))
  }, [pathname])

  // 상태
  const [showSecondRow, setShowSecondRow] = useState(true)
  const [showArrows, setShowArrows] = useState(true)
  const [pressed, setPressed] = useState(null)
  const [current, setCurrent] = useState(null)
  const [progress, setProgress] = useState(0)

  // 오디오 풀 준비
  const detachHandlersRef = useRef(() => {})
  const currentAudioRef = useRef(null)

  const keysAll = useMemo(() => Array.from(new Set(keyRows.flat())), [keyRows])

  // SOUND_MAP에 없는 키는 `${키}${fallbackSuffix}.mp3` 폴백 (폴더는 soundsDir로 분리)
  const fileMap = useMemo(() => {
    const suffix = fallbackSuffix ?? ''
    return Object.fromEntries(
      'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(k => [
        k, soundMap[k]?.file ?? `${k}${suffix}.mp3`
      ])
    )
  }, [soundMap, fallbackSuffix])

  // ⬇️⬇️⬇️ 중요: 폴더 분리를 위해 soundsDir을 세 번째 인자로 전달!
  const poolsRef = useAudioPools(keysAll, fileMap, soundsDir)
  // ⬆️⬆️⬆️

  const { splashItems, spawnSplash } = useEmojiSplash()

  const detachAudioHandlers = () => {
    try { detachHandlersRef.current() } catch {}
    detachHandlersRef.current = () => {}
  }

  const attachAudioHandlers = (audio) => {
    const onTime = () => {
      if (audio.duration && !Number.isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100)
      }
    }
    const onEnd = () => {
      setProgress(100)
      setTimeout(() => { setCurrent(null); setProgress(0); setPressed(null) }, 120)
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

  const stopAll = () => {
    poolsRef.current.forEach(pool => pool.stopAll())
    detachAudioHandlers()
    currentAudioRef.current = null
    setCurrent(null)
    setProgress(0)
  }

  const trigger = (k) => {
    stopAll()
    const pool = poolsRef.current.get(k)
    if (!pool) return
    const audio = pool.play()
    currentAudioRef.current = audio

    const meta = soundMap[k] || { title: k, file: fileMap[k], emoji: '', desc: 'Effect' }
    setCurrent({ key: k, ...meta })
    spawnSplash(soundMap[k]?.emoji || '🎵')

    setPressed(k)
    setProgress(0)
    attachAudioHandlers(audio)

    setTimeout(() => setPressed(p => (p === k ? null : p)), 140)
  }

  // 플레이 모드에서만 키보드 리스너 활성화
  useKeyListener(trigger, () => setPressed(null), isPlay)

  // 플레이 모드 벗어나면 재생 정지
  useEffect(() => {
    if (!isPlay) {
      stopAll()
      setPressed(null)
    }
  }, [isPlay])

  return (
    <Routes>
      <Route
        element={
          <Layout
            isPlay={isPlay}
            isLanding={isLanding}
            showSecondRow={showSecondRow}
            setShowSecondRow={setShowSecondRow}
            splashItems={splashItems}
            showArrows={showArrows}
            setShowArrows={setShowArrows}
          />
        }
      >
        {/* /Play, /Play2 → 각자 다른 variant 적용 (pickVariant가 경로 기준으로 결정) */}
        <Route
          path="Play"
          element={
            <Play
              rows={keyRows}
              soundMap={soundMap}
              showSecondRow={showSecondRow}
              pressed={pressed}
              trigger={trigger}
              current={current}
              progress={progress}
              stopAll={stopAll}
            />
          }
        />
        <Route
          path="Play2"
          element={
            <Play
              rows={keyRows}
              soundMap={soundMap}
              showSecondRow={showSecondRow}
              pressed={pressed}
              trigger={trigger}
              current={current}
              progress={progress}
              stopAll={stopAll}
            />
          }
        />

        {/* / = Landing */}
        <Route path="/" element={<Landing />} />

        {/* 문서 페이지 */}
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="how-to" element={<HowTo />} />
      </Route>
    </Routes>
  )
}

function Layout({ isPlay, isLanding, showSecondRow, setShowSecondRow, splashItems, showArrows, setShowArrows }) {
  const allowArrows = showArrows || isLanding

  return (
    <Stack sx={{ minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', cursor: 'pointer' }}
          >
            🍼BABY Keyboard
          </Typography>

          {/* 화살표 토글: 랜딩에서는 버튼 숨김 */}
          {!isLanding && (
            <Tooltip title={showArrows ? 'Hide page arrows' : 'Show page arrows'}>
              <IconButton onClick={() => setShowArrows(v => !v)} sx={{ mr: 1 }}>
                {showArrows ? <ToggleOnIcon /> : <ToggleOffIcon />}
              </IconButton>
            </Tooltip>
          )}

          {/* FULL keyboard 토글: 플레이 화면에서만 */}
          {isPlay && (
            <Tooltip title={showSecondRow ? 'Hide extra keys' : 'Show FULL keyboard'}>
              <IconButton
                aria-label={showSecondRow ? 'hide extra keys' : 'show full keyboard'}
                onClick={() => setShowSecondRow(v => !v)}
              >
                {showSecondRow ? <ToggleOnIcon /> : <ToggleOffIcon />}
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1, position: 'relative' }}>
        <Outlet />
        {/* 랜딩에서도 인디케이터/화살표 보이게 (allowArrows) */}
        {allowArrows && <PageArrows routes={KID_ROUTES} loop />}
        <PageIndicator routes={KID_ROUTES} />
      </Box>

      <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', py: 3, mt: 2 }}>
        <Container maxWidth="lg">
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }}>
            <Typography variant="body2" color="text.secondary">© {new Date().getFullYear()} 🍼BABY Keyboard</Typography>
            <Stack direction="row" spacing={2} component="nav" aria-label="Footer links" alignItems="center">
              <Link component={RouterLink} to="/privacy" underline="hover">Privacy Policy</Link>
              <Link component={RouterLink} to="/terms" underline="hover">Terms of Service</Link>
              <Link component={RouterLink} to="/how-to" underline="hover">How to Use</Link>
              <ShareMenu useIconButton />
            </Stack>
          </Stack>
        </Container>
      </Box>

      <EmojiSplash items={splashItems} />
    </Stack>
  )
}
