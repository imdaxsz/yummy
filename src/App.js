import { router } from '@/Router';
import Component from './components';
import Layout from '@components/Layout';

export default class App extends Component {
  template() {
    return `
        <div id='wrapper' class='max-w-screen-sm h-full mx-auto'></div>
    `;
  }

  didMount() {
    const $wrapper = document.querySelector('#wrapper');
    new Layout($wrapper);
    router();
  }
}
