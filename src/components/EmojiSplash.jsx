import { keyframes } from '@mui/system';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';

const pop = keyframes`
  0% { transform: scale(0.6) translateY(10px); opacity: 0; }
  40% { transform: scale(1.15) translateY(0); opacity: 1; }
  100% { transform: scale(1.0) translateY(-8px); opacity: 0; }
`;

export default function EmojiSplash({ items }) {
  return (
    <Box sx={{
      position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1500,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      {items.map(s => (
        <Box key={s.id}
          sx={{ fontSize: { xs: 96, sm: 128, md: 280 }, lineHeight: 1,
                animation: `${pop} 1000ms ease-out both`,
                filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.25))' }}>
          {s.emoji}
        </Box>
      ))}
    </Box>
  );
}

EmojiSplash.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
  })).isRequired,
};
