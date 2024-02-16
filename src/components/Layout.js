import Component from '.';
import Header from './Header';
import Navigation from './Navigation';

export default class Layout extends Component {
  template() {
    return `
    <div id='header'></div>
    <div id='content'></div>
    <nav id='navbar' class='max-w-screen-sm w-full fixed bottom-0'></nav>
    `;
  }

  didMount() {
    const $navbar = document.querySelector('#navbar');
    const $header = document.querySelector('#header');
    new Header($header);
    new Navigation($navbar);
  }
}
