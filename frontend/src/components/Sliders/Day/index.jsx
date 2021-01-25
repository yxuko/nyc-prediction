import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Slider from '../Slider'
import Typography from '@material-ui/core/Typography'
import { alldays, days } from '../../../constants'

const useStyles = makeStyles(theme => ({
  root: {
    height: 150,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)'
  },
  button: {
    color: '#69dcff',
    marginRight: '5%'
  },
  header: {
    marginBottom: theme.spacing(2)
  },
  rail: {
    opacity: 0.38
  },
  track: {
    opacity: 0.38
  },
  markLabel: {
    color: theme.palette.text.secondary
  },
  markLabelActive: {
    color: theme.palette.text.primary
  }
}))

function DaySlider(props) {
  const [dow, setDow] = useState(props.value)
  useEffect(
    () => {
      props.changeDay(dow)
    },
    [dow]
  )

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography
        id="discrete-slider-restrict"
        gutterBottom
        className={classes.header}
      >
        Day of Week
      </Typography>
      <div style={{ height: '100%' }}>
        <Slider
          classes={{
            rail: classes.rail,
            track: classes.track,
            markLabel: classes.markLabel,
            markLabelActive: classes.markLabelActive
          }}
          aria-labelledby="vertical-slider"
          min={-6}
          max={props.includeAll ? 1 : 0}
          step={null}
          marks={props.includeAll ? alldays : days }
          onChange={(e, v) => setDow(v * -1)}
          value={dow * -1}
          orientation="vertical"
        />
      </div>
    </div>
  )
}


export default DaySlider
