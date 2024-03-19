import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Grid, Typography, Divider } from '@mui/material';

function LabelData({ title, subtitle }) {
  return (
    <Grid container spacing={1} alignItems="center" style={{ Width: '100%' }}>
      <Grid item style={{ textAlign: 'right', marginRight: 11 }}>
        <Typography variant="h7" style={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Grid>
      <Divider orientation="vertical" flexItem style={{ marginTop: '7px' }} />
      <Grid item>
        <Typography variant="body1">{subtitle}</Typography>
      </Grid>
    </Grid>
  );
}

LabelData.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default LabelData;
