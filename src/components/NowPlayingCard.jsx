import { Card, CardContent, Stack, Typography, LinearProgress, IconButton } from '@mui/material';
import StopIcon from '@mui/icons-material/Stop';
import PropTypes from 'prop-types'; // 동일

export default function NowPlayingCard({ current, progress, onStop }) {
  if (!current) return null;
  return (
    <Card sx={{ borderRadius: 3, position: 'relative' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Stack spacing={0.5}>
            <Typography variant="overline" color="text.secondary">Now Playing</Typography>
            <Typography variant="h6" fontWeight={700}>
              {current.emoji ? `${current.emoji} ${current.title}` : current.title}
            </Typography>
            {current.desc && (
              <Typography variant="body2" color="text.secondary">{current.desc}</Typography>
            )}
          </Stack>
          <IconButton onClick={onStop} aria-label="stop" color="error">
            <StopIcon />
          </IconButton>
        </Stack>
      </CardContent>
      <LinearProgress variant="determinate" value={progress}
        sx={{ borderBottomLeftRadius: 12, borderBottomRightRadius: 12 }} />
    </Card>
  );
}

NowPlayingCard.propTypes = {
  current: PropTypes.shape({
    key: PropTypes.string,
    title: PropTypes.string,
    file: PropTypes.string,
    emoji: PropTypes.string,
    desc: PropTypes.string,
  }),
  progress: PropTypes.number.isRequired,
  onStop: PropTypes.func.isRequired,
};
