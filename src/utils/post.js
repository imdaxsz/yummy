import { db } from '@libs/firebase';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import store from '@stores';
import navigate from './navigate';

export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef;
  } catch (error) {
    console.log('Error with add post: ', error);
    throw error;
  }
};

export const updatePost = async (ref, obj) => {
  try {
    await updateDoc(ref, obj);
  } catch (error) {
    console.log('Error with updating post: ', error);
  }
};

export const deletePost = async (id) => {
  try {
    await deleteDoc(doc(db, 'posts', id));
    navigate(`/list/${store.state.user.uid}`);
  } catch (error) {
    console.log('Error with deleting post: ', error);
  }
};
