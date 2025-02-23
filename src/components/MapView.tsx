import React from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { MapPin } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  return (
    <Card className="w-full h-full bg-gray-100 relative overflow-hidden">
      {/* Placeholder for actual map implementation */}
      <div className="w-full h-full bg-gray-200 relative">
        {/* Mock map background */}
        <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-74.0060,40.7128,12,0/1200x800?access_token=placeholder')] bg-cover bg-center opacity-50"></div>

        {/* Mock markers */}
        {markers.map((marker) => (
          <TooltipProvider key={marker.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${getMarkerPosition(marker)} ${getMarkerColor(marker.type)}`}
                  onClick={() => onMarkerClick(marker.id)}
                >
                  <MapPin className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{marker.petName}</p>
                <p className="capitalize">{marker.type}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}

        {/* Mock zoom controls */}
        <div className="absolute right-4 bottom-4 flex flex-col gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => console.log("Zoom in")}
          >
            +
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={() => console.log("Zoom out")}
          >
            -
          </Button>
        </div>
      </div>
    </Card>
  );
};

// Helper function to get mock positions for markers
const getMarkerPosition = (marker: MapMarker) => {
  // This would normally be calculated based on actual coordinates
  // For demo, we're using arbitrary positions
  const positions = {
    "1": "left-[30%] top-[40%]",
    "2": "left-[50%] top-[60%]",
    "3": "left-[70%] top-[50%]",
  };
  return positions[marker.id as keyof typeof positions] || "left-1/2 top-1/2";
};

// Helper function to get marker colors based on type
const getMarkerColor = (type: string) => {
  const colors = {
    lost: "bg-red-100 hover:bg-red-200 text-red-800",
    found: "bg-green-100 hover:bg-green-200 text-green-800",
    adoption: "bg-blue-100 hover:bg-blue-200 text-blue-800",
  };
  return colors[type as keyof typeof colors] || "";
};

export default MapView;
