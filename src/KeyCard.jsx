import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export default function KeyCard({ k, title, emoji, pressed, disabled, onClick }) {
  return (
    <Card
      elevation={pressed ? 8 : 1}
      sx={{
        borderRadius: 3,
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 80ms',
        transform: pressed ? 'translateY(1px)' : 'none',
      }}
    >
      <CardActionArea onClick={onClick} disabled={disabled}>
        <CardContent sx={{ textAlign: 'center', py: 1 }}>
          <Typography variant="h5" fontWeight={700} sx={{ fontSize: 28 }}>
            {emoji ? `${emoji} ${k}` : k}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

KeyCard.propTypes = {
  k: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  emoji: PropTypes.string,
  pressed: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};
