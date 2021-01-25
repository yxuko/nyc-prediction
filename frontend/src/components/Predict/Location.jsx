import React from 'react'
import { connect } from 'react-redux'
import { loadModules } from 'esri-loader'
import { changeLoadStatus, changeLocationPredict, changeBoroPredict } from '../../store'
import {
  FormControl,
  Button
} from '@material-ui/core'
import axios from 'axios'
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

const LocationPredict = props => {

  const classes = useStyles()
  const selectedCategories = props.mapView.categoryPredict

  const getLocation = () => { 
    props.view.when(async function () {
      props.view.ui.find("myLocation").locate().then(async function (evt) {
        const lat = parseFloat(evt.coords.latitude)
        const lon = parseFloat(evt.coords.longitude)
        props.changeLocationPredict(lon, lat)
        axios
          .get(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
          )
          .then(res => {
              if (res.data.countryCode === "US") {
                props.changeBoroPredict(res.data.localityInfo.administrative[3].name.toUpperCase())
              } else {
                props.changeBoroPredict("MANHATTAN")
              }
          })
      })
    })
  }

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        {props.mapView.longitude === "" && props.mapView.latitude === "" ? (
          <Button
            color="secondary"
            className={classes.button}
            onClick={getLocation}
            startIcon={<Icon className="fas fa-map-pin" />}
          >
            Locate Me
          </Button>

        ) : (
            <Button disabled>{props.mapView.longitude}, {props.mapView.latitude}</Button>
        )}
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
    changeLocationPredict: (longitude, latitude) =>
      dispatch(changeLocationPredict(longitude, latitude)),
    changeBoroPredict: (boro) =>
      dispatch(changeBoroPredict(boro))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LocationPredict)
