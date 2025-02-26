import React from "react";
<<<<<<< HEAD
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
=======
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader } from "./ui/card";
import { ArrowLeft, Mail, Phone } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

interface PetDetailsProps {
  id?: string;
}

const PetDetails = ({ id: propId }: PetDetailsProps) => {
  const { id: urlId } = useParams();
  const id = propId || urlId;
  const navigate = useNavigate();

  // TODO: Replace with actual data fetching
  const pet = {
    id,
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    status: "lost",
    description:
      "Friendly golden retriever, wearing a red collar. Last seen near Central Park.",
    location: "Central Park, New York",
    reportDate: "2024-03-20",
    photos: [
      "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
      "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
      "https://images.unsplash.com/photo-1552053831-71594a27632d",
    ],
    contact: {
      name: "John Doe",
      email: "john@example.com",
      phone: "+1234567890",
    },
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" className="mb-6" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {pet.photos.map((photo, index) => (
                <CarouselItem key={index}>
                  <div className="aspect-square relative">
                    <img
                      src={photo}
                      alt={`${pet.name} - photo ${index + 1}`}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold">{pet.name}</h1>
                  <p className="text-muted-foreground">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 capitalize">
                  {pet.status}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h2 className="font-semibold mb-2">Description</h2>
                <p className="text-muted-foreground">{pet.description}</p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Location</h2>
                <p className="text-muted-foreground">{pet.location}</p>
              </div>

              <div>
                <h2 className="font-semibold mb-2">Contact Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <a
                      href={`mailto:${pet.contact.email}`}
                      className="text-primary hover:underline"
                    >
                      {pet.contact.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    <a
                      href={`tel:${pet.contact.phone}`}
                      className="text-primary hover:underline"
                    >
                      {pet.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
  );
};

export default PetDetails;
