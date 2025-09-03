import { useEffect, useMemo } from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { useLocation, useNavigate } from 'react-router-dom'

// 경로 정규화: 빈 문자열 → '/', 마지막 슬래시 제거
const norm = (p) => {
  if (!p) return '/'
  if (p !== '/' && p.endsWith('/')) return p.slice(0, -1)
  return p
}

export default function PageArrows({
  routes = [],
  loop = false,
  showOn, // string[] | undefined
}) {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  // 모든 비교는 정규화한 경로로
  const currentPath = useMemo(() => norm(pathname), [pathname])
  const normRoutes = useMemo(
    () => routes.map(r => ({ ...r, path: norm(r.path) })),
    [routes]
  )
  const allowed = useMemo(
    () => new Set((showOn ?? normRoutes.map(r => r.path)).map(norm)),
    [normRoutes, showOn]
  )

  const idx = useMemo(
    () => normRoutes.findIndex(r => r.path === currentPath),
    [normRoutes, currentPath]
  )

  const { isVisible, hasPrev, hasNext, prevPath, nextPath } = useMemo(() => {
    const visible = allowed.has(currentPath) && idx !== -1 && normRoutes.length > 0
    if (!visible) {
      return { isVisible: false, hasPrev: false, hasNext: false, prevPath: null, nextPath: null }
    }
    const hp = idx > 0 || (loop && idx === normRoutes.length - 1)
    const hn = (idx >= 0 && idx < normRoutes.length - 1) || (loop && idx === 0)
    const pp = hp ? (idx > 0 ? normRoutes[idx - 1].path : normRoutes[normRoutes.length - 1].path) : null
    const np = hn ? (idx < normRoutes.length - 1 ? normRoutes[idx + 1].path : normRoutes[0].path) : null
    return { isVisible: true, hasPrev: hp, hasNext: hn, prevPath: pp, nextPath: np }
  }, [allowed, currentPath, idx, normRoutes, loop])

  const goPrev = () => prevPath && navigate(prevPath)
  const goNext = () => nextPath && navigate(nextPath)

  // ⬇ 훅은 항상 호출 (내부에서만 visible 체크)
  useEffect(() => {
    if (!isVisible) return
    const onKey = (e) => {
      const tag = (e.target?.tagName || '').toLowerCase()
      if (tag === 'input' || tag === 'textarea' || e.isComposing) return
      if (e.key === 'ArrowLeft') { e.preventDefault(); goPrev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); goNext() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isVisible, prevPath, nextPath])

  useEffect(() => {
    if (!isVisible) return
    let startX = null
    const onTouchStart = (e) => { startX = e.changedTouches?.[0]?.clientX ?? null }
    const onTouchEnd = (e) => {
      if (startX == null) return
      const dx = (e.changedTouches?.[0]?.clientX ?? startX) - startX
      const TH = 60
      if (dx > TH) goPrev()
      if (dx < -TH) goNext()
    }
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchend', onTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [isVisible, prevPath, nextPath])

  if (!isVisible) return null

  return (
    <>
      {hasPrev && (
        <Box sx={{ position: 'fixed', top: '50%', left: 8, transform: 'translateY(-50%)', zIndex: 1400 }}>
          <Tooltip title={getLabel(normRoutes, prevPath) || 'Previous'}>
            <span>
              <IconButton
                size="small"
                color="primary"
                aria-label="이전 페이지"
                onClick={goPrev}
                sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
              >
                <ChevronLeftIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )}

      {hasNext && (
        <Box sx={{ position: 'fixed', top: '50%', right: 8, transform: 'translateY(-50%)', zIndex: 1400 }}>
          <Tooltip title={getLabel(normRoutes, nextPath) || 'Next'}>
            <span>
              <IconButton
                size="small"
                color="primary"
                aria-label="다음 페이지"
                onClick={goNext}
                sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
              >
                <ChevronRightIcon fontSize="small" />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      )}
    </>
  )
}

function getLabel(routes, path) {
  return routes.find(r => r.path === path)?.label
}
