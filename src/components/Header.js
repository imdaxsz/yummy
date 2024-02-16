import { navigate } from '@/Router';
import Component from '.';

export default class Header extends Component {
  template() {
    return `
      <div><button id='back'>이전</button></div>
      <div><a href='/' data-key='logo'>yummy</a></div>
      <div><button id='sidebar'>바</button></div>
    `;
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      navigate('/');
    });

    this.addEvent('click', '#back', (e) => {
      history.back();
    });
  }
}
