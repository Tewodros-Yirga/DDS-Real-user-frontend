import React, { useState, useRef, useCallback, useEffect } from "react";
import { Modal, Button } from "antd";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

// MapEffect component for smooth transitions
const MapEffect = ({ center, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (center && center.lat !== undefined && center.lng !== undefined) {
      map.flyTo(center, zoom, {
        animate: true,
        duration: 5, // Longer duration for smoother transitions
      });
    } else {
      console.warn("Invalid center provided to MapEffect:", center);
    }
  }, [center, zoom, map]);

  return null;
};

// LocationPicker component to handle map interactions
const LocationPicker = React.memo(({ onLocationSelect }) => {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng); // Pass the clicked location to the parent
    },
  });
  return null;
});

// MapModal component
const MapModal = React.memo(({ visible, onClose, onSelectLocation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const [mapCenter, setMapCenter] = useState([9.145, 40.4897]); // Default center (Ethiopia)
  const [zoom, setZoom] = useState(6); // Default zoom level

  // Memoize the location select handler
  const handleLocationSelect = useCallback((location) => {
    setSelectedLocation(location); // Update the selected location
    setMapCenter([location.lat, location.lng]); // Update the map center
  }, []);

  // Reset selected location when the modal is closed
  useEffect(() => {
    if (!visible) {
      setSelectedLocation(null);
      setMapCenter([9.145, 40.4897]); // Reset to default center
      setZoom(6); // Reset to default zoom level
    }
  }, [visible]);

  // Handle the "Select" button click
  const handleSelect = useCallback(() => {
    if (selectedLocation) {
      onSelectLocation(selectedLocation); // Pass the selected location to the parent
      onClose();
    }
  }, [selectedLocation, onSelectLocation, onClose]);

  return (
    <Modal
      title="Pick Location"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="select" type="primary" onClick={handleSelect}>
          Select
        </Button>,
      ]}
    >
      <div style={{ height: "400px", width: "100%" }}>
        {visible && ( // Render the map only when the modal is visible
          <MapContainer
            center={mapCenter}
            zoom={zoom}
            style={{ height: "100%", width: "100%" }}
            ref={mapRef}
            zoomControl={true}
            minZoom={3}
            maxZoom={18}
            zoomSnap={0.1} // Finer zoom granularity
            zoomDelta={0.1} // Slower zoom speed
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {selectedLocation && (
              <Marker
                position={selectedLocation}
                eventHandlers={{
                  click: () => setSelectedLocation(null), // Clear marker on click
                }}
              />
            )}
            <LocationPicker onLocationSelect={handleLocationSelect} />
            <MapEffect center={mapCenter} zoom={zoom} />
          </MapContainer>
        )}
      </div>
    </Modal>
  );
});

export default MapModal;
