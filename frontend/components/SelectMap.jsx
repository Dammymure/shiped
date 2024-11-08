import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = ({ onLocationChange }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);

  const handleSearch = async (query, locationType) => {
    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 1,
      },
    });
    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      const location = { lat: parseFloat(lat), lng: parseFloat(lon) };
      
      if (locationType === 'current') {
        setCurrentLocation(location);
        onLocationChange({ currentLocation: location, deliveryLocation });
      } else if (locationType === 'delivery') {
        setDeliveryLocation(location);
        onLocationChange({ currentLocation, deliveryLocation: location });
      }
    }
  };

  const PanToLocation = ({ location }) => {
    const map = useMap();
    if (location) {
      map.setView([location.lat, location.lng], 13);
    }
    return null;
  };

  return (
    <div>

      <div className='flex flex-col gap-3 w-1/2 pb-5'>
        <input
        className='"w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary'
          type="text"
          placeholder="Search for current location"
          onBlur={(e) => handleSearch(e.target.value, 'current')}
        />
        <input
        className='"w-full p-2 border border-gray-400 rounded focus:outline-none focus:border-secondary focus:shadow-custom-purple focus:ring-1 focus:ring-secondary'
          type="text"
          placeholder="Search for delivery location"
          onBlur={(e) => handleSearch(e.target.value, 'delivery')}
        />

      </div>

      <MapContainer center={[51.505, -0.09]} zoom={3} style={{ height: '550px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {currentLocation && (
          <>
            <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon} />
            <PanToLocation location={currentLocation} />
          </>
        )}
        {deliveryLocation && (
          <>
            <Marker position={[deliveryLocation.lat, deliveryLocation.lng]} icon={customIcon} />
            <PanToLocation location={deliveryLocation} />
          </>
        )}
      </MapContainer>
      {/* Display delivery location coordinates below the map */}
       {/* {deliveryLocation && (
         <div style={{ marginTop: '20px', textAlign: 'center' }}>
           <h2>Delivery Location Coordinates:</h2>
           <p>Latitude: {deliveryLocation.lat}</p>
           <p>Longitude: {deliveryLocation.lng}</p>
         </div>
       )}
       {currentLocation && (
         <div style={{ marginTop: '20px', textAlign: 'center' }}>
           <h2>Curre Location Coordinates:</h2>
           <p>Latitude: {currentLocation.lat}</p>
           <p>Longitude: {currentLocation.lng}</p>
         </div>
       )} */}
    </div>
  );
};

export default MapComponent;

