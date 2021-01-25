import React from 'react'
import { connect } from 'react-redux'
import { changeMonthPredict, changeDayPredict, changeHourPredict } from '../../store'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import { SexPredict, RacePredict, LocationPredict, YearPredict } from '../Predict'
import { MonthSlider, DaySlider, TimeSlider } from '../Sliders'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { apiUrl } from '../../constants'

const drawerWidth = '200'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  submitContainer: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(4)
  },
  submit: {
    width: '100%',
  },
  drawer: {
    display: 'flex',
    flexDirection: 'column',
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#242424'
  },
  drawerHeader: {
    paddingTop: 22,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    fontWeight: 'bold'
  },
  drawerFooter: {
    display: 'flex',
    ...theme.mixins.toolbar
  }
}))

const PredictDrawer = props => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const togglePredictDrawer = openState => event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    setOpen(openState)
  }
  const predictButton = document.createElement('button')
  predictButton.setAttribute(
    'style',
    'width:100px; height:32px; font-size:14px; background-color: #242424; color: #69dcff; border-width: 0px; font-weight: bold; display: flex; justify-content: center; align-items: center; padding-right:15px; font-family:"Avenir Next W00","Helvetica Neue",Helvetica,Arial,sans-serif'
  )

  predictButton.innerHTML = '<i class="material-icons">chevron_left</i>Predict'

  predictButton.onclick = function () {
    setOpen(!open)
  }
  if (props.mapView.initialLoad) props.view.ui.add(predictButton, 'top-right')

  const  getPrediction = async () => { 
    setIsSubmitting(true)
    const data = {
      latitude : props.mapView.latitude,
      longitude : props.mapView.longitude,
      boro: props.mapView.boroPredict,
      sex: props.mapView.sexPredict,
      race: props.mapView.racePredict,
      year: props.mapView.yearPredict,
      month: props.mapView.monthPredict+1,
      day: props.mapView.dayPredict+1,
      hour: props.mapView.hourPredict
    }
    console.log(data)
    await axios.post(apiUrl+ "/predict", data).then(res => {
      setIsSubmitting(false)
      console.log(res)
      props.view.ui.find("myLocation").graphic.popupTemplate = {
        title: 'Crime Prediction',
        content: `<b>Location:</b> ${props.mapView.boroPredict.charAt(0) + props.mapView.boroPredict.slice(1).toLowerCase()} : ${props.mapView.latitude}, ${props.mapView.longitude} <br>
                  <b>Projected Date:</b> ${props.mapView.yearPredict}-${props.mapView.monthPredict+1}-${props.mapView.dayPredict+1} at ${props.mapView.hourPredict}h<br>
                  <b>Me:</b> ${props.mapView.sexPredict === "F" ? "Female" : "Male"},  ${props.mapView.racePredict.charAt(0) + props.mapView.racePredict.slice(1).toLowerCase()} <br><br>
                  <b>Drugs:</b> ${res.data.DRUGS} % <br>
                  <b>Homocide:</b> ${res.data.HOMICIDE} % <br>
                  <b>Sex Crime:</b>  ${res.data.SEXCRIME} % <br>
                  <b>Theft / Fraud:</b> ${res.data.THEFTFRAUD} % <br>
                  <b>Violent Crime:</b>  ${res.data.OTHERVIOLENT} % <br>
                  <b>Other Crime:</b>  ${res.data.OTHER} % `
      }
    })
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={togglePredictDrawer(false)}
      variant="persistent"
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <div className={classes.drawerFooter}>
        <Typography
          className={classes.drawerHeader}
          id="time-of-day-slider"
          gutterBottom
        >
          Predict:
        </Typography>
        <IconButton
          onClick={togglePredictDrawer(false)}
          style={{
            color: '#69dcff',
            paddingTop: 0,
            paddingBottom: 0,
            marginLeft: 'auto'
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <LocationPredict view={props.view}/>
      <SexPredict />
      <RacePredict />
      <YearPredict />
      <MonthSlider changeMonth={props.changeMonthPredict} value={props.mapView.monthPredict} />
      <DaySlider changeDay={props.changeDayPredict} value={props.mapView.dayPredict} />
      <TimeSlider changeTime={props.changeHourPredict} value={props.mapView.hourPredict} />
      <div className={classes.submitContainer}>
          <Button className={classes.submit} onClick={getPrediction} variant="contained" color="primary">
              {isSubmitting ? "Predicting Crime.." : "Predict"}
          </Button>
      </div>
    </Drawer>
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return { mapView }
}

const mapDispatchToProps = dispatch => {
  return {
    changeMonthPredict: month => dispatch(changeMonthPredict(month)),
    changeDayPredict: day => dispatch(changeDayPredict(day)),
    changeHourPredict: hour => dispatch(changeHourPredict(hour))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PredictDrawer)
