import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, Phone, Mail } from "lucide-react";

interface PetDetailsProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  pet?: {
    id: string;
    imageUrl: string;
    name: string;
    species: string;
    breed: string;
    description: string;
    location: string;
    reportDate: string;
    status: "lost" | "found" | "adoption";
    contactInfo: {
      phone: string;
      email: string;
    };
  };
}

const PetDetails = ({
  open = true,
  onOpenChange = () => {},
  pet = {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    description:
      "Friendly and energetic dog, loves to play fetch. Last seen wearing a red collar.",
    location: "Central Park, New York",
    reportDate: "2024-03-20",
    status: "lost",
    contactInfo: {
      phone: "(555) 123-4567",
      email: "owner@example.com",
    },
  },
}: PetDetailsProps) => {
  const statusColors = {
    lost: "bg-red-100 text-red-800",
    found: "bg-green-100 text-green-800",
    adoption: "bg-blue-100 text-blue-800",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {pet.name}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-6">
          <div className="relative h-64 w-full">
            <img
              src={pet.imageUrl}
              alt={pet.name}
              className="w-full h-full object-cover rounded-lg"
            />
            <Badge
              className={`absolute top-4 right-4 ${statusColors[pet.status]}`}
              variant="secondary"
            >
              {pet.status.charAt(0).toUpperCase() + pet.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">About</h3>
              <p className="text-gray-600">{pet.description}</p>
            </div>

            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>{pet.location}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Reported: {pet.reportDate}</span>
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">
                Contact Information
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>{pet.contactInfo.phone}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>{pet.contactInfo.email}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PetDetails;
