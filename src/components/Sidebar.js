/* eslint-disable no-use-before-define */
import toggleSidebar from '@utils/toggleSidebar';
import navigate from '@utils/navigate';
import GoogleIcon from '@assets/google-icon.svg';
import store from '@stores';
import signIn from '@utils/signIn';
import Component from '.';

export default class Sidebar extends Component {
  template() {
    const { user } = store.state;

    return `
      <div id='backdrop' class='w-full h-full bg-black/30'></div>
      <div id='drawer' class='fixed top-0 -right-300 w-290 h-full bg-white p-14'>
        <div class='h-40'>
          <button id='close' aria-label='닫기' class='text-24'>
            <i class='ph ph-x block'></i>
          </button>
        </div>
        ${
          !user
            ? `<button id='signin' aria-label='로그인' class='w-full flex-center gap-8 py-8 my-32'>
                <img class='w-24 h-24' src='' alt='google' />
                <h3>Google 계정으로 시작하기</h3>
              </button>`
            : memberMenu(user.email)
        }
      </div>
    `;
  }

  didMount() {
    const img = this.$target.querySelector('img');
    if (img) img.src = GoogleIcon;
  }

  setEvent() {
    this.addEvent('click', 'a', (e) => {
      e.preventDefault();
      const target = e.target.tagName === 'I' ? e.target.parentNode : e.target;
      navigate(target.href);
      toggleSidebar();
    });

    this.addEvent('click', '#close, #backdrop', () => {
      toggleSidebar();
    });

    this.addEvent('click', '#signin', async () => {
      await signIn();
      toggleSidebar();
    });
  }
}

function memberMenu(email) {
  return `
    <div id='member-menu' class=''>
      <div id='profile' class='flex items-center px-14 py-20 gap-8'>
        <i class='ph ph-user-circle'></i>
        <h3 class='font-medium'>${email}</h3>
      </div>
      <ul class='mt-40 flex flex-col gap-[0.8rem]'>
        <li>
          <a class='flex items-center h-40 px-16' href='/signout' data-key='signout'>로그아웃</a>
        </li>
        <li>
          <a class='flex items-center h-40 px-16' href='/leave' data-key='leave'>회원탈퇴</a>
        </li>
      </ul>
    </div>
  `;
}
