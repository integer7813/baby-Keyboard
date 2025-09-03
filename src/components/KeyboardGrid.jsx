// src/components/KeyboardGrid.jsx
import { Box } from '@mui/material'
import PropTypes from 'prop-types'
import KeyCard from '../KeyCard' // 위치에 맞게 조정

export default function KeyboardGrid({ rows, soundMap, showSecondRow, pressed, onTrigger }) {
  const safeRows = Array.isArray(rows) ? rows : []
  const rowsToShow = showSecondRow && safeRows.length ? safeRows : [safeRows[0] || []]

  return (
    <Box>
      {rowsToShow.map((row = [], rIdx) => (
        <Box key={rIdx} sx={{ mb: 1 }}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: `repeat(${row.length || 1}, minmax(72px, 1fr))`,
              columnGap: 1.5,        // ≈ 12px
              alignItems: 'stretch',
              overflowX: 'auto',
              overflowY: 'visible',
              py: 1,
            }}
          >
            {row.map((k) => {
              const meta = soundMap?.[k] || {}
              const title = meta.title ?? k
              const file = meta.file ?? `${k}.mp3`
              const hasFile = !!file

              return (
                <Box key={k} sx={{ minWidth: 0 }}>
                  <KeyCard
                    k={k}
                    title={title}
                    emoji={meta.emoji}
                    pressed={pressed === k}
                    disabled={!hasFile}
                    onClick={() => hasFile && onTrigger(k)}
                  />
                </Box>
              )
            })}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

KeyboardGrid.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  soundMap: PropTypes.object.isRequired,
  showSecondRow: PropTypes.bool.isRequired,
  pressed: PropTypes.string,
  onTrigger: PropTypes.func.isRequired,
}
