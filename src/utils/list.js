import { db } from '@libs/firebase';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';

// 존재하는 모든 리스트 조회
export const getAllList = async () => {
  try {
    return await getDocs(collection(db, 'list'));
  } catch (error) {
    console.log('Error with getting list: ', error);
    throw error;
  }
};

// 회원의 uid를 통해 회원의 리스트 정보 조회
export const getListInfo = async (uid) => {
  try {
    const docRef = doc(db, 'list', uid);
    return await getDoc(docRef);
  } catch (error) {
    console.log('Error with finding list info: ', error);
    throw error;
  }
};

// 회원의 uid를 통해 회원의 리스트 내 맛집들을 조회
export const getListItems = async (uid) => {
  try {
    const q = query(collection(db, 'posts'), where('uid', '==', uid));
    return await getDocs(q);
  } catch (error) {
    console.log('Error with getting list items: ', error);
    throw error;
  }
};

// 리스트 좋아요
export const toggleLikeList = async (uid, docId, listLikes) => {
  try {
    const docRef = doc(db, 'lists', docId);
    if (listLikes.includes(uid)) {
      await updateDoc(docRef, {
        likes: [...listLikes.filter((id) => id !== uid)],
      });
      return;
    }
    await updateDoc(docRef, { likes: [...listLikes, uid] });
  } catch (error) {
    console.log('Error with like list: ', error);
  }
};