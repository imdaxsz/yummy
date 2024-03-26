import navigate from '@utils/navigate';
import toggleSidebar from '@utils/toggleSidebar';
import Component from '.';

export default class Header extends Component {
  constructor($target, { left, center, right, onClickRight = null }) {
    super($target, { left, center, right, onClickRight });
  }

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
      ${
        right === 'menu'
          ? `<button id='menu' aria-label='메뉴' class='-mr-2' >
              <i class='ph ph-list block'></i>
             </button>`
          : right ?? ''
      }
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

    const { right } = this.props;
    if (right === 'menu') {
      this.addEvent('click', '#menu', toggleSidebar);
    }
  }
}
