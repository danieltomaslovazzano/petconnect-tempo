import { collection, getDocs, addDoc } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";

export const fetchCollection = async (collectionName: string) => {
  const { db } = useFirebase();
  const colRef = collection(db, collectionName);
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const addDocument = async (collectionName: string, data: Record<string, any>) => {
  const { db } = useFirebase();
  const colRef = collection(db, collectionName);
  return await addDoc(colRef, data);
};
