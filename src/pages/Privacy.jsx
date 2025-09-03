// src/pages/Privacy.jsx
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

export default function Privacy() {
  const EFFECTIVE_DATE = 'September 3, 2025 (KST)';

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Privacy Policy / 개인정보처리방침
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Effective Date / 시행일: {EFFECTIVE_DATE}
      </Typography>

      <Section
        title="1) Overview / 개요"
        items={[
          'EN: This Privacy Policy explains how BABY Keyboard (“we”, “our”, “Service”) collects, uses, and shares information.',
          'KR: 본 개인정보처리방침은 BABY Keyboard(이하 “당사”, “서비스”)가 정보를 수집·이용·공유하는 방법을 설명합니다.',
        ]}
      />

      <Section
        title="2) What We Collect / 수집하는 정보"
        items={[
          'EN: We may collect non-identifying usage data (device/browser type, OS, referrer, pages viewed, timestamps, approximate location from IP).',
          'KR: 장치/브라우저 유형, OS, 리퍼러, 방문 페이지, 접속 일시, IP 기반 대략적 위치 등의 비식별 사용 정보를 수집할 수 있습니다.',
          'EN: Preferences (e.g., UI settings) may be stored via cookies or localStorage. We do not collect personal contact data unless you voluntarily provide it (e.g., email inquiry).',
          'KR: 선호 설정(UI 설정 등)은 쿠키 또는 localStorage로 저장될 수 있습니다. 사용자가 자발적으로 제공하지 않는 한(예: 이메일 문의) 개인 연락처 정보는 수집하지 않습니다.',
        ]}
      />

      <Section
        title="3) Cookies & Local Storage / 쿠키 및 로컬 저장소"
        items={[
          'EN: We use (a) essential cookies for core functionality, (b) analytics for aggregated insights, and (c) advertising cookies to display ads.',
          'KR: (a) 필수 쿠키(핵심 기능), (b) 분석용 쿠키(집계 분석), (c) 광고 쿠키(광고 표시)를 사용할 수 있습니다.',
        ]}
      />

      <Section
        title="4) Advertising (Google AdSense) / 광고(구글 애드센스)"
        items={[
          'EN: The Service displays ads via Google AdSense. Google and partners may use cookies to serve and personalize ads where permitted.',
          'KR: 본 서비스는 Google AdSense를 통해 광고를 게재합니다. Google 및 파트너는 허용되는 범위에서 쿠키를 사용하여 광고를 제공/개인화할 수 있습니다.',
          'EN: For child-directed experiences, we request child-directed treatment and serve non-personalized ads (no interest-based targeting).',
          'KR: 아동 대상 이용 맥락에서는 아동 대상 처리(child-directed)를 요청하여 관심사 기반 타게팅이 없는 비개인화 광고를 제공합니다.',
          'EN: Manage ad personalization at Google Ads Settings or learn more below.',
          'KR: 맞춤형 광고 관리는 Google Ads 설정에서 할 수 있으며, 자세한 내용은 아래 링크를 참고하세요.',
          'EN: Google Ads Settings: https://adssettings.google.com',
          'KR: Google Ads 설정: https://adssettings.google.com',
          'EN: About Google ads & cookies: https://policies.google.com/technologies/ads',
          'KR: Google 광고·쿠키 안내: https://policies.google.com/technologies/ads',
          'EN: AdChoices (opt-out): https://www.aboutads.info/choices',
          'KR: AdChoices(옵트아웃): https://www.aboutads.info/choices',
        ]}
      />

      <Section
        title="5) How We Use Information / 이용 목적"
        items={[
          'EN: To operate/improve the Service, personalize UI, measure performance, prevent abuse/fraud, and comply with law.',
          'KR: 서비스 운영·개선, UI 개인화, 성능 측정, 부정 사용/사기 방지, 법적 의무 준수 목적으로 이용합니다.',
        ]}
      />

      <Section
        title="6) Sharing & Processors / 제3자 제공"
        items={[
          'EN: We may share non-identifying, aggregated data with analytics/ad providers. We do not sell personal data.',
          'KR: 비식별·집계 정보를 분석/광고 제공 업체와 공유할 수 있습니다. 당사는 개인 정보를 판매하지 않습니다.',
        ]}
      />

      <Section
        title="7) Retention & Security / 보관 및 보안"
        items={[
          'EN: We retain information only as long as necessary for the purposes described and then delete or anonymize it. We apply reasonable safeguards to protect information.',
          'KR: 정보는 목적에 필요한 기간 동안만 보관 후 삭제/익명화하며, 합리적 보호조치를 적용합니다.',
        ]}
      />

      <Section
        title="8) Your Choices / 사용자의 선택"
        items={[
          'EN: You can clear cookies/localStorage, use ad blockers, and manage ad personalization via Google Ads Settings.',
          'KR: 쿠키/localStorage 삭제, 광고 차단 도구 사용, Google Ads 설정을 통한 맞춤형 광고 관리를 할 수 있습니다.',
        ]}
      />

      <Section
        title="9) Children’s Privacy / 아동의 개인정보"
        items={[
          'EN: The Service is not directed to children under 13 (or the local age threshold). We do not knowingly collect personal data from children.',
          'KR: 본 서비스는 만 13세(또는 지역 기준 연령) 미만 아동을 대상으로 하지 않으며, 아동의 개인 정보를 고의로 수집하지 않습니다.',
        ]}
      />

      <Section
        title="10) International Transfers / 국외 이전"
        items={[
          'EN: Information may be processed in countries where we or our providers operate, with protections as required by law.',
          'KR: 정보는 당사 또는 제공업체가 운영하는 국가에서 처리될 수 있으며, 법령에 따른 보호조치를 적용합니다.',
        ]}
      />

      <Section
        title="11) Changes / 변경"
        items={[
          'EN: We may update this Policy. Material changes will be announced within the Service and by updating the Effective Date.',
          'KR: 본 방침은 변경될 수 있으며, 중대한 변경 시 서비스 내 공지 및 시행일 갱신으로 안내합니다.',
        ]}
      />

      <Section
        title="12) Contact / 문의"
        items={[
          'EN: Questions about this Privacy Policy? Contact: integer7813@gmail.com',
          'KR: 개인정보처리방침 문의: integer7813@gmail.com',
        ]}
      />

      <Section
        title="13) Language / 언어"
        items={[
          'EN: Provided in English and Korean. In case of conflict, the Korean version prevails.',
          'KR: 본 문서는 영문/국문으로 제공되며, 충돌 시 국문이 우선합니다.',
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
