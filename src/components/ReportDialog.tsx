<<<<<<< HEAD
import React from "react";
import { Camera, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
=======
import React, { useRef, useState } from "react";
import { Camera, Upload, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import { uploadImage, uploadImageFromCamera } from "@/lib/storage";
import { createPetListing } from "@/lib/database";
import { searchAddress, type GeocodingResult } from "@/lib/geocoding";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
<<<<<<< HEAD
import { cn } from "../lib/utils";
import { uploadPetImage } from "@/lib/storage";
=======
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a

interface ReportDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: ReportFormData) => void;
}

const formSchema = z.object({
  type: z.enum(["lost", "found"]),
  petName: z.string().min(1, "Pet name is required"),
  species: z.string().min(1, "Species is required"),
  breed: z.string().min(1, "Breed is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.object({
    address: z.string().min(1, "Address is required"),
    coordinates: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  }),
  contactInfo: z.object({
    phone: z.string().regex(/^\+[1-9]\d{1,14}$/, "Invalid phone number format"),
    email: z.string().email("Invalid email address"),
  }),
  photos: z.array(z.string()).min(1, "At least one photo is required"),
});

type FormData = z.infer<typeof formSchema>;

const ReportDialog = ({
  open = true,
  onOpenChange = () => {},
}: ReportDialogProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addressResults, setAddressResults] = useState<GeocodingResult[]>([]);
  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "lost",
      petName: "",
      species: "",
      breed: "",
      description: "",
      location: {
        address: "",
        coordinates: { lat: 0, lng: 0 },
      },
      contactInfo: {
        phone: "",
        email: user?.email || "",
      },
      photos: [],
    },
  });
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
  const [isUploading, setIsUploading] = React.useState(false);

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to report a pet",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createPetListing({
        ...data,
        userId: user.uid,
      });

      toast({
        title: "Success",
        description: "Pet report submitted successfully",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit pet report",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddressSearch = async (value: string) => {
    const results = await searchAddress(value);
    setAddressResults(results);
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (files && files[0]) {
      await handlePhotoUpload(files[0]);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      const video = document.createElement("video");
      video.srcObject = stream;
      await video.play();

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d")?.drawImage(video, 0, 0);

      stream.getTracks().forEach((track) => track.stop());

      canvas.toBlob(async (blob) => {
        if (blob) {
          const url = await uploadImageFromCamera(blob);
          form.setValue("photos", [...form.getValues("photos"), url]);
        }
      }, "image/jpeg");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to access camera",
        variant: "destructive",
      });
    }
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      form.handleSubmit(onSubmit)();
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

<<<<<<< HEAD
  const handlePhotoUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const downloadURL = await uploadPetImage(file);
      setFormData((prev) => ({
        ...prev,
        photos: [...prev.photos, downloadURL],
      }));
    } catch (error) {
      console.error("Error uploading photo:", error);
      // TODO: Add proper error handling/notification
    } finally {
      setIsUploading(false);
    }
  };

  const handleCameraCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      // TODO: Implement camera capture UI
      console.log("Camera stream:", stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
=======
  const handlePhotoUpload = async (file: File) => {
    try {
      const url = await uploadImage(file);
      form.setValue("photos", [...form.getValues("photos"), url]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload photo",
        variant: "destructive",
      });
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                photos: prev.photos.filter(
                                  (_, i) => i !== index,
                                ),
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
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        Upload Photo
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileSelect}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleCameraCapture}
                      >
                        <Camera className="mr-2 h-4 w-4" />
                        Take Photo
                      </Button>
                    </div>
<<<<<<< HEAD
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full relative"
                    disabled={isUploading}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={handlePhotoUpload}
                      disabled={isUploading}
                    />
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading ? "Uploading..." : "Upload Photo"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={handleCameraCapture}
                    disabled={isUploading}
                  >
                    <Camera className="mr-2 h-4 w-4" />
                    Take Photo
                  </Button>
=======
                  </div>
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
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
                        setFormData((prev) => ({
                          ...prev,
                          breed: e.target.value,
                        }))
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
<<<<<<< HEAD
          )}

          <div className="flex justify-between mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
              className={cn(step === 1 && "invisible")}
              disabled={isUploading}
            >
              Back
            </Button>
            <Button type="button" onClick={handleNext} disabled={isUploading}>
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
=======
          </form>
        </Form>
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
