import { navigate } from '@/Router';
import Component from '.';

export default class Navigation extends Component {
  template() {
    return `
      <ul class='w-full flex flex-1 gray-1'>
        <li>
          <a href='/' data-key='home' class='active'>
            <i class="ph-fill ph-house"></i>홈
          </a>
        </li>
        <li>
          <a href='/write' data-key='write'>
            <i class="ph ph-pencil-line"></i>글쓰기
          </a>
        </li>
        <li>
          <a href='/archive' data-key='archive'>
            <i class="ph ph-archive"></i>보관함
          </a>
        </li>
      </ul>
      `;
  }

  didMount() {
    this.setActiveStyle();
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const target = e.target.tagName === 'I' ? e.target.parentNode : e.target;
      navigate(target.href);
      this.setActiveStyle();
    });
    // 뒤로가기 클릭을 통해 이전 페이지 이동 시 스타일 적용 
    window.addEventListener('popstate', this.setActiveStyle.bind(this));
  }

  // 현재 페이지 item에 active 스타일 적용
  setActiveStyle() {
    const items = this.$target.querySelectorAll('a');
    items.forEach((item) =>
      item.href === window.location.href
        ? item.classList.add('active')
        : item.classList.remove('active'),
    );
  }
}
