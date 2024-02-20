import { router } from '@/Router';
import Component from '.';
import Header from './Header';
import Navigation from './Navigation';

export default class Layout extends Component {
  $header;

  $navbar;

  setup() {
    this.state = { isSidebarVisible: false };
  }

  toggleSidebarVisible() {
    this.setState({ isSidebarVisible: !this.state.isSidebarVisible });
    // this.setState({ isSidebarVisible: true });
  }

  template() {
    return `
    <div id='header' class='flex max-w-screen-sm w-full fixed top-0 h-60'></div>
    <div id='content'></div>
    <button id='test'>테스트</button>
    <nav id='navbar' class='flex max-w-screen-sm w-full fixed bottom-0 h-60'></nav>
    `;
  }

  setEvent() {
    this.addEvent('click', '#test', () => {
      this.toggleSidebarVisible();
    });
  }

  didMount() {
    router();
    const header = document.querySelector('#header');
    const navbar = document.querySelector('#navbar');
    const { isSidebarVisible } = this.state;
    new Header(header, {
      isSidebarVisible,
      toggleSidebarVisible: this.toggleSidebarVisible.bind(this),
    });
    new Navigation(navbar);
  }
}
