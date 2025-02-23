import React, { useState } from "react";
import Header from "./Header";
import FilterBar from "./FilterBar";
import PetGrid from "./PetGrid";
import MapView from "./MapView";
import ReportButton from "./ReportButton";
import ReportDialog from "./ReportDialog";

type ViewType = "lost" | "found" | "adoptions";

interface HomeProps {
  initialView?: ViewType;
  initialMapView?: boolean;
}

const Home = ({ initialView = "lost", initialMapView = false }: HomeProps) => {
  const [activeView, setActiveView] = useState<ViewType>(initialView);
  const [isMapView, setIsMapView] = useState(initialMapView);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    species: "all",
    breed: "all",
    color: "all",
    date: undefined as Date | undefined,
  });

  const handleViewChange = (view: ViewType) => {
    setActiveView(view);
  };

  const handleMapViewToggle = () => {
    setIsMapView(!isMapView);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleReportSubmit = (data: any) => {
    console.log("Report submitted:", data);
    setIsReportDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header
        activeView={activeView}
        onViewChange={handleViewChange}
        onMapViewToggle={handleMapViewToggle}
        isMapView={isMapView}
        onSearch={handleSearch}
      />

      <FilterBar
        onSpeciesChange={(value) =>
          setFilters((prev) => ({ ...prev, species: value }))
        }
        onBreedChange={(value) =>
          setFilters((prev) => ({ ...prev, breed: value }))
        }
        onColorChange={(value) =>
          setFilters((prev) => ({ ...prev, color: value }))
        }
        onDateChange={(date) => setFilters((prev) => ({ ...prev, date }))}
        selectedDate={filters.date}
      />

      <main className="flex-1 relative">
        {isMapView ? (
          <div className="h-[calc(100vh-136px)]">
            <MapView
              markers={[
                {
                  id: "1",
                  lat: 40.7128,
                  lng: -74.006,
                  type: "lost",
                  petName: "Max",
                },
                {
                  id: "2",
                  lat: 40.758,
                  lng: -73.9855,
                  type: "found",
                  petName: "Bella",
                },
                {
                  id: "3",
                  lat: 40.7829,
                  lng: -73.9654,
                  type: "adoption",
                  petName: "Charlie",
                },
              ]}
            />
          </div>
        ) : (
          <PetGrid />
        )}

        <ReportButton onClick={() => setIsReportDialogOpen(true)} />

        <ReportDialog
          open={isReportDialogOpen}
          onOpenChange={setIsReportDialogOpen}
          onSubmit={handleReportSubmit}
        />
      </main>
    </div>
  );
};

export default Home;
