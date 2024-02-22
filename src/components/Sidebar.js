import { navigate } from '@/Router';
import Component from '.';

export default class Sidebar extends Component {
  template() {
    return `
    <div id='backdrop' class='w-full h-full bg-black/30'></div>
    <div id='drawer' class='fixed top-0 right-0 w-290 h-full bg-white p-14 z-3'>
      <div class='h-40'>
        <button class='text-24'>
          <i class='ph ph-x'></i>
        </button>
      </div>
      <button id='login' class='w-full flex-center gap-8 py-8 my-32'>
        <img class='w-24 h-24' src='https://www.svgrepo.com/show/303108/google-icon-logo.svg' alt='google' />
        <h3>Google 계정으로 시작하기</h3>
      </button>
      <div id='member-menu' class='hidden'>
        <div id='profile' class='flex items-center px-14 py-20 gap-8'>
          <i class='ph ph-user-circle'></i>
          <h3 class='font-medium'>manggom@gamil.com</h3>
        </div>
        <ul class='mt-40 flex flex-col gap-[0.8rem]'>
          <li>
            <a class='flex items-center h-40 px-16' href='/logout' data-key='logout'>로그아웃</a>
          </li>
          <li>
            <a class='flex items-center h-40 px-16' href='/leave' data-key='leave'>회원탈퇴</a>
          </li>
        </ul>
      </div>
    </div>
    `;
  }

  // TODO
  // 로그인 여부에 따라 메뉴 항목 분기 처리

  setEvent() {
    const { toggleSidebarIsVisible } = this.props;
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const target = e.target.tagName === 'I' ? e.target.parentNode : e.target;
      navigate(target.href);
      toggleSidebarIsVisible();
    });

    this.addEvent('click', 'button, #backdrop', () => {
      toggleSidebarIsVisible();
    });
  }
}
