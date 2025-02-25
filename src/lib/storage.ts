import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import { v4 as uuidv4 } from "uuid";

// Using the configured storage instance from firebase.ts

export const uploadImage = async (file: File): Promise<string> => {
  const fileExtension = file.name.split(".").pop();
  const fileName = `${uuidv4()}.${fileExtension}`;
  const storageRef = ref(storage, `pet-images/${fileName}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};

export const uploadImageFromCamera = async (blob: Blob): Promise<string> => {
  const fileName = `${uuidv4()}.jpg`;
  const storageRef = ref(storage, `pet-images/${fileName}`);

  await uploadBytes(storageRef, blob);
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
