import { navigate } from '@/Router';
import Component from '.';

export default class Header extends Component {
  template() {
    return `
      <div>
        <button id='back'>
          <i class='ph ph-caret-left'></i>
        </button>
      </div>
      <div class='justify-center'>
        <a href='/' data-key='logo'>yummy</a>
      </div>
      <div class='justify-end'>
        <button id='menu'>
          <i class='ph ph-list'></i>
        </button>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      navigate('/');
    });

    this.addEvent('click', '#back', () => {
      window.history.back();
    });
    
    this.addEvent('click', '#menu', () => {
      const { toggleSidebarIsVisible } = this.props;
      toggleSidebarIsVisible();
    });
  }
}
