import { db } from "@libs/firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";

export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef;
  } catch (error) {
    console.log('Error with add post: ', error);
    throw (error);
  }
}

export const updatePost = async (ref, obj) => {
  try {
    await updateDoc(ref, obj);
  } catch (error) {
    console.log('Error with updating post: ', error);
  }
}
