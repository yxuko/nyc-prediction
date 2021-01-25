import React from 'react'
import { connect } from 'react-redux'
import { changeLoadStatus, changeSexPredict } from '../../store'
import {
  FormControl,
  FormLabel,
  FormGroup,
  IconButton,
} from '@material-ui/core'
import Icon from '@material-ui/core/Icon';
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

const SexPredict = props => {
  const classes = useStyles()
  const sex = props.mapView.sexPredict
  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel className={classes.header} component="legend">
          Sex
        </FormLabel>
        <FormGroup style={{ display: 'block' }}>
          <IconButton aria-label="venus" onClick={() => {
                  props.changeSexPredict('F')
                }}>
            <Icon className="fas fa-venus" style={{ color: sex === "F" ? "#ec49a6" : "#fff" }}/>
          </IconButton>
          <IconButton aria-label="mars" onClick={() => {
                  props.changeSexPredict('M')
                }}>
            <Icon className="fas fa-mars" style={{ color: sex === "M" ? "#02a3fe" : "#fff" }}/>
          </IconButton>
        </FormGroup>
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
    changeSexPredict: (sex) =>
      dispatch(changeSexPredict(sex))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SexPredict)