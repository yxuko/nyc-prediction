import { useEffect } from 'react'
import { loadModules } from 'esri-loader'
import axios from 'axios'
import { changeBoro } from '../../../store'
import { connect } from 'react-redux'
import { changePeriod, changeLocationPredict, changeBoroPredict } from './../../../store/view';

const WidgetsLayer = props => {
  useEffect(() => {
    loadModules([
      'esri/widgets/TimeSlider',
      'esri/widgets/LayerList',
      'esri/widgets/Expand',
      'esri/widgets/Locate',
      'esri/core/watchUtils',
      'esri/widgets/Legend',
      'esri/widgets/Search',
      'esri/widgets/BasemapGallery',
      'esri/tasks/Locator',
      'esri/geometry/SpatialReference',
      'esri/geometry/Point'
    ])
      .then(
        ([TimeSlider,
          LayerList,
          Expand,
          Locate,
          watchUtils,
          Legend,
          Search,
          BasemapGallery
        ]) => {
          props.view.when(function () {
            var searchBtn = new Search({
              view: props.view
            })
            searchBtn.on('select-result', async function (evt) {
              const lat = parseFloat(evt.result.feature.geometry.latitude)
              const lon = parseFloat(evt.result.feature.geometry.longitude)
              props.changeLocationPredict(lon, lat)
              axios
              .get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
              )
                .then(res => {
                  if (res.data.countryCode == "US") {
                    props.changeBoro(res.data.localityInfo.administrative[3].name.toUpperCase())
                  } else {
                    props.changeBoro("MANHATTAN")
                  }
                })
            })
            var searchExpand = new Expand({
              view: props.view,
              content: searchBtn
            })
            props.view.ui.add(searchExpand, 'top-left')

            var layerList = new LayerList({
              view: props.view
            })
            var expand = new Expand({
              view: props.view,
              content: layerList
            })
            props.view.ui.add(expand, 'top-left')
        
            var locateBtn = new Locate({
              id: "myLocation",
              view: props.view
            })
            locateBtn.on('locate', async function (evt) {
              const lat = parseFloat(evt.position.coords.latitude)
              const lon = parseFloat(evt.position.coords.longitude)
              props.changeLocationPredict(lon, lat)
              axios
              .get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
              )
                .then(res => {
                  if (res.data.countryCode == "US") {
                    props.changeBoro(res.data.localityInfo.administrative[3].name.toUpperCase())
                    props.changeBoroPredict(res.data.localityInfo.administrative[3].name.toUpperCase())
                  } else {
                    props.changeBoro("MANHATTAN")
                    props.changeBoroPredict("MANHATTAN")
                  }
                })
            })
            props.view.ui.add(locateBtn, {
              position: 'top-left'
            })

            let legendDiv = document.createElement('div')
            legendDiv.id = 'legend'
            legendDiv.setAttribute('style', 'margin-right:25%')
            document.body.appendChild(legendDiv)

            var legend = new Legend({
              view: props.view,
              container: 'legend'
            })
            props.view.ui.add(legend, 'bottom-left')

            var basemap = new BasemapGallery({
              view: props.view,
            })

            var baseExpand = new Expand({
              view: props.view,
              content: basemap
            })
            props.view.ui.add(baseExpand, 'top-left')

            var baseTimeSlider = new TimeSlider({
              view: props.view,
              mode: "time-window",
              fullTimeExtent: { // entire extent of the timeSlider
                start: new Date(2019, 0, 1),
                end: new Date(2019, 11, 31)
              },
              stops: {
                interval: {
                  value: 1,
                  unit: "months"
                },
              }
            })
            props.view.ui.add(baseTimeSlider, 'bottom-left')
            baseTimeSlider.watch("timeExtent", function (value) {
              props.changePeriod(value.start, value.end)
            });

            const sampleInstructions = document.createElement('div')
            sampleInstructions.style.padding = '10px'
            sampleInstructions.style.backgroundColor = '#242424'
            sampleInstructions.style.width = '300px'
            sampleInstructions.innerText = [
              'Historical activity shows crimes committed in a two hour window occurring on the same weekday. Source: 2018 NYC Crime Open Data. '
            ].join(' ')

            const instructionsExpand = new Expand({
              expandIconClass: 'esri-icon-question',
              expandTooltip: 'Click here for data information.',
              expanded: false,
              view: props.view,
              content: sampleInstructions
            })
            props.view.ui.add(instructionsExpand, 'top-left')

            // Hide the instructions when the user starts interacting with the sample

            watchUtils.whenTrueOnce(props.view, 'interacting', function () {
              instructionsExpand.expanded = false
            })
          })
        }
      )
      .catch(err => console.error(err))
  }, [])
  return null
}

const mapDispatchToProps = dispatch => {
  return {
    changeBoro: boro => dispatch(changeBoro(boro)),
    changePeriod: (startDate, endDate) => dispatch(changePeriod(startDate, endDate)),
    changeLocationPredict: (longitude, latitude) =>
      dispatch(changeLocationPredict(longitude, latitude)),
    changeBoroPredict: (boro) =>
      dispatch(changeBoroPredict(boro))
  }
}

export default connect(null, mapDispatchToProps)(WidgetsLayer)
