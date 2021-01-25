import React from 'react'
import { connect } from 'react-redux'
import { changeLoadStatus, changeYearPredict } from '../../store'
import {
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { DatePicker } from "@material-ui/pickers";
import { makeStyles } from '@material-ui/core/styles'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';

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

const YearPredict = props => {
  const classes = useStyles()
  const year = moment(props.mapView.yearPredict+"-08-01")
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.header} component="legend">
          Year
        </FormLabel>
        <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          views={["year"]}
          value={year}
          onChange={(value) => {
            props.changeYearPredict(value.format('YYYY'))
          }}
          />
        </MuiPickersUtilsProvider>
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
    changeYearPredict: (year) =>
      dispatch(changeYearPredict(year))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YearPredict)