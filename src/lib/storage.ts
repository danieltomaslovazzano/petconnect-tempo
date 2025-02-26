<<<<<<< HEAD
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage();

export const uploadPetImage = async (file: File): Promise<string> => {
  try {
    const fileExtension = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${fileExtension}`;
    const storageRef = ref(storage, `pets/${fileName}`);

    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
=======
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
>>>>>>> d425d224403dfa54ea0fff270a57162aa3a9716a
};
