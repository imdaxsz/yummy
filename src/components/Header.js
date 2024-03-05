import navigate from '@utils/Navigate';
import toggleSidebar from '@utils/ToggleSidebar';
import Component from '.';

export default class Header extends Component {
  template() {
    const { left, center, right } = this.props;
    return `
      <div>
        <button id='back' aria-label='뒤로가기' class='-ml-2'>
          ${left !== '' ? `<i class='ph ph-caret-left'></i >` : ''}
        </button>
      </div>
      <div class='justify-center'>
        <a href='/' data-key='logo'>${center}</a>
      </div>
      <div class='justify-end'>
        <button id='menu' aria-label='메뉴' class='-mr-2' >
          ${right === 'menu' ? `<i class='ph ph-list'></i>` : right ?? ''}
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
      toggleSidebar();
    });
  }
}
