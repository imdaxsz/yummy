import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as request,
  deleteUser,
} from 'firebase/auth';
import { auth, db } from '@libs/firebase';
import store from '@stores';
import Modal from '@components/Modal';
import { collection, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import navigate from '@utils/navigate';

/**
 * @description 로그인 시 사용자 존재 여부 확인
 */
const userExists = async (uid) => {
  try {
    const docRef = doc(db, 'list', uid);
    const docSnap = await getDoc(docRef);
    return !docSnap.exists();
  } catch (error) {
    console.log('Error with finding user: ', error);
    throw error;
  }
};

/**
 * @description 회원가입 시 사용자 맛집 목록 생성 및 초기화
 */
const createList = async (uid, email) => {
  try {
    const listRef = collection(db, 'list');
    const username = email.split('@')[0].slice(15);
    const time = Date.now();
    await setDoc(doc(listRef, uid), {
      createdAt: time,
      updatedAt: time,
      email,
      title: `${username}님의 맛집`,
      likes: [],
    });
  } catch (error) {
    console.log('Error with creating list: ', error);
  }
};

/**
 * @description 회원탈퇴 시 사용자 맛집 목록 삭제
 */
const deleteList = async (uid) => {
  try {
    const docRef = doc(db, 'list', uid);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log('no such list');
      return;
    }
    await deleteDoc(docRef);
    // TODO: 리스트 내 맛집 게시글 삭제
  } catch (error) {
    console.log('Error with deleting list: ', error);
  }
};

export const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    const { uid, email } = auth.currentUser;
    const isNewMember = await userExists(uid);
    if (isNewMember) await createList(uid, email);
    
    const redirect = sessionStorage.getItem('redirect');
    if (redirect) {
      navigate(redirect);
      sessionStorage.removeItem('redirect');
    }
  } catch (error) {
    console.log('Error with sign in: ', error);
  }
};

export const signOut = async () => {
  try {
    await request(auth);
    window.location.href = '/';
  } catch (error) {
    console.log('Error with sign out: ', error);
  }
};

/**
 * @description 회원탈퇴
 */
export const leave = async () => {
  try {
    const { user } = store.state;
    await deleteList(user.uid);
    await deleteUser(user);
    new Modal({
      type: 'alert',
      backdrop: true,
      message: '탈퇴가 완료되었어요.',
      onClose: () => {
        window.location.href = '/';
      },
    });
  } catch (error) {
    console.log('Error with deleting User: ', error);
  }
};
