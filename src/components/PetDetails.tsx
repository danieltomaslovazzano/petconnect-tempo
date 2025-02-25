import React from "react";
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
  );
};

export default PetDetails;
