import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  withScriptjs,
  withGoogleMap,
} from "react-google-maps";

const Map = withScriptjs(
  withGoogleMap((props) => {
    const [lat, setLat] = useState();
    const [lng, setLng] = useState();

    useEffect(() => {
      setLat(props.lat)
      setLng(props.lng)
      }, [props])
    console.log(lat, lng)

    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 41.87897, lng: -87.66063 }}
      >
        <Marker position={{ lat: 41.87897, lng: -87.66063 }} />
      </GoogleMap>
    );
  })
);

export default Map;
