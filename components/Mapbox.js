import { useState } from 'react'
import Map, { Marker, Popup } from 'react-map-gl'
import getCenter from 'geolib/es/getCenter'

function Mapbox({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({})

  // Transform searchResults to an array of objects with latitude and longitude
  const coordinates = searchResults.map(({ lat, long }) => ({
    latitude: lat,
    longitude: long,
  }))

  const center = getCenter(coordinates)

  const [viewport, setViewPort] = useState({
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  })

  return (
    <Map
      mapStyle="mapbox://styles/stark0612/cl3sy208d004514o8v1tonzxq"
      mapboxAccessToken={process.env.mapbox_key}
      initialViewState={viewport}
      // onViewportChange={(nextViewport) => setViewPort(nextViewport)}
    >
      {searchResults.map((result) => (
        <Marker
          onClick={() => alert('clicked')}
          key={result.long}
          anchor="bottom"
          longitude={result.long}
          latitude={result.lat}
        >
          <p
            onClick={() => alert('clicked')}
            className="animate-bounce cursor-pointer text-2xl"
          >
            📌
          </p>
        </Marker>
      ))}
    </Map>
  )
}

export default Mapbox
