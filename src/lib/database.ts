import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export interface PetReport {
  type: "lost" | "found";
  petName: string;
  species: string;
  breed: string;
  description: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  contactInfo: {
    phone: string;
    email: string;
  };
  photos: string[];
  userId: string;
  createdAt?: any;
}

export const createPetListing = async (data: PetReport) => {
  try {
    const docRef = await addDoc(collection(db, "pets"), {
      ...data,
      createdAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating pet listing:", error);
    throw error;
  }
};
