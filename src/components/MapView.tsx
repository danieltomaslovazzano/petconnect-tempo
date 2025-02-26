import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: "lost" | "found" | "adoption";
  petName: string;
}

interface MapViewProps {
  markers?: MapMarker[];
  onMarkerClick?: (markerId: string) => void;
  center?: { lat: number; lng: number };
  zoom?: number;
}

// Lazy load the map component
const LazyMap = React.lazy(() => import("./map/LazyMap"));

const MapView = ({
  markers = [
    { id: "1", lat: 40.7128, lng: -74.006, type: "lost", petName: "Max" },
    { id: "2", lat: 40.758, lng: -73.9855, type: "found", petName: "Bella" },
    {
      id: "3",
      lat: 40.7829,
      lng: -73.9654,
      type: "adoption",
      petName: "Charlie",
    },
  ],
  onMarkerClick = (id) => console.log(`Marker ${id} clicked`),
  center = { lat: 40.7128, lng: -74.006 },
  zoom = 12,
}: MapViewProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="w-full h-full bg-gray-100 relative overflow-hidden">
      {isMounted ? (
        <React.Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              Loading map...
            </div>
          }
        >
          <LazyMap
            markers={markers}
            onMarkerClick={onMarkerClick}
            center={center}
            zoom={zoom}
          />
        </React.Suspense>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          Loading map...
        </div>
      )}
    </Card>
  );
};

export default MapView;
