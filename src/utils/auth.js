import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as request,
  deleteUser,
} from 'firebase/auth';
import { auth } from '@libs/firebase';
import store from '@stores';
import Modal from '@components/Modal';

export const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    store.setState({ user: auth.currentUser });
  } catch (error) {
    console.log('Error with sign in: ', error);
  }
};

export const signOut = async () => {
  try {
    await request(auth);
    store.setState({ user: null });
    window.location.href = '/';
  } catch (error) {
    console.log('Error with sign out: ', error);
  }
};

export const leave = async () => {
  try {
    await deleteUser(store.state.user);
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
