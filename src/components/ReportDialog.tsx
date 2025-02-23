import React from "react";
import { Camera, Upload, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { cn } from "../lib/utils";

interface ReportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ReportFormData) => void;
}

interface ReportFormData {
  type: "lost" | "found";
  petName: string;
  species: string;
  breed: string;
  description: string;
  location: string;
  contactInfo: string;
  photos: string[];
}

const ReportDialog = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = (data) => console.log("Form submitted:", data),
}: ReportDialogProps) => {
  const [step, setStep] = React.useState(1);
  const [formData, setFormData] = React.useState<ReportFormData>({
    type: "lost",
    petName: "",
    species: "",
    breed: "",
    description: "",
    location: "",
    contactInfo: "",
    photos: [],
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onSubmit(formData);
      onOpenChange(false);
      setStep(1);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePhotoUpload = () => {
    // Simulated photo upload
    const newPhoto = `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`;
    setFormData((prev) => ({
      ...prev,
      photos: [...prev.photos, newPhoto],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            {step === 1 && "Report a Pet"}
            {step === 2 && "Pet Details"}
            {step === 3 && "Additional Information"}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {step === 1 && (
            <div className="space-y-4">
              <RadioGroup
                defaultValue={formData.type}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: value as "lost" | "found",
                  }))
                }
                className="flex flex-col space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="lost" id="lost" />
                  <Label htmlFor="lost">I lost a pet</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="found" id="found" />
                  <Label htmlFor="found">I found a pet</Label>
                </div>
              </RadioGroup>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={photo}
                        alt={`Uploaded pet ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2"
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            photos: prev.photos.filter((_, i) => i !== index),
                          }));
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handlePhotoUpload}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handlePhotoUpload}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="petName">Pet's Name (if known)</Label>
                <Input
                  id="petName"
                  value={formData.petName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      petName: e.target.value,
                    }))
                  }
                  placeholder="Enter pet's name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="species">Species</Label>
                <Input
                  id="species"
                  value={formData.species}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      species: e.target.value,
                    }))
                  }
                  placeholder="e.g., Dog, Cat"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input
                  id="breed"
                  value={formData.breed}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, breed: e.target.value }))
                  }
                  placeholder="e.g., Golden Retriever"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the pet's appearance, behavior, etc."
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  placeholder="Where was the pet lost/found?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactInfo">Contact Information</Label>
                <Textarea
                  id="contactInfo"
                  value={formData.contactInfo}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      contactInfo: e.target.value,
                    }))
                  }
                  placeholder="How can people reach you?"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className={cn(step === 1 && "invisible")}
            >
              Back
            </Button>
            <Button type="button" onClick={handleNext}>
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
