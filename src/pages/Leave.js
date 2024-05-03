import Header from '@components/Header';
import { leave } from '@apis/auth';
import AbstractView from './AbstractView';

export default class Leave extends AbstractView {
  $button;

  constructor($target, props) {
    super($target, props, '회원탈퇴 | yummy');
    this.$button = this.$target.querySelector('#leave');
  }

  template() {
    return `
      <div id='header' class='bg-white flex max-w-screen-sm w-full fixed top-0 h-60 z-10'></div>
      <div class='px-40 pt-40 h-full'>
        <p class='mb-50 text-14'>
          회원탈퇴를 하기 전에 안내 사항을 확인해 주세요.
        </p>
        <p class='flex gap-8'>
          <i class='ph ph-check py-4'></i>
          탈퇴 시 계정 복구 불가
        </p>
        <p class='flex gap-8'>
          <i class='ph ph-check py-4'></i>
          탈퇴 후 회원정보 및 서비스 이용 기록 삭제
        </p>
        <p class='text-12 pl-24 -mt-2 text-zinc-400'>
          - 가입 시 사용한 구글 계정, 작성한 글, 좋아요
        </p>
        <div class='flex items-center gap-8 pt-60 pb-100'>
          <input id='agree' type='checkbox' />
          <label for='agree' class='cursor-pointer text-14 text-zinc-700 leading-none'>
            위 내용을 확인했으며, 이에 동의합니다.
          </label>
        </div>
        <button
          id='leave'
          aria-label='탈퇴하기'
          class='block mx-auto bg-primary w-110 py-6 rounded font-bold text-white'
          disabled
        >
          탈퇴하기
        </button>
      </div>
    `;
  }

  didMount() {
    const $header = this.$target.querySelector('#header');
    new Header($header, { left: 'prev', center: '회원탈퇴', right: 'menu' });
  }

  setEvent() {
    this.addEvent('change', '#agree', (e) => {
      const { checked } = e.target;
      this.$button.disabled = !checked;
    });
    
    this.addEvent('click', '#leave', async () => {
      await leave();
    });
  }
}
