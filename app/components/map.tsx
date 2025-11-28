"use client";

import { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

interface Coordinates {
  lat: number;
  lng: number;
}

const mapStyles = [
  {
    featureType: "poi",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "administrative",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

export default function SimpleMapPicker() {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY!,
  });

  // Auto-detect user location on load
  useEffect(() => {
    if (!navigator.geolocation) {
      setCoordinates({ lat: 25.276987, lng: 55.296249 }); // fallback
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setCoordinates({ lat: latitude, lng: longitude });
      },
      () => {
        setCoordinates({ lat: 25.276987, lng: 55.296249 }); // fallback
      },
      { enableHighAccuracy: true }
    );
  }, []);

  if (!isLoaded) return <p>Loading map...</p>;
  if (!coordinates) return <p>Detecting your location...</p>;

  return (
    <div className="w-full space-y-6">
      <div className="relative h-72 w-full overflow-hidden rounded-lg shadow-md">
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={coordinates}
          zoom={16}
          onLoad={(map) => setMapRef(map)}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            draggable: true,
            clickableIcons: false,
            styles: mapStyles,
          }}
        >
          <Marker position={coordinates} />
        </GoogleMap>
      </div>

      <p className="text-center text-sm text-gray-500">
        Your current location is shown on the map.
      </p>
    </div>
  );
}
