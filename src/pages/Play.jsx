import { Container, Stack } from '@mui/material'
import KeyboardGrid from '../components/KeyboardGrid'
import NowPlayingCard from '../components/NowPlayingCard'

export default function Play({
  rows,            // ✅ 추가
  soundMap,        // ✅ 추가
  showSecondRow,
  pressed,
  trigger,
  current,
  progress,
  stopAll,
}) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stack spacing={2}>
        <KeyboardGrid
          rows={rows}
          soundMap={soundMap}
          showSecondRow={showSecondRow}
          pressed={pressed}
          onTrigger={trigger}
        />
        <NowPlayingCard current={current} progress={progress} onStop={stopAll} />
      </Stack>
    </Container>
  )
}
