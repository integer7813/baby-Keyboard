// src/pages/Landing.jsx
import { Container, Stack, Typography, Button, Box } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export default function Landing() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Stack spacing={3} alignItems="center" textAlign="center">
        <Typography variant="h3" fontWeight={800}>
          BABY Keyboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          아이가 자판 위치를 익히고, 이모지/소리로 즐겁게 상호작용하도록 만든 작은 웹앱 🎵
        </Typography>

        <Box sx={{ fontSize: 72, lineHeight: 1 }}>🎹😸🫧🎻</Box>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button
            component={RouterLink}
            to="/play"
            variant="contained"
            size="large"
          >
            Start Playing
          </Button>
          <Button
            component={RouterLink}
            to="/how-to"
            variant="outlined"
            size="large"
          >
            How to Use
          </Button>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          광고/분석 쿠키 없이, 개인 정보 최소 수집 원칙으로 동작합니다.
        </Typography>
      </Stack>
    </Container>
  )
}
