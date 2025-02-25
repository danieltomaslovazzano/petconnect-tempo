import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { MapPin, Calendar, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PetCardProps {
  imageUrl?: string;
  name?: string;
  species?: string;
  breed?: string;
  location?: string;
  reportDate?: string;
  status?: "lost" | "found" | "adoption";
  onContactClick?: () => void;
  onDetailsClick?: () => void;
}

const PetCard = ({
  imageUrl = "https://images.unsplash.com/photo-1543466835-00a7907e9de1",
  name = "Buddy",
  species = "Dog",
  breed = "Golden Retriever",
  location = "Central Park, New York",
  reportDate = "2024-03-20",
  status = "lost",
  onContactClick = () => console.log("Contact clicked"),
  onDetailsClick = () => (window.location.href = `/pet/${name}`), // Using name as ID for now
}: PetCardProps) => {
  const statusColors = {
    lost: "bg-red-100 text-red-800",
    found: "bg-green-100 text-green-800",
    adoption: "bg-blue-100 text-blue-800",
  };

  return (
    <Card className="w-[340px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          <Badge
            className={`absolute top-4 right-4 ${statusColors[status]}`}
            variant="secondary"
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="text-xl font-semibold mb-2">{name}</h3>
        <div className="space-y-2">
          <p className="text-sm text-gray-600">
            {species} • {breed}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            <span>Reported: {reportDate}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" className="flex-1" onClick={onContactClick}>
          Contact
        </Button>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="secondary" size="icon" onClick={onDetailsClick}>
                <Info className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View full details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default PetCard;
