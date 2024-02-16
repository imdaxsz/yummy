import { navigate } from '@/Router';
import Component from '.';

export default class Navigation extends Component {
  template() {
    return `
      <ul class='w-full [&_li]:float-left '>
        <li><a href='/' data-key='home'>홈</a></li>
        <li><a href='/write' data-key='write'>글쓰기</a></li>
        <li><a href='/archive' data-key='archive'>보관함</a></li>
      </ul>
      `;
  }
  
  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      navigate(e.target.href);
    })
  }
}
