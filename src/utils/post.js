import { db } from '@libs/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
import store from '@stores';
import { deleteImageFiles } from './image';

export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef;
  } catch (error) {
    console.log('Error with add post: ', error);
    throw error;
  }
};

export const getPost = async (id) => {
  try {
    const docRef = await getDoc(doc(db, 'posts', id));
    return docRef;
  } catch (error) {
    console.log('Error with getting post: ', error);
    throw error;
  }
};

export const updatePost = async (docRef, obj) => {
  try {
    await updateDoc(docRef, obj);
  } catch (error) {
    console.log('Error with updating post: ', error);
  }
};

export const deletePost = async (id, hasImage) => {
  try {
    const { user } = store.state;
    if (hasImage) await deleteImageFiles(user.uid, id);
    sessionStorage.setItem('redirect', `/list/${user.uid}`);
    await deleteDoc(doc(db, 'posts', id));
  } catch (error) {
    console.log('Error with deleting post: ', error);
  }
};

export const toggleLikePost = async (uid, docId, postLikes) => {
  try {
    const docRef = doc(db, 'posts', docId);
    if (postLikes.includes(uid)) {
      await updateDoc(docRef, {
        likes: [...postLikes.filter((id) => id !== uid)],
      });
      return;
    }
    await updateDoc(docRef, { likes: [...postLikes, uid] });
  } catch (error) {
    console.log('Error with like post: ', error);
  }
};
