import router from '@/Router';
import Component from '.';
import BottomNavigation from './BottomNavigation';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  template() {
    return `
      <div id='page' class='relative'></div>
      <nav id='navbar' class='flex max-w-screen-sm w-full z-10 fixed bottom-0'></nav>
      <div id='sidebar' class='w-full h-dvh z-20 fixed inset-0 opacity-0 hidden'></div>
    `;
  }

  async didMount() {
    const $page = this.$target.querySelector('#page');
    const $navbar = document.querySelector('#navbar');
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      $navbar.classList.remove('max-w-screen-sm');
      $navbar.classList.add('right-[50%]', 'translate-x-[50%]');
    }

    const $sidebar = document.querySelector('#sidebar');
    router($page);
    new BottomNavigation($navbar);
    new Sidebar($sidebar);
  }
}
