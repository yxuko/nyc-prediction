import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { PlayCircleOutline } from '@material-ui/icons'
import Slider from '../Slider'
import Typography from '@material-ui/core/Typography'
import { allmarks, marks } from '../../../constants'

const useStyles = makeStyles(theme => ({
  root: {
    height: 150,
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(3),
    color: 'rgba(255, 255, 255, 0.7)',
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

const getHour = hour => {
  let hours = [-2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22]
  return hours.filter(el => hour >= el && hour < el + 2)[0]
}

function TimeSlider(props) {
  const [hour, setHour] = useState(getHour(props.value))
  let current = hour
  useEffect(
    () => {
      props.changeTime(getHour(current))
    },
    [current]
  )

  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Typography id="time-of-day-slider" gutterBottom className={classes.header}>
        Time of Day
        {props.playTime ? (
          <IconButton
            className={classes.button}
            aria-label="Play"
            disabled={current > 20}
            size="medium"
            onClick={() => {
              if (current < 22) {
                let int = setInterval(() => {
                  if (current > 18) clearInterval(int)
                  current = current + 2
                  setHour(getHour(current))
                }, 2000)
              }
            }}
          >
            <PlayCircleOutline />
          </IconButton>
        ) : null}
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
          min={-22}
          max={props.includeAll ? 2 : 0}
          step={null}
          marks={props.includeAll ? allmarks : marks }
          onChange={(e, v) => setHour(getHour(v * -1))}
          value={current * -1}
          orientation="vertical"
        />
      </div>
    </div>
  )
}


export default TimeSlider
