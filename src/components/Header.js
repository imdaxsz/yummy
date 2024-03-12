import navigate from '@utils/navigate';
import toggleSidebar from '@utils/toggleSidebar';
import Component from '.';

export default class Header extends Component {
  template() {
    const { left, center, right } = this.props;
    return `
      <div>
        <button id='back' aria-label='뒤로가기' class='-ml-2'>
          ${left !== '' ? `<i class='ph ph-caret-left block'></i >` : ''}
        </button>
      </div>
      <div class='justify-center'>
        <a href='/' data-key='logo'>${center}</a>
      </div>
      <div class='justify-end'>
        <button id=${right} aria-label=${right === 'menu' ? '메뉴' : right} class='-mr-2' >
          ${right === 'menu' ? `<i class='ph ph-list block'></i>` : right ?? ''}
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
