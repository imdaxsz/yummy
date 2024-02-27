import router from '@/Router';
import Component from '.';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  template() {
    return `
      <div id='page' class='relative'></div>
      <nav id='navbar' class='flex max-w-screen-sm w-full z-10 fixed bottom-0 h-60'></nav>
      <div id='sidebar' class='w-full h-dvh z-20 fixed inset-0 hidden'></div>
    `;
  }

  didMount() {
    const $page = this.$target.querySelector('#page');
    const $navbar = document.querySelector('#navbar');
    const $sidebar = document.querySelector('#sidebar');
    router($page);
    new Navigation($navbar);
    new Sidebar($sidebar);
  }
}
