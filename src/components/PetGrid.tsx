import React from "react";
import PetCard from "./PetCard";

interface Pet {
  id: string;
  imageUrl: string;
  name: string;
  species: string;
  breed: string;
  location: string;
  reportDate: string;
  status: "lost" | "found" | "adoption";
}

interface PetGridProps {
  pets?: Pet[];
  onContactClick?: (petId: string) => void;
  onDetailsClick?: (petId: string) => void;
}

const defaultPets: Pet[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    location: "Central Park, New York",
    reportDate: "2024-03-20",
    status: "lost",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba",
    name: "Whiskers",
    species: "Cat",
    breed: "Siamese",
    location: "Brooklyn, New York",
    reportDate: "2024-03-19",
    status: "found",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    name: "Max",
    species: "Dog",
    breed: "Pug",
    location: "Queens, New York",
    reportDate: "2024-03-18",
    status: "adoption",
  },
];

const PetGrid = ({
  pets = defaultPets,
  onContactClick = (petId) => console.log(`Contact clicked for pet ${petId}`),
  onDetailsClick = (petId) => console.log(`Details clicked for pet ${petId}`),
}: PetGridProps) => {
  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {pets.map((pet) => (
          <PetCard
            key={pet.id}
            imageUrl={pet.imageUrl}
            name={pet.name}
            species={pet.species}
            breed={pet.breed}
            location={pet.location}
            reportDate={pet.reportDate}
            status={pet.status}
            onContactClick={() => onContactClick(pet.id)}
            onDetailsClick={() => onDetailsClick(pet.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PetGrid;
