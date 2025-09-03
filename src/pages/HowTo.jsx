// src/pages/HowTo.jsx
import {
  Container,
  Typography,
  Box,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function HowTo() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        How to Use / 사용 방법
      </Typography>

      <Section
        title="Overview / 개요"
        items={[
          'EN: BABY Keyboard helps kids get friendly with the keyboard—press a letter, hear a fun sound, and see a big emoji to reinforce recognition.',
          'KR: BABY Keyboard는 아이가 글자를 누르면 귀여운 소리가 나고 큰 이모지가 떠서 자판과 글자를 자연스럽게 익히도록 돕는 앱입니다.',
          'EN: It’s designed to spark playful parent–child interactions: read letters together, guess sounds, and make up stories.',
          'KR: 부모와 함께 글자를 읽고 소리를 맞히며 이야기를 만들어 보는 상호작용을 유도합니다.',
        ]}
      />

      <Section
        title="Quick Start / 빠른 시작"
        items={[
          'EN: Click any on-screen button to play a sound. On desktop, press the matching physical key (A–Z).',
          'KR: 화면 버튼을 클릭하거나, 데스크톱에서는 해당 물리 키(A–Z)를 눌러 소리를 재생하세요.',
          'EN: If you hear no sound, click once on the page—browsers often require a user gesture to unlock audio.',
          'KR: 소리가 안 나면 페이지를 한 번 클릭해 오디오 잠금을 해제한 뒤 다시 시도하세요.',
        ]}
      />

      <Section
        title="Play Modes / 사용 방식"
        items={[
          'EN: Tap Mode — Use on-screen buttons (great for touch devices).',
          'KR: 탭 모드 — 화면 버튼으로 재생(터치 기기 적합).',
          'EN: Type Mode — Use the physical keyboard (great for learning letter positions).',
          'KR: 타이핑 모드 — 물리 키보드로 재생(자판 위치 학습에 효과적).',
          'EN: The “Show FULL keyBoard” switch on Home toggles how many rows of keys are visible.',
          'KR: 홈의 “Show FULL keyBoard” 스위치로 표시되는 자판 행을 조절할 수 있습니다.',
        ]}
      />

      <Section
        title="What You See / 화면 구성"
        items={[
          'EN: Emoji Splash — A large emoji briefly pops with each sound for recognition and delight.',
          'KR: 이모지 스플래시 — 소리와 함께 큰 이모지가 잠깐 떠서 인지와 즐거움을 높입니다.',
          'EN: Now Playing — Shows the current sound and a progress bar; tap stop to halt playback.',
          'KR: Now Playing — 현재 재생 중인 소리와 진행 바가 표시됩니다. 정지 버튼으로 즉시 멈출 수 있어요.',
        ]}
      />

      <Section
        title="Parent–Child Play Ideas / 부모–아이 놀이"
        items={[
          'EN: Letter Hunt — “Find the key that makes a 🐓 sound!” (R → Rooster).',
          'KR: 글자 찾기 — “🐓 소리가 나는 키를 찾아볼까?” (R → 수탉).',
          'EN: Emoji Charades — Parent plays a sound; child imitates it or points to the emoji.',
          'KR: 이모지 제스처 — 부모가 소리를 재생하면 아이가 흉내 내거나 이모지를 가리켜요.',
          'EN: Call & Response — Parent says a letter; child presses it and describes the emoji.',
          'KR: 콜 앤 리스폰스 — 부모가 글자를 말하면 아이가 눌러 소리를 내고 이모지를 설명해요.',
          'EN: Memory Pairs — Choose 3–5 letters and quiz which sound belongs to which letter.',
          'KR: 매칭 놀이 — 3~5개 글자를 정해 어느 소리가 어느 글자인지 맞혀보게 해요.',
          'EN: Sound Story — Chain sounds to create a mini story (e.g., 🐶 → 💦 → 🫖).',
          'KR: 소리 이야기 — 여러 소리를 이어 작은 이야기를 만들어 보세요(예: 🐶 → 💦 → 🫖).',
        ]}
      />

      <Section
        title="Tips & Settings / 팁·설정"
        items={[
          'EN: Adjust volume to a kid-friendly level and leave short pauses so children can react and imitate.',
          'KR: 아이에게 편안한 볼륨으로 맞추고, 소리 사이에 잠깐 멈춰 반응·모방할 시간을 주세요.',
          'EN: Repetition helps memory—replay favorite keys.',
          'KR: 반복 학습이 기억에 도움 됩니다—좋아하는 키를 여러 번 눌러 보세요.',
        ]}
      />

      <Section
        title="Safety & Accessibility / 안전·접근성"
        items={[
          'EN: Keep volume moderate; avoid prolonged headphone use. Use short, engaging sessions.',
          'KR: 볼륨은 적당히, 헤드폰은 오래 사용하지 않도록 하며 짧고 몰입도 높은 시간으로 사용하세요.',
          'EN: Large emojis and clear labels support early learners.',
          'KR: 큰 이모지와 명확한 레이블은 유아 학습에 도움을 줍니다.',
        ]}
      />

      <Section
        title="Ads & Privacy Note / 광고·개인정보 안내"
        items={[
          'EN: Ads may be shown. In child-directed contexts, we request child-directed treatment and serve non-personalized ads. See the Privacy Policy for details and opt-out links.',
          'KR: 광고가 노출될 수 있습니다. 아동 대상 맥락에서는 아동 대상 처리를 요청하여 비개인화 광고를 제공합니다. 자세한 내용과 옵트아웃 링크는 개인정보처리방침을 참고하세요.',
          'EN: Google Ads Settings: https://adssettings.google.com',
          'KR: Google Ads 설정: https://adssettings.google.com',
        ]}
      />

      <Section
        title="Troubleshooting / 문제 해결"
        items={[
          'EN: No sound? Click once on the page to unlock audio; then try again.',
          'KR: 소리가 안 나요? 페이지를 한 번 클릭해 오디오 잠금을 해제한 뒤 다시 시도하세요.',
          'EN: Still silent? Check system/browser mute, tab mute, or connected speakers/headphones.',
          'KR: 계속 안 나면 시스템·탭 음소거, 연결된 스피커/헤드폰을 확인하세요.',
        ]}
      />

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mt: 3 }}>
        <Link component={RouterLink} to="/" underline="hover">
          ← Back to Home
        </Link>
      </Box>
    </Container>
  );
}

function Section({ title, items = [] }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>
        {title}
      </Typography>
      <List dense>
        {items.map((text, idx) => (
          <ListItem key={idx} sx={{ pl: 0 }}>
            <ListItemText
              primary={text}
              primaryTypographyProps={{ variant: 'body1', color: 'text.secondary' }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
