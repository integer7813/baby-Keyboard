import { Grid } from '@mui/material';
import { SOUND_MAP, KEY_ROWS, KEY_TO_FILE } from '../utils/constants';
import KeyCard from '../KeyCard';
import PropTypes from 'prop-types';

export default function KeyboardGrid({ showSecondRow, pressed, onTrigger }) {
  const rowsToShow = showSecondRow ? KEY_ROWS : [KEY_ROWS[0]];
  return (
    <Grid container rowSpacing={1} columnSpacing={1.5}>
      {rowsToShow.map((row, rIdx) => (
        <Grid item xs={12} key={rIdx}>
          <Grid container columns={row.length} columnSpacing={1.5} wrap="nowrap" alignItems="stretch"
                sx={{ overflowX: 'auto', overflowY: 'visible', py: 1 }}>
            {row.map((k) => {
              const title = SOUND_MAP[k]?.title ?? k;
              const file = SOUND_MAP[k]?.file ?? KEY_TO_FILE[k];
              const hasFile = !!file;
              return (
                <Grid item xs={1} key={k} sx={{ minWidth: 0 }}>
                  <KeyCard
                    k={k}
                    title={title}
                    emoji={SOUND_MAP[k]?.emoji}
                    pressed={pressed === k}
                    disabled={!hasFile}
                    onClick={() => hasFile && onTrigger(k)}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

KeyboardGrid.propTypes = {
  showSecondRow: PropTypes.bool.isRequired,
  pressed: PropTypes.string,
  onTrigger: PropTypes.func.isRequired,
};
