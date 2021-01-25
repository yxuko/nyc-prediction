import React from 'react'
import { connect } from 'react-redux'
import { changeLoadStatus, changeRacePredict } from '../../store'
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  root: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(4)
  },
  label: {
    height: 30
  },
  header: {
    marginBottom: 5
  }
}))

const RacePredict = props => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.header} component="legend">
          Ethnicity
        </FormLabel>
        <RadioGroup onChange={e => {
          e.preventDefault()
          props.changeRacePredict(e.target.value)
        }}
        >
          <FormControlLabel
            className={classes.label}
            value="BLACK"
            control={
              <Radio />
            }
            label="Black"
          />
          <FormControlLabel
            className={classes.label}
            value="BLACK HISPANIC"
            control={
              <Radio />
            }
            label="Black Hispanic"
          />
          <FormControlLabel
            className={classes.label}
            value="ASIAN / PACIFIC ISLANDER"
            control={
              <Radio />
            }
            label="Asian / Pacific Islander"
          />
          <FormControlLabel
            className={classes.label}
            value="AMERICAN INDIAN/ALASKAN NATIVE"
            control={
              <Radio />
            }
            label="American Indian/Alaskan Native"
          />
          <FormControlLabel
            className={classes.label}
            value="WHITE"
            control={
              <Radio />
            }
            label="White"
          />
          <FormControlLabel
            className={classes.label}
            value="WHITE HISPANIC"
            control={
              <Radio />
            }
            label="White Hispanic"
          />
          <FormControlLabel
            className={classes.label}
            value="OTHER"
            control={
              <Radio />
            }
            label="Other"
          />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => {
  let mapView = state.view
  return { mapView }
}

const mapDispatchToProps = dispatch => {
  return {
    initialLoad: () => dispatch(changeLoadStatus()),
    changeRacePredict: (race) =>
      dispatch(changeRacePredict(race))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RacePredict)
