import { router } from '@/Router';
import scrollLock from '@utils/ScrollLock';
import Component from '.';
import Header from './Header';
import Navigation from './Navigation';
import Sidebar from './Sidebar';

export default class Layout extends Component {
  $header;

  $navbar;

  $sidebar;

  setup() {
    this.state = { isSidebarVisible: false };
  }

  toggleSidebarIsVisible() {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
    const display = this.state.isSidebarVisible ? 'block' : 'none';
    this.$sidebar.style.display = display;
    scrollLock(display);
  }

  template() {
    return `
    <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
    <div id='content'></div>
    <nav id='navbar' class='flex max-w-screen-sm w-full fixed bottom-0 h-60'></nav>
    <div id='sidebar' class='w-full h-dvh z-20 fixed inset-0 hidden'></div>
    `;
  }

  didMount() {
    router();
    this.$header = document.querySelector('#header');
    this.$navbar = document.querySelector('#navbar');
    this.$sidebar = document.querySelector('#sidebar');
    const { isSidebarVisible } = this.state;
    new Header(this.$header, {
      toggleSidebarIsVisible: this.toggleSidebarIsVisible.bind(this),
    });
    if (window.location.pathname === '/write')
      this.$navbar.style.display = 'none';
    new Navigation(this.$navbar);
    new Sidebar(this.$sidebar, {
      isSidebarVisible,
      toggleSidebarIsVisible: this.toggleSidebarIsVisible.bind(this),
    });
  }
}
