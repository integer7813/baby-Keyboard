// src/pages/Terms.jsx
import { Container, Typography, Box, Link, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Terms() {
  const EFFECTIVE_DATE = 'September 3, 2025 (KST)';

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>Terms of Service / 서비스 이용약관</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Effective Date / 발효일: {EFFECTIVE_DATE}
      </Typography>

      <Section
        title="1) Acceptance of Terms / 약관 동의"
        items={[
          'EN: By accessing or using BABY Keyboard (“Service”, “we”, “our”), you agree to these Terms.',
          'KR: BABY Keyboard(이하 “서비스”, “당사”)를 이용함으로써 본 약관에 동의한 것으로 간주됩니다.',
        ]}
      />

      <Section
        title="2) Service Description / 서비스 개요"
        items={[
          'EN: The Service lets users trigger short sound effects via on-screen buttons or physical keyboard keys.',
          'KR: 화면 버튼 또는 물리 키보드로 짧은 효과음을 재생할 수 있는 서비스입니다.',
        ]}
      />

      <Section
        title="3) Commercial Nature & Ads / 상업적 성격 및 광고"
        items={[
          'EN: The Service operates for commercial purposes and displays ads (e.g., Google AdSense). We may earn revenue from ads.',
          'KR: 본 서비스는 상업적 목적으로 운영되며 광고(예: Google AdSense)를 게재합니다. 광고로부터 수익이 발생할 수 있습니다.',
          'EN: For child-directed contexts, we request child-directed treatment and serve non-personalized ads.',
          'KR: 아동 대상 맥락에서는 아동 대상 처리를 요청하여 비개인화 광고를 제공합니다.',
        ]}
      />

      <Section
        title="4) Permitted Use / 허용되는 이용"
        items={[
          'EN: Personal, non-commercial consumption is permitted. Any redistribution, recording, scraping, bulk downloading, or sampling of audio assets is prohibited unless expressly allowed by us.',
          'KR: 개인적·비상업적 이용은 허용됩니다. 당사가 명시적으로 허용하지 않는 한, 오디오 자산의 재배포, 녹음, 스크래핑, 대량 다운로드, 샘플링은 금지됩니다.',
        ]}
      />

      <Section
        title="5) Prohibited Activities / 금지 행위"
        items={[
          'EN: Do not (a) reverse engineer or bypass technical limits, (b) interfere with the Service or other users, (c) use bots to auto-trigger audio, (d) infringe IP rights.',
          'KR: (a) 기술적 제한 우회/역설계, (b) 서비스 또는 타인 이용 방해, (c) 자동 재생 봇 사용, (d) 지식재산권 침해 행위를 금지합니다.',
        ]}
      />

      <Section
        title="6) Intellectual Property / 지식재산권"
        items={[
          'EN: The Service, UI, code, and content are owned by us or our licensors. Third-party trademarks/images/audio remain with their owners.',
          'KR: 서비스, UI, 코드 및 콘텐츠의 권리는 당사 또는 라이선스 제공자에게 있습니다. 제3자의 상표/이미지/오디오는 각 권리자에게 귀속됩니다.',
        ]}
      />

      <Section
        title="7) Third-Party Links / 제3자 링크"
        items={[
          'EN: We are not responsible for third-party sites, services, or content linked from the Service.',
          'KR: 서비스에서 링크되는 제3자 사이트·서비스·콘텐츠에 대해 당사는 책임지지 않습니다.',
        ]}
      />

      <Section
        title="8) Disclaimer of Warranties / 보증의 부인"
        items={[
          'EN: The Service is provided “AS IS” and “AS AVAILABLE” without warranties of any kind.',
          'KR: 본 서비스는 “있는 그대로” 및 “제공 가능한 범위 내에서” 제공되며, 어떠한 보증도 하지 않습니다.',
        ]}
      />

      <Section
        title="9) Limitation of Liability / 책임의 제한"
        items={[
          'EN: To the maximum extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from your use.',
          'KR: 관련 법률이 허용하는 범위 내에서, 서비스 이용으로 인한 간접적·부수적·결과적 손해 등에 대해 당사는 책임을 지지 않습니다.',
        ]}
      />

      <Section
        title="10) Indemnification / 면책"
        items={[
          'EN: You agree to indemnify and hold us harmless from claims arising out of your misuse of the Service.',
          'KR: 서비스 오용으로 발생하는 청구로부터 당사를 면책하는 데 동의합니다.',
        ]}
      />

      <Section
        title="11) Changes to Service & Terms / 서비스·약관 변경"
        items={[
          'EN: We may modify or discontinue the Service or these Terms at any time. Material changes will be announced within the Service.',
          'KR: 당사는 언제든지 서비스 또는 본 약관을 변경·중단할 수 있으며, 중대한 변경 시 서비스 내 공지합니다.',
        ]}
      />

      <Section
        title="12) Termination / 이용 종료"
        items={[
          'EN: We may suspend or terminate access if you violate these Terms or applicable law.',
          'KR: 본 약관 또는 관련 법령 위반 시 서비스 이용을 제한·종료할 수 있습니다.',
        ]}
      />

      <Section
        title="13) Governing Law & Disputes / 준거법·분쟁 해결"
        items={[
          'EN: These Terms are governed by the laws of the Republic of Korea. Disputes shall be submitted to the exclusive jurisdiction of courts in Seoul, Korea.',
          'KR: 본 약관은 대한민국 법률에 따르며, 분쟁은 대한민국 서울 소재 법원의 전속관할로 합니다.',
        ]}
      />

      <Section
        title="14) Language / 약관 언어"
        items={[
          'EN: Provided in English and Korean. In case of conflict, the Korean version prevails.',
          'KR: 영문/국문 병기이며, 충돌 시 국문이 우선합니다.',
        ]}
      />

      <Section
        title="15) Contact / 연락처"
        items={[
          'EN: Terms questions? Contact: integer7813@gmail.com',
          'KR: 약관 문의: integer7813@gmail.com',
        ]}
      />

      <Divider sx={{ my: 4 }} />

      <Box sx={{ mt: 3 }}>
        <Link component={RouterLink} to="/" underline="hover">← Back to Home</Link>
      </Box>
    </Container>
  );
}

function Section({ title, items = [] }) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 1.5 }}>{title}</Typography>
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
