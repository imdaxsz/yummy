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
import Modal from '@components/Modal';
import { deleteImageFiles } from './image';

/**
 * @description 포스트 작성
 */
export const addPost = async (post) => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), post);
    return docRef;
  } catch (error) {
    console.log('Error with add post: ', error);
    throw error;
  }
};

/**
 * @description 포스트 조회
 */
export const getPost = async (id) => {
  try {
    const docRef = await getDoc(doc(db, 'posts', id));
    return docRef;
  } catch (error) {
    console.log('Error with getting post: ', error);
    throw error;
  }
};

/**
 * @description 포스트 수정
 */
export const updatePost = async (docRef, obj) => {
  try {
    await updateDoc(docRef, obj);
  } catch (error) {
    console.log('Error with updating post: ', error);
  }
};

/**
 * @description 포스트 삭제
 */
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

/**
 * @description 포스트 전체 삭제
 */
export const deleteAllPosts = async (items) => {
  await Promise.all(
    items.map(async (item) => deletePost(item.id, item.attachments.length > 0)),
  );
  new Modal({
    type: 'alert',
    message: '삭제가 완료되었어요.',
    onClose: () => window.location.reload(),
  });
};
