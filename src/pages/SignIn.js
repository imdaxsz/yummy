import Header from '@components/Header';
import { signIn } from '@apis/auth';
import GoogleIcon from '../../public/google-icon.svg';
import AbstractView from './AbstractView';

export default class SignIn extends AbstractView {
  constructor($target, props) {
    super($target, props, '로그인 | yummy');
  }

  template() {
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-40 pb-120 h-full flex flex-col flex-center text-zinc-700'>
        <i class="ph ph-warning-circle text-[120px] text-primary-30 opacity-15 -mb-34"></i>
        <p>로그인이 필요해요.</p>
        <p>구글 간편 로그인 후 이용해 보세요!</p>
        <button
          id='signin'
          aria-label='로그인'
          class='flex-center gap-8 mt-20 px-18 py-12 border border-zinc-200 rounded-lg
                  font-medium text-zinc-500'
        >
          <img class='w-24 h-24 block' src='' alt='google'/>
          <span>Google 계정으로 로그인</span>
        </button>
      </div>
    `;
  }

  didMount() {
    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '로그인', right: 'menu' });
    const img = this.$target.querySelector('img');
    if (img) img.src = GoogleIcon;
  }

  setEvent() {
    this.addEvent('click', '#signin', async () => {
      await signIn();
    });
  }
}
