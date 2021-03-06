/* eslint-disable react/display-name */
import React from 'react'
import { Map, Scene } from '@esri/react-arcgis'
import { BoroughsLayer, BuildingsLayer, WidgetsLayer, CrimesLayer, TopTenCrimesLayer, SubwayLayer } from './Layers'
import { BoroughsButtons, FilterDrawer, PredictDrawer, BuildingsModeButton } from './Interface'
import { toggle3d } from '../store'
import { connect } from 'react-redux'

const loaderOptions = {
  url: 'https://js.arcgis.com/4.18'
}

export function BaseMap(props) {
  if (!props.mapView.threeD) {
    return (
      <Map
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'dark-gray-vector' }}
        viewProperties={{
          center: [-73.953413, 40.788602],
          zoom: 12.5
        }}
        loaderOptions={loaderOptions}
      >
        <WidgetsLayer />
        <BoroughsButtons />
        <BoroughsLayer />
        <CrimesLayer currentHour={props.mapView.hour} />
        <SubwayLayer />
        <FilterDrawer />
        <PredictDrawer />
        <BuildingsModeButton threeD={props.mapView.threeD} toggle3d={props.toggle3d} />
      </Map>
    )
  } else {
    return (
      <Scene
        style={{ width: '100vw', height: '100vh' }}
        mapProperties={{ basemap: 'dark-gray-vector' }}
        viewProperties={{
          camera: {
            position: [-73.993413, 40.65002, 4000],
            tilt: 65
          }
        }}
        loaderOptions={loaderOptions}
      >
        <WidgetsLayer />
        <BoroughsButtons />
        <BoroughsLayer />
        <BuildingsLayer />
        <SubwayLayer />
        <TopTenCrimesLayer />
        <BuildingsModeButton threeD={props.mapView.threeD} toggle3d={props.toggle3d} />
      </Scene>
    )
  }
}

const mapStateToProps = state => {
  let mapView = state.view
  return { mapView }
}

const mapDispatchToProps = dispatch => {
  return {
    toggle3d: threeD => dispatch(toggle3d(threeD))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BaseMap)
