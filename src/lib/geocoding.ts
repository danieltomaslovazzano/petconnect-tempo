import { debounce } from "lodash";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoicGV0Y29ubmVjdCIsImEiOiJjbHRxOXRhMGQwMXZqMmtvNXd4ZzBqbXJ4In0.Ry9YWvQnQQUqXPMqE8ZURA";

export interface GeocodingResult {
  place_name: string;
  center: [number, number];
}

export const searchAddress = debounce(
  async (query: string): Promise<GeocodingResult[]> => {
    if (!query) return [];

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query,
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&types=address`,
      );
      const data = await response.json();
      return data.features.map((feature: any) => ({
        place_name: feature.place_name,
        center: feature.center,
      }));
    } catch (error) {
      console.error("Geocoding error:", error);
      return [];
    }
  },
  300,
);
