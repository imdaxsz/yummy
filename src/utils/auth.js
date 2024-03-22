import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut as request,
} from 'firebase/auth';
import { auth } from '@libs/firebase';
import store from '@stores';

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
