import Component from '@components';
import { auth } from '@libs/firebase';
import store from '@stores';
import { signOut } from 'firebase/auth';

export default class SignOut extends Component {
  template() {
    return `
      <></>
    `;
  }

  async didMount() {
    await signOut(auth);
    store.setState({ user: null });
    window.location.href = "/";
  }
}
