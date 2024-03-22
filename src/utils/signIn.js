import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '@libs/firebase';
import store from '@stores';

const signIn = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    store.setState({ user: auth.currentUser });
  } catch (error) {
    console.log('Error with sign in: ', error);
  }
};

export default signIn;
