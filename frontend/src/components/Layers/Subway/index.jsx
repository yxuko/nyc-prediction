import { useState, useEffect } from 'react'
import { loadModules } from 'esri-loader'

const SubwayLayer = props => {
  const [layer, setLayer] = useState(null)

  useEffect(() => {
    loadModules(['esri/layers/FeatureLayer'])
      .then(([FeatureLayer]) => {
        let initLayer = new FeatureLayer({
          url:
            'http://opdgig.dos.ny.gov/arcgis/rest/services/NYOPDIG/DataStoryMaps/MapServer/34',
          title: 'NYC Subway Lines'
        })
        setLayer(initLayer)
        props.map.add(initLayer)
      })
      .catch(err => console.error(err))
  }, [])
  return null
}

export default SubwayLayer
