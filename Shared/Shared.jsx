import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/FireBaseConfig";

export const GetFavourite = async (user) => {
  try {
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      throw new Error("User email is not available.");
    }

    const docRef = doc(db, "Favourites", userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      const newDoc = {
        email: userEmail,
        favourite: [], // Ensure the key name matches throughout your code
      };
      await setDoc(docRef, newDoc);
      return newDoc; // Return the new document data
    }
  } catch (error) {
    console.error("Error getting or setting document: ", error);
    throw error; // You can handle this error in your calling function
  }
};

export const AddToFavourite = async (user, favourite) => {
  try {
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    if (!userEmail) {
      throw new Error("User email is not available.");
    }

    if (!Array.isArray(favourite)) {
      throw new Error("Favourite is not a valid array."); // Ensure favourite is an array
    }

    const docRef = doc(db, "Favourites", userEmail);
    const x= await getDoc(docRef);
    console.log(x.data());
    await updateDoc(docRef, {
        favourites: favourite, // Ensure you're passing a defined and valid array
    });
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // You can handle this error in your calling function
  }
};
