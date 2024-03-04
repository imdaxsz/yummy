import navigate from '@utils/Navigate';
import Component from '.';

export default class BottomNavigation extends Component {
  template() {
    return `
      <ul class='w-full flex flex-1 gray-1'>
        <li>
          <a href='/' data-key='home' class='text-primary'>
            <i class="ph-fill ph-house"></i>홈
          </a>
        </li>
        <li>
          <a href='/write' data-key='write'>
            <i class="ph ph-pencil-line"></i>글쓰기
          </a>
        </li>
        <li>
          <a href='/archive?category=my' data-key='archive'>
            <i class='ph ph-archive'></i>보관함
          </a>
        </li>
      </ul>
      `;
  }

  didMount() {
    this.setStyle();
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const target = e.target.tagName === 'I' ? e.target.parentNode : e.target;
      navigate(target.href);
      this.setStyle();
    });

    window.addEventListener('popstate', this.setStyle.bind(this));
  }

  // 현재 페이지 item에 active 스타일 적용
  setStyle() {
    const { pathname } = window.location;
    if (pathname === '/write') {
      this.$target.style.display = 'none';
      return;
    }
    
    this.$target.style.display = 'flex';
    const items = this.$target.querySelectorAll('a');
    items.forEach((item) =>
      item.href === window.location.href
        ? item.classList.add('text-primary')
        : item.classList.remove('text-primary'),
    );
  }
}
