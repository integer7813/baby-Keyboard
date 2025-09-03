import { useMemo, useRef, useState, useEffect } from 'react';
import { Link as RouterLink, Routes, Route, Outlet, useLocation } from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Stack,
  Switch,
  FormControlLabel,
  Box,
  Link,
} from '@mui/material';

import { SOUND_MAP, KEY_ROWS, KEY_TO_FILE } from './utils/constants';
import { useAudioPools } from './use/useAudioPools';
import { useKeyListener } from './use/useKeyListener';
import { useEmojiSplash } from './use/useEmojiSplash';

import { Home, Privacy, Terms, HowTo } from './pages';
import EmojiSplash from './components/EmojiSplash';
import ShareMenu from './components/ShareMenu'

export default function App() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  const [showSecondRow, setShowSecondRow] = useState(true);
  const [pressed, setPressed] = useState(null);
  const [current, setCurrent] = useState(null);
  const [progress, setProgress] = useState(0);

  const detachHandlersRef = useRef(() => {});
  const currentAudioRef = useRef(null);

  const keysAll = useMemo(() => Array.from(new Set(KEY_ROWS.flat())), []);
  const poolsRef = useAudioPools(keysAll);
  const { splashItems, spawnSplash } = useEmojiSplash();

  const detachAudioHandlers = () => {
    try { detachHandlersRef.current(); } catch {}
    detachHandlersRef.current = () => {};
  };

  const attachAudioHandlers = (audio) => {
    const onTime = () => {
      if (audio.duration && !Number.isNaN(audio.duration)) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };
    const onEnd = () => {
      setProgress(100);
      setTimeout(() => { setCurrent(null); setProgress(0); setPressed(null); }, 120);
    };
    const onError = () => { setCurrent(null); setProgress(0); };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('ended', onEnd);
    audio.addEventListener('error', onError);
    detachHandlersRef.current = () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('ended', onEnd);
      audio.removeEventListener('error', onError);
    };
  };

  const stopAll = () => {
    poolsRef.current.forEach(pool => pool.stopAll());
    detachAudioHandlers();
    currentAudioRef.current = null;
    setCurrent(null);
    setProgress(0);
  };

  const trigger = (k) => {
    stopAll();
    const pool = poolsRef.current.get(k);
    if (!pool) return;
    const audio = pool.play();
    currentAudioRef.current = audio;

    const meta = SOUND_MAP[k] || { title: k, file: KEY_TO_FILE[k], emoji: '', desc: 'Effect' };
    setCurrent({ key: k, ...meta });
    spawnSplash(SOUND_MAP[k]?.emoji || '🎵');

    setPressed(k);
    setProgress(0);
    attachAudioHandlers(audio);

    setTimeout(() => setPressed(p => (p === k ? null : p)), 140);
  };

  // 홈에서만 키보드 리스너 활성화
  useKeyListener(trigger, () => setPressed(null), isHome);

  // 홈을 떠날 때 재생 중이면 정지
  useEffect(() => {
    if (!isHome) {
      stopAll();
      setPressed(null);
    }
  }, [isHome]);

  // ---- 라우팅 ----
  return (
    <Routes>
      <Route
        element={
          <Layout
            isHome={isHome}                         // ★ 여기가 추가
            showSecondRow={showSecondRow}
            setShowSecondRow={setShowSecondRow}
            splashItems={splashItems}
          />
        }
      >
        {/* 홈 */}
        <Route
          index
          element={
            <Home
              showSecondRow={showSecondRow}
              pressed={pressed}
              trigger={trigger}
              current={current}
              progress={progress}
              stopAll={stopAll}
            />
          }
        />

        {/* 문서 페이지 */}
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="how-to" element={<HowTo />} />

        {/* 404 */}
        <Route
          path="*"
          element={
            <Container maxWidth="md" sx={{ py: 6 }}>
              <Typography variant="h3" gutterBottom>404 Not Found</Typography>
              <Box sx={{ mt: 3 }}>
                <Link component={RouterLink} to="/" underline="hover">← Back to Home</Link>
              </Box>
            </Container>
          }
        />
      </Route>
    </Routes>
  );
}

/** 공통 레이아웃: 헤더, 풋터, EmojiSplash + Outlet */
function Layout({ isHome, showSecondRow, setShowSecondRow, splashItems }) {
  return (
    <Stack sx={{ minHeight: '100vh' }}>
      {/* 헤더 */}
      <AppBar position="sticky" color="default" elevation={0}>
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              cursor: 'pointer',
            }}
          >
            🍼BABY Keyboard
          </Typography>

          {/* 홈에서만 스위치 표시 */}
          {isHome && (
            <FormControlLabel
              control={
                <Switch
                  checked={showSecondRow}
                  onChange={(e)=>setShowSecondRow(e.target.checked)}
                />
              }
              label="Show FULL keyBoard"
            />
          )}
        </Toolbar>
      </AppBar>

      {/* 라우트 본문 */}
      <Box sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      {/* 풋터 */}
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
            <Stack direction="row" spacing={2} component="nav" aria-label="Footer links">
              <Link component={RouterLink} to="/privacy" underline="hover">Privacy Policy</Link>
              <Link component={RouterLink} to="/terms" underline="hover">Terms of Service</Link>
              <Link component={RouterLink} to="/how-to" underline="hover">How to Use</Link>

              {/* 공유하기 버튼 */}
              <ShareMenu useIconButton />

            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 이모지 스플래시 */}
      <EmojiSplash items={splashItems} />
    </Stack>
  );
}
