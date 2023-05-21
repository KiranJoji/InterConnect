import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: '97%',
    paddingLeft: 3,
  },
  thumb: {
    color: '#a7bcff',
  },
  rail: {
    color: `#a7bcff`,
  },
  track: {
    color: '#a7bcff',
  },
});

const SliderProton = ({ value, changeAge }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        value={value}
        onChange={changeAge}
        valueLabelDisplay='on'
        min={16}
        max={80}
        classes={{
          thumb: classes.thumb,
          rail: classes.rail,
          track: classes.track,
        }}
      />
    </div>
  );
};

export default SliderProton;
