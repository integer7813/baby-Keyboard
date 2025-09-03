// src/components/PageIndicator.jsx
import { useMemo } from 'react'
import { Box, Stack, Tooltip, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

// 경로 정규화: '' -> '/', 끝 슬래시 제거
const norm = (p) => {
  if (!p) return '/'
  if (p !== '/' && p.endsWith('/')) return p.slice(0, -1)
  return p
}

/**
 * 페이지 인디케이터(1/N + Dots)
 * - routes: [{ path: '/','label':'Home' }, ...] 순서대로 인덱스/총 개수 계산
 * - showOn: 보일 경로 집합(기본: routes 내부 경로들)
 * - 클릭 시 해당 페이지로 이동
 */
export default function PageIndicator({
  routes = [],
  showOn, // string[] | undefined
}) {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  const currentPath = useMemo(() => norm(pathname), [pathname])
  const normRoutes = useMemo(() => routes.map(r => ({ ...r, path: norm(r.path) })), [routes])
  const allowed = useMemo(
    () => new Set((showOn ?? normRoutes.map(r => r.path)).map(norm)),
    [normRoutes, showOn]
  )

  const idx = useMemo(() => normRoutes.findIndex(r => r.path === currentPath), [normRoutes, currentPath])
  const total = normRoutes.length
  const isVisible = allowed.has(currentPath) && idx !== -1 && total > 1

  if (!isVisible) return null

  return (
    <Box
      sx={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        // 풋터와 겹치지 않게 약간 위로
        bottom: { xs: 88, sm: 80 },
        zIndex: 1350,
        bgcolor: 'background.paper',
        borderRadius: 999,
        boxShadow: 1,
        px: 1.25,
        py: 0.75,
      }}
      role="navigation"
      aria-label="Page indicator"
    >
      <Stack direction="row" spacing={1.25} alignItems="center">
        {/* fraction */}
        <Typography variant="caption" color="text.secondary" sx={{ minWidth: 48, textAlign: 'center' }}>
          {idx + 1} / {total}
        </Typography>

        {/* dots */}
        <Stack direction="row" spacing={0.75} alignItems="center">
          {normRoutes.map((r, i) => {
            const active = i === idx
            const label = r.label || r.path
            return (
              <Tooltip key={r.path} title={label}>
                <Box
                  component="button"
                  type="button"
                  onClick={() => navigate(r.path)}
                  aria-current={active ? 'page' : undefined}
                  aria-label={`${i + 1} of ${total}: ${label}`}
                  sx={{
                    all: 'unset',
                    cursor: 'pointer',
                    width: 8, height: 8, borderRadius: '50%',
                    bgcolor: active ? 'primary.main' : 'divider',
                    border: '1px solid',
                    borderColor: active ? 'primary.main' : 'divider',
                    transition: 'transform 120ms',
                    '&:hover': { transform: 'scale(1.15)' },
                  }}
                />
              </Tooltip>
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
}
