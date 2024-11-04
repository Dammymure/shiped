'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';
import Loader from '../components/Loading.jsx'

const containerStyle = {
  width: '100%',
  height: '100%',
};

// const origin = {
//   lat: 37.437041393899676,
//   lng: -4.191635586788259
// };

// const destination = {
//   lat: 37.440575591901045,
//   lng: -4.231433159434073
// };

const GoogleMapRouteComponent = ({ currentLocation, deliveryLocation, estimatedTravelTime, lng, lat }) => {
  const [directions, setDirections] = useState(null);
  const [travelTime, setTravelTime] = useState(null);

  const origin = {
    lat: currentLocation?.lat || 0,  // Default value in case coordinates are not available
    lng: currentLocation?.lng || 0,
  };
  const [mapCenter] = useState(origin);


  const destination = {
    lat: deliveryLocation?.lat || 0,
    lng: deliveryLocation?.lng || 0,
  };


  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
        const route = response.routes[0].legs[0];
        setTravelTime(route.duration.text);
        estimatedTravelTime(travelTime)
      } else {
        console.error('Directions request failed due to ' + response.status);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY} loadingElement={<Loader />}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={mapCenter}
        zoom={10}
      >
        <Marker position={origin} />
        <Marker position={destination} />
        <DirectionsService
          options={{
            destination: destination,
            origin: origin,
            travelMode: 'DRIVING'
          }}
          callback={directionsCallback}
        />
        {directions && (
          <DirectionsRenderer
            options={{
              directions: directions
            }}
          />
        )}
      </GoogleMap>
      {travelTime && <p>Estimated travel time: {travelTime}</p>}
    </LoadScript>
  );
};

export default GoogleMapRouteComponent;